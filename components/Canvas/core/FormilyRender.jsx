import React from 'react';
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
import { useStore } from '../../../hooks';
import { FormilyOssUpload } from '../../../Widgets/FormilyOssUpload';

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
export default function FormilyRender({ schema }) {
  const { userProps } = useStore();
  const renderSchema = userProps.transformFrom(schema);
  const form = createForm();
  return (
    <Form form={form} layout={renderSchema.layout || 'horizontal'}>
      <SchemaField schema={renderSchema} />
    </Form>
    // <pre>{displaySchemaString}</pre>
  );
}
