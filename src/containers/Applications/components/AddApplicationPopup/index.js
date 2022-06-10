import React from 'react';
import { Popup } from 'components';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().min(3).max(16).required(),
});

const AddApplicationPopup = ({
    t,
    applicationName = '',
    onCancel,
    onSubmit,
}) => {
    const { handleChange, setValues, errors, handleSubmit, values } = useFormik(
        {
            initialValues: { name: applicationName },
            validationSchema,
            onSubmit,
        },
    );
    React.useEffect(() => {
        if (applicationName) {
            setValues({ name: applicationName });
        }
    }, [applicationName]);

    return (
        <form onSubmit={handleSubmit}>
            <Popup onCancel={onCancel} confirmButtonProps={{ type: 'submit' }}>
                <TextField
                    label={t(`translates.label.popup`)}
                    onChange={handleChange('name')}
                    error={errors.name}
                    value={values.name}
                    helperText={errors.name}
                />
            </Popup>
        </form>
    );
};

export default AddApplicationPopup;
