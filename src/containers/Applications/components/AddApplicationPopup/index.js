import React from 'react';
import { Popup } from 'components';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().min(3).max(32).required(),
});

const AddApplicationPopup = ({ t, onCancel, onSubmit }) => {
    const { handleChange, errors, handleSubmit, values } = useFormik({
        initialValues: { name: '' },
        validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={handleSubmit}>
            <Popup
                align="center"
                onCancel={onCancel}
                confirmButtonProps={{ type: 'submit' }}
                title={t('applications.add_application_title')}
                subtitle={t('applications.add_application_name_subtitle')}
                submitButtonText={t('applications.save_application_button')}
            >
                <TextField
                    inputRef={(input) => input && input.focus()}
                    onChange={handleChange('name')}
                    error={errors.name}
                    value={values.name}
                    helperText={errors.name}
                    fullWidth
                />
            </Popup>
        </form>
    );
};

export default AddApplicationPopup;
