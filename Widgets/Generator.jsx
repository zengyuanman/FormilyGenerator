import React from 'react';
import { message } from 'antd';
import FrGenerator from '../index';

export const Generator = ({ value, onChange, ...props }) => {
  let defaultValue = {};
  if (value) {
    defaultValue = JSON.parse(value);
  }
  const resultChangeHandle = (data) => {
    if (onChange) onChange(data);
    message.success(`保存成功！`);
  };
  return (
    <div style={{ height: props.height || '600px' }}>
      <FrGenerator
        defaultValue={defaultValue}
        onResultChange={resultChangeHandle}
      />
    </div>
  );
};
