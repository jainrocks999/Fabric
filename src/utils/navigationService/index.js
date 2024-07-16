import * as React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';
export const navigationRef = React.createRef();
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}
export function replace(...args) {
  navigationRef.current?.dispatch(StackActions.replace(...args));
}

export function reset(name, params) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name, params}],
    }),
  );
}
