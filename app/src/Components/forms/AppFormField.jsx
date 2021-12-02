import { useFormikContext } from 'formik';
import React from 'react';
import ErrorMessage from './ErrorMessage';
import AppInputText from "./../AppInputText"

function AppFormField({ name, style, ...otherProps }) {

    const { errors, values, setFieldValue, setFieldTouched, touched } = useFormikContext()

    return (
        <>
            <AppInputText
                stl={style}
                {...otherProps}
                onChangeText={(text) => setFieldValue(name, text)}
                values={values[name]}
                onBlur={() => setFieldTouched(name)}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormField;
