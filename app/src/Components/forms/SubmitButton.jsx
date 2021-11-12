import { useFormikContext } from 'formik';
import React from 'react';
import AppButton from '../AppButton';

function SubmitButton({ title, color }) {

  const { handleSubmit } = useFormikContext()
  return (
    <AppButton title={title} color={color} onHandlePress={handleSubmit} />
  );
}

export default SubmitButton;
