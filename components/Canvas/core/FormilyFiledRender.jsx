import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormItem,
  FormGrid,
  Input,
  NumberPicker,
  Select,
  Switch,
  Radio,
  DatePicker,
} from '@formily/antd';
import { getKeyFromUniqueId } from '../../../utils';
import { useStore } from '../../../hooks';
import { FormilyOssUpload } from '@/components/FrGenerator/Widgets/FormilyOssUpload';

const SchemaField = createSchemaField({
  components: {
    Select,
    Input,
    NumberPicker,
    FormItem,
    FormGrid,
    Switch,
    Radio,
    DatePicker,
    FormilyOssUpload,
  },
});
export default function FormilyFiledRender({ schema }) {
  const { displaySchema, frProps } = useStore();
  const { labelWidth } = frProps;

  const form = createForm();
  if (['void', 'object'].includes(schema.type)) {
    return '';
  }
  const id = getKeyFromUniqueId(schema.$id);
  const renderSchema = {
    type: 'object',
    properties: {},
  };
  renderSchema.properties[id] = schema;
  if (labelWidth && labelWidth > 0 && renderSchema.properties) {
    const gridInner = renderSchema.properties;
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

  return (
    <Form form={form} layout={displaySchema.layout || 'horizontal'}>
      <SchemaField schema={renderSchema} />
    </Form>
  );
}
