import React, { useMemo, useState, useEffect } from 'react';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormItem,
  Input,
  Select,
  Radio,
  NumberPicker,
} from '@formily/antd';
import { defaultGlobalSettings } from '../../settings';
import { useStore, useGlobal } from '../../hooks';

const SchemaField = createSchemaField({
  components: { Select, Input, FormItem, Radio, NumberPicker },
});
export default function GlobalSettings() {
  const [innerUpdate, setInnerUpdate] = useState(false);
  const { frProps, userProps = {} } = useStore();
  const setGlobal = useGlobal();
  const globalSettings = userProps.globalSettings || defaultGlobalSettings;
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFormValuesChange((forms) => {
            setInnerUpdate(true);
            setGlobal({ frProps: { ...frProps, ...forms.values } });
          });
        },
      }),
    []
  );
  useEffect(() => {
    if (innerUpdate) {
      setInnerUpdate(false);
    } else {
      form.setInitialValues(frProps);
    }
  }, [frProps]);
  return (
    <div style={{ paddingRight: 24 }}>
      <Form form={form} layout="vertical">
        <SchemaField schema={globalSettings} />
      </Form>
    </div>
  );
}
