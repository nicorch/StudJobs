import { Formik } from 'formik';
import React from 'react';

function AppForm({ initialValues, onSubmit, children }) {

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {() => (
        <>
          {children}
        </>
      )}
    </Formik>
  );
}

export default AppForm;