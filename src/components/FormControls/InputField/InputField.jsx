import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    task: PropTypes.object,
}

function InputField({ name, form })
{
    const { errors } = form;
    const hasError = errors.name !== undefined;

    return (
        <Controller
            control={form.control}
            name={name}
            id={name}
            mt={1}
            variant="outlined"
            fullWidth
            error={hasError}
            helperText={errors.name?.message}
            as={TextField}
        />
    );
}

export default InputField;