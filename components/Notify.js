/** @format */

import React, { useContext } from 'react';
import { DataContext } from '@store/GlobalState';
import Loading from './Loading';
import Toast from '@components/Toast';

function Notify() {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: 'Error' }}
          handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
          bgColor="red.300"
        />
      )}
      {notify.success && (
        <Toast
          msg={{ msg: notify.success, title: 'Success' }}
          handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
          bgColor="green.300"
        />
      )}
    </>
  );
}

export default Notify;
