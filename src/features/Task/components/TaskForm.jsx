import { Box, Button, Grid, InputLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import InputField from 'components/FormControls/InputField/InputField';
import SelectField from 'components/FormControls/SelectField/SelectField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from 'react';
import { OPTION_FORM } from 'constants/index';

TaskForm.propTypes = {
    onSubmit: PropTypes.func,
    onToggleForm: PropTypes.func,
    taskEditing: PropTypes.object,
    setTaskEditing: PropTypes.func
};

function TaskForm({ onSubmit = null, onToggleForm = null, taskEditing = {}, setTaskEditing = null }) {
    useEffect(() => {
        form.setValue('name', taskEditing?.name || '');
        form.setValue('status', OPTION_FORM.find(o => o.value === taskEditing?.status) || null);
    }, [taskEditing]);

    const schema = yup.object().shape({
        name: yup.string().required('Nhập Tên Công Việc'),
        status: yup.object({
            value: yup.bool().required('Thiếu Giá Trị Trạng Thái'),
            label: yup.string().required('Thiếu Tên Trạng Thái')
        }).nullable().required('Chọn Trạng Thái'),
    });

    const form = useForm({
        defaultValues: {
            // 'name': task ? task.name : '',
            // 'status': task ? options.find(o => o.value === task.status) : null
            'name': '',
            'status': null
        },
        resolver: yupResolver(schema)
    });

    const handleSubmit = (values) => {
        if (onSubmit) onSubmit(values);

        form.reset();
    };

    const handleCancel = () => {
        form.reset();
        if (setTaskEditing) setTaskEditing(null);
        if (onToggleForm) onToggleForm(false);
    };

    return (
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box
                component="section"
                mt={4} border={1}
                borderColor="warning.light"
                borderRadius="4px"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={2} border={1}
                    bgcolor="warning.light"
                    borderColor="warning.light"
                    borderRadius="4px 4px 0 0"
                >
                    <Box
                        component="p"
                        fontWeight="fontWeightMedium"
                    >
                        {taskEditing ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
                    </Box>
                    <CancelIcon fontSize="small" onClick={handleCancel}/>
                </Box>
                <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
                    <Box mx={1} my={2}>
                        <InputLabel htmlFor="name" children={<b><p>Tên:</p></b>} />
                        <InputField
                            form={form}
                            name="name"
                        />
                    </Box>
                    <Box mx={1} my={2}>
                        <InputLabel htmlFor="status"><b><p>Trạng Thái:</p></b></InputLabel>
                        <SelectField
                            name="status"
                            form={form}
                            options={OPTION_FORM}
                        />
                    </Box>
                    <Box
                        mx={1} my={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box mr={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                type="submit"
                            >
                                Lưu Lại
                            </Button>
                            
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<CloseIcon />}
                                onClick={handleCancel}
                            >
                                Hủy Bỏ
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Grid>
    );
}

export default TaskForm;