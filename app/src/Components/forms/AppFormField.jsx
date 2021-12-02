import { useFormikContext } from 'formik';
import React from 'react';
import ErrorMessage from './ErrorMessage';
import AppInputText from "./../AppInputText"

function AppFormField({ name, style, ...otherProps }) {

    const { errors, handleChange, setFieldTouched, touched } = useFormikContext()

    return (
        <>
            <AppInputText
                stl={style}
                {...otherProps}
                onChangeText={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormField;
