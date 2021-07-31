import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const AutoSelect = ({ value, onChange, defaultEnum = [], ...props }) => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const setReturnEnums = (innerLabels, innerValues) => {
    const length =
      innerLabels.length > innerValues.length
        ? innerValues.length
        : innerLabels.length;

    const returnEnums = innerLabels
      .filter((m, idx) => idx < length)
      .map((m, index) => {
        return {
          label: m,
          value: innerValues[index] || '',
        };
      });
    if (
      innerLabels.length > 0 &&
      innerValues.length > 0 &&
      returnEnums.length > 0
    ) {
      onChange(returnEnums);
    }
  };

  return (
    <div>
      <div style={{ lineHeight: '18px', color: '#999', fontSize: '10px' }}>
        label
      </div>
      <Select
        {...props}
        mode="tags"
        onChange={(data) => {
          setLabels(data);
          setReturnEnums(data, values);
        }}
      >
        {defaultEnum &&
          defaultEnum.length > 0 &&
          defaultEnum.map((m) => (
            <Option key={`${m.label}-label`} value={m.label}>
              {m.label}
            </Option>
          ))}
      </Select>
      <div style={{ lineHeight: '18px', color: '#999', fontSize: '10px' }}>
        value
      </div>
      <Select
        {...props}
        mode="tags"
        onChange={(data) => {
          setValues(data);
          setReturnEnums(labels, data);
        }}
      >
        {defaultEnum &&
          defaultEnum.length > 0 &&
          defaultEnum.map((m) => (
            <Option key={`${m.value}-value`} value={m.value}>
              {m.value}
            </Option>
          ))}
      </Select>
    </div>
  );
};
