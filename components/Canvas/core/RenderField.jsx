import React from 'react';
import { transformProps } from '../../../utils';
import FormilyFiledRender from './FormilyFiledRender';

const RenderField = ({ item, contentClass, children }) => {
  const { schema } = item;
  // TODO: useMemo
  // 改为直接使用form-render内部自带组件后不需要再包一层options
  const usefulWidgetProps = transformProps({
    schema,
    ...schema.props,
  });

  return (
    <div className={contentClass}>
      {children}
      <FormilyFiledRender {...usefulWidgetProps}></FormilyFiledRender>
    </div>
  );
};

export default RenderField;
