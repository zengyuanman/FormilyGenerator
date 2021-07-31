import React, { useMemo, useState, useEffect } from 'react';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  Form,
  FormItem,
  Input,
  Select,
  Radio,
  Switch,
  NumberPicker,
} from '@formily/antd';
import { defaultCommonSettings } from '../../settings';
import { useStore } from '../../hooks';
import { getKeyFromUniqueId } from '../../utils';

import { AutoSelect } from '../../Widgets/AutoSelect';

const SchemaField = createSchemaField({
  components: {
    Select,
    Input,
    FormItem,
    Radio,
    AutoSelect,
    Switch,
    NumberPicker,
  },
});

export default function GlobalSettings() {
  const [values, setValues] = useState();
  const [noChangeValue, setNoChangeValue] = useState(false);
  const { selected, flatten, onItemChange } = useStore();
  const item = flatten[selected];
  const { schema = {}, setting = {} } = item || {};
  const { props, ...componentSetting } = setting;
  const commonSettings = {
    ...defaultCommonSettings,
    properties: {
      ...defaultCommonSettings.properties,
      ...componentSetting,
    },
  };
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFormValuesChange((form) => {
            setValues(JSON.stringify(form.values));
          });
        },
      }),
    []
  );
  useEffect(() => {
    if (schema) {
      if (schema.$id) {
        schema.$id = getKeyFromUniqueId(schema.$id);
      }
      form.reset();
      form.setValues({
        ...schema,
      });
      setNoChangeValue(true);
    }
  }, [selected]);
  useEffect(() => {
    if (noChangeValue) {
      setNoChangeValue(false);
      return;
    }
    if (values) {
      const newValues = JSON.parse(values);
      console.log('GlobalSettings -> newValues', newValues, schema);
      let isEqual = true;
      Object.keys(newValues).forEach((m) => {
        // console.log(
        //   'GlobalSettings ->  newValues[m] !== schema[m]',
        //   newValues[m],
        //   schema[m],
        //   newValues[m] !== schema[m]
        // );

        if (
          (typeof newValues[m] === 'number' ||
            typeof newValues[m] === 'string' ||
            typeof newValues[m] === 'boolean') &&
          newValues[m] !== schema[m]
        ) {
          isEqual = false;
        }
        if (
          typeof newValues[m] === 'object' &&
          JSON.stringify(newValues[m]) !== JSON.stringify(schema[m])
        ) {
          isEqual = false;
        }
      });
      if (!isEqual) {
        onItemChange(selected, {
          ...item,
          schema: {
            ...newValues,
            $id: newValues.$id ? `${item.parent}/${newValues.$id}` : '',
          },
        });
      }
    }
  }, [values]);
  return (
    <div style={{ paddingRight: 24 }}>
      <Form form={form} layout="vertical">
        <SchemaField schema={commonSettings} />
      </Form>
    </div>
  );
}
