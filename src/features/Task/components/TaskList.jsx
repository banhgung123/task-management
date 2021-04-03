import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import TaskItem from './TaskItem';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useState, useEffect, useRef } from 'react';
import { OPTION_LIST } from 'constants/index';

const useStyles = makeStyles(theme => ({
    root: {
        
    },

    table: {
        minWidth: 650,
    },
}));

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    search: PropTypes.string,
    sort: PropTypes.object,
    onUpdateStatus: PropTypes.func,
    onDelete: PropTypes.func,
};

function TaskList({ tasks = [], search = null, sort = null, onUpdateStatus = null, onDelete = null, onUpdate = null}) {
    const classes = useStyles();

    useEffect(() => {
        setTasksFilter(tasks);
    }, [tasks.length, tasks]);

    useEffect(() => {
        handleInputFilters(search);
    }, [search]);

    useEffect(() => {
        sortFilters(sort);
    }, [sort]);

    const [tasksFilter, setTasksFilter] = useState(tasks);
    const typingTimeoutRef = useRef(null);
    
    const handleUpdateStatus = (id) => {
        if (onUpdateStatus) onUpdateStatus(id);
    };

    const handleDelete = (id) => {
        if (onDelete) onDelete(id);
    }

    const handleUpdate = (id) => {
        if (onUpdate) onUpdate(id);
    }

    const filter = value => item => item.name.toLowerCase().indexOf(value) !== -1;
    const activeStatus = item => item.status === true;
    const deactiveStatus = item => item.status === false;
    const activeTasks = tasks => tasks.filter(activeStatus);
    const deactiveTasks = tasks => tasks.filter(deactiveStatus);


    const handleInputFilters = (e) => {
        const value = e?.target?.value || e;
        if (value) {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

            typingTimeoutRef.current = setTimeout(() => {
                setTasksFilter([...tasks].filter(filter(value)));
            }, 300);
        } else {
            setTasksFilter([...tasks]);
        }
    }

    const handleSelectFilters = (e) => {
        const { value } = e;
        if (value === -1) return setTasksFilter([...tasks]);
        if (value === 0) return setTasksFilter(deactiveTasks([...tasks]));
        if (value === 1) return setTasksFilter(activeTasks([...tasks]));
    }

    const handleFilters = (e, type) => {
        if (type === 1) handleInputFilters(e);
        if (type === 2) handleSelectFilters(e);
    }

    const sortAZAD = obj => (a, b) => {
        if (a[obj.by] < b[obj.by]) return obj.val;
        if (a[obj.by] > b[obj.by]) return -obj.val;
        return 0;
    };

    const sortFilters = () => {
        const temp = [...tasks];
        setTasksFilter([...tasks].sort(sortAZAD(sort)));
    }

    return (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Tên</TableCell>
                            <TableCell align="center">Trạng Thái</TableCell>
                            <TableCell align="center">Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell scope="row"></TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => handleFilters(e, 1)}
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    options={OPTION_LIST}
                                    name="status"
                                    onChange={(e) => handleFilters(e, 2)}
                                />
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    {tasksFilter.map((task, index) => (
                        <TaskItem
                            key={task.id}
                            item={task}
                            index={index}
                            onUpdateStatus={handleUpdateStatus}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default TaskList;