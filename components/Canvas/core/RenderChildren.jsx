import React from 'react';
import FR from './index';

const RenderChildren = ({ children = [] }) => {
  return (
    <>
      {children.map((child, i) => {
        const FRProps = {
          id: child,
        };
        return <FR key={i.toString()} {...FRProps} />;
        // return '1';
      })}
    </>
  );
};

export default RenderChildren;
