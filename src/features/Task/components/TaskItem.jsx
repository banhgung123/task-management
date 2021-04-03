import { Box, Button, Chip, TableCell, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import PropTypes from 'prop-types';

TaskItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    onUpdateStatus: PropTypes.func,
    onDelete: PropTypes.func
};

function TaskItem({ item = {}, index = 0, onUpdateStatus = null, onDelete = null, onUpdate = null }) {
    const handleUpdateStatus = () => {
        if (onUpdateStatus) onUpdateStatus(item.id);
    };

    const handleDelete = () => {
        if (onDelete) onDelete(item.id);
    };

    const handleUpdate = () => {
        if (onUpdate) onUpdate(item.id);
    };

    return (
        <TableRow key={index}>
            <TableCell component="th" scope="row">
                <b>{index + 1}</b>
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell align="center">
                <Chip
                    color={item.status ? 'secondary' : 'primary'}
                    size="small" label={item.status ? 'Kích Hoạt' : 'Ẩn'}
                    onClick={handleUpdateStatus}
                />
            </TableCell>
            <TableCell>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box mr={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={handleUpdate}
                        >
                            Sửa
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={handleDelete}
                        >
                            Xóa
                        </Button>
                    </Box>
                </Box>
            </TableCell>
        </TableRow>
    );
}

export default TaskItem;