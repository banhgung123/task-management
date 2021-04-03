import { Box, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

SelectField.propTypes = {
    name: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,

    options: PropTypes.arrayOf(PropTypes.object),
};

function SelectField({
    name,
    form,
    options = []
    })
{
    const { errors } = form;
    const hasError = errors.status !== undefined;

    return (
        <>
            <Controller
                name={name}
                control={form.control}
                options={options}
                id={name}
                aria-labelledby={name}
                as={Select}
            />
            {hasError && <Box ml={2}><FormHelperText error={hasError}>{errors.status?.message}</FormHelperText></Box>}
        </>
    );
}

export default SelectField;