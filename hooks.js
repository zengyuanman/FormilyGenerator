import { useReducer, useContext } from 'react';
import { GlobalCtx, StoreCtx } from './context';

// 使用最顶层组件的 setState
export const useGlobal = () => {
  return useContext(GlobalCtx);
};

// 组件最顶层传入的所有props
export const useStore = () => {
  return useContext(StoreCtx);
};

// 类似于 class component 的 setState
export const useSet = (initState) => {
  const [state, setState] = useReducer((tmpState, newState) => {
    let action = newState;
    if (typeof newState === 'function') {
      action = action(tmpState);
    }
    if (newState.action && newState.payload) {
      action = newState.payload;
      if (typeof action === 'function') {
        action = action(tmpState);
      }
    }
    return { ...tmpState, ...action };
  }, initState);

  const setStateWithActionName = (tmpState) => {
    setState(tmpState);
  };

  return [state, setStateWithActionName];
};
