import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import {
  flattenSchema,
  idToSchema,
  combineSchema,
  dataToFlatten,
  flattenToData,
  newSchemaToOld,
  schemaToState,
} from './utils';
import { GlobalCtx, StoreCtx } from './context';
import { useSet } from './hooks';

const DEFAULT_SCHEMA = {
  type: 'object',
  properties: {},
};

// TODO: formData 不存在的时候会报错：can't find # of undefined
function Provider(props, ref) {
  const {
    defaultValue,
    submit,
    transformer,
    extraButtons,
    controlButtons,
    hideId,
    settings,
    commonSettings,
    globalSettings,
    children,
  } = props;

  const frwRef = ref || useRef();
  const [state, setState] = useSet({
    formData: {},
    frProps: {}, // form-render 的全局 props 等
    hovering: undefined, // 目前没有用到
    isNewVersion: true, // 用schema字段，还是用propsSchema字段，这是一个问题
    preview: false, // preview = false 是编辑模式
    schema: {},
    selected: undefined, // 被选中的$id, 如果object/array的内部，以首字母0标识
  });
  const {
    formData,
    frProps,
    hovering,
    isNewVersion,
    preview,
    schema,
    selected,
  } = state;

  if (transformer) {
    if (typeof transformer.from === 'function') {
      transformFrom = transformer.from;
    }
    if (typeof transformer.to === 'function') {
      transformTo = transformer.to;
    }
  }

  // 收口点 propsSchema 到 schema 的转换 (一共3处，其他两个是 importSchema 和 setValue，在 FRWrapper 文件)
  useEffect(() => {
    const schema = defaultValue ? transformFrom(defaultValue) : DEFAULT_SCHEMA;
    if (schema) setState(schemaToState(schema));
  }, [defaultValue]);

  let transformFrom = (schema) => schema;
  // 右侧配置数据对schema的影响
  let transformTo = (inschema) => {
    const { column, layout, labelWidth } = frProps;
    console.log('transformTo -> frProps', frProps);
    inschema.layout = layout || 'horizontal';
    if (inschema.properties && inschema.properties.grid) {
      inschema.properties.grid['x-component-props'] = {
        minColumns: column || 1,
        maxColumns: column || 'horizontal',
      };
    }
    if (
      labelWidth &&
      labelWidth > 0 &&
      inschema.properties &&
      inschema.properties.grid &&
      inschema.properties &&
      inschema.properties.grid.properties
    ) {
      const gridInner = inschema.properties.grid.properties;
      const keys = Object.keys(gridInner);
      if (keys && keys.length > 0) {
        keys.forEach((m) => {
          if (gridInner[m]['x-decorator'] === 'FormItem') {
            gridInner[m]['x-decorator-props'] = {
              ...gridInner[m]['x-decorator-props'],
              labelWidth,
            };
          }
        });
      }
    }
    return inschema;
  };

  const onChange = (data) => {
    setState({ formData: data });
    if (props.onChange) {
      props.onChange(data);
    }
  };

  const onSchemaChange = (newSchema) => {
    setState({ schema: newSchema });
    if (props.onSchemaChange) {
      setTimeout(() => {
        if (!frwRef.current) return;
        const pureSchema = frwRef.current.getValue();
        props.onSchemaChange(pureSchema);
      }, 0);
    }
  };

  const rootState = {
    preview,
    selected,
    hovering,
  };

  const userProps = {
    submit,
    transformFrom,
    transformTo,
    isNewVersion,
    extraButtons,
    controlButtons,
    hideId,
    settings,
    commonSettings,
    globalSettings,
  };

  let transSchema = {};
  if (schema) {
    transSchema = combineSchema(schema); // TODO: 要不要判断是否都是object
  }
  const flatten = flattenSchema(transSchema);
  const flattenWithData = dataToFlatten(flatten, formData, 'cd');

  const onFlattenChange = (newFlatten, changeSource = 'schema') => {
    const newSchema = idToSchema(newFlatten);
    const newData = flattenToData(newFlatten);
    // 判断只有schema变化时才调用，一般需求的用户不需要
    if (changeSource === 'schema' && onSchemaChange) {
      onSchemaChange(newSchema);
    }
    // schema 变化大都会触发 data 变化
    onChange(newData);
  };

  const onItemChange = (key, value, changeSource) => {
    flattenWithData[key] = value;
    onFlattenChange(flattenWithData, changeSource);
  };

  let displaySchema = {};
  let displaySchemaString = '';
  try {
    const newSchema = {
      ...idToSchema(flattenWithData, '#', true),
      ...frProps,
    };
    displaySchema = transformTo(newSchema);
    if (!isNewVersion) {
      displaySchema = newSchemaToOld(displaySchema);
    }
    displaySchemaString = JSON.stringify(displaySchema, null, 2);
  } catch (error) {
    console.error(error);
  }

  const getValue = () => displaySchema;

  const setValue = (value) => {
    try {
      setState((oldState) => ({
        ...oldState,
        selected: undefined,
        ...schemaToState(value),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const copyValue = () => {
    copyTOClipboard(displaySchemaString);
  };

  useImperativeHandle(frwRef, () => ({
    getValue,
    setValue,
    copyValue,
  }));

  // TODO: flatten是频繁在变的，应该和其他两个函数分开
  const store = {
    flatten: flattenWithData, // schema + formData = flattenWithData
    onFlattenChange, // onChange + onSchemaChange = onFlattenChange
    onItemChange, // onFlattenChange 里只改一个item的flatten，使用这个方法
    userProps,
    frProps,
    displaySchema,
    displaySchemaString,
    ...rootState,
  };

  return (
    <DndProvider backend={HTML5Backend} context={window}>
      <ConfigProvider locale={zhCN}>
        <GlobalCtx.Provider value={setState}>
          <StoreCtx.Provider value={store}>{children}</StoreCtx.Provider>
        </GlobalCtx.Provider>
      </ConfigProvider>
    </DndProvider>
  );
}

export default forwardRef(Provider);
