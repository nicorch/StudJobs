import { useFormikContext } from 'formik';
import React from 'react';
import ErrorMessage from './ErrorMessage';
import AppInputText from "./../AppInputText"

function AppFormField({ name, ...otherProps }) {

    const { errors, handleChange, setFieldTouched, touched } = useFormikContext()

    return (
        <>
            <AppInputText
                {...otherProps}
                onChangeText={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormField;
