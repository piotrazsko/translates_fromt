import get from 'lodash/get';

export const getTextfieldErrorFromResponse =
    ({ field, setErrors, errors }) =>
    (data) => {
        const error = get(data, 'response.data.error');
        const res = { ...errors };
        if (error.type === 'input') {
            if (Array.isArray(field)) {
                field.forEach((i) => {
                    res[i] = error.message;
                });
            } else {
                res[field] = error.message;
            }
        }

        setErrors(res);
    };
