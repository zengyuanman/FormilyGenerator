import React from 'react';
import { useDrag } from 'react-dnd';
import { nanoid } from 'nanoid';
import { useGlobal, useStore } from '../../hooks';
import { addItem } from '../../utils';
import './Element.css';
// 目前没有用icon，但是可以补上
const WidgetUI = ({ onClick, text }) => {
  return (
    <li className="left-item" onClick={onClick}>
      {text}
    </li>
  );
};
const Element = ({ text, name, schema, icon, fixedName, setting }) => {
  const [{}, dragRef] = useDrag({
    type: 'box',
    item: {
      dragItem: {
        parent: '#',
        schema,
        setting,
        children: [],
      },
      $id: `#/${name}_${nanoid(6)}`,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const setGlobal = useGlobal();
  const { selected, flatten, onFlattenChange } = useStore();

  const handleElementClick = () => {
    if (selected && !flatten[selected]) {
      setGlobal({ selected: '#' });
      return;
    }
    const { newId, newFlatten } = addItem({
      selected,
      name,
      schema,
      setting,
      flatten,
      fixedName,
    });
    onFlattenChange(newFlatten);
    setGlobal({ selected: newId });
  };

  return (
    <div ref={dragRef}>
      <WidgetUI text={text} icon={icon} onClick={handleElementClick} />
    </div>
  );
};

export default Element;
