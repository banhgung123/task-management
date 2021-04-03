import { Box, Button, Container, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import TaskControl from './components/TaskControl';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { SORT_LIST_OBJECT } from 'constants/index';

TaskFeature.propTypes = {
    
};

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function generateId() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function TaskFeature(props) {
    const [tasks, setTasks] = useState(() => {
        if (!localStorage || !localStorage.getItem('tasks')) return [];
        if (localStorage && localStorage.getItem('tasks')) return JSON.parse(localStorage.getItem('tasks'));
    });
    const [taskEditing, setTaskEditing] = useState(() => {});
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [searchTasks, setSearchTasks] = useState(null);
    const [sortTasks, setSortTasks] = useState(() => SORT_LIST_OBJECT[0]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const onToggleForm = (value) => {
        setIsDisplayForm(value);    
    };

    const onSubmit = (values) => {
        const { name, status } = values;
        const index = findIndex(taskEditing?.id);
        const newTask = { id: index === -1 ? generateId() : taskEditing?.id, name: name, status: status.value };
        const taskList = [...tasks];
        if (index === -1) taskList.push(newTask);
        if (index !== -1) taskList[index] = newTask;
        setTasks(taskList);
        setTaskEditing(null);
    };

    const findIndex = id => {
        return tasks.findIndex(task => task.id === id);
    };

    const onUpdateStatus = (id) => {
        const index = findIndex(id);
        const newTasks = [...tasks];
        const temp = newTasks.map((task, i) => {
            if (i === index) task.status = !task.status;
            return task;
        });
        setTasks(temp);
        setTaskEditing({ ...temp[index] });
    };

    const onDelete = (id) => {
        const index = findIndex(id);
        const newTasks = [...tasks];
        setTasks(newTasks.filter((item, i) => i !== index));
        onToggleForm(false);
    };

    const onUpdate = (id) => {
        const index = findIndex(id);
        onToggleForm(true);
        setTaskEditing(tasks[index]);
    };

    const onAdd = () => {
        onToggleForm(true);
        setTaskEditing(null);
    };

    const onSearch = (value) => {
        setSearchTasks(value);
    };

    const onSort = (value) => {
        setSortTasks(value);
    };

    return (
        <Box>
            <Container fixed>
                <Box align="center" borderBottom={1}>
                    <h1>Quản Lý Công Việc</h1>
                </Box>
                <Grid container spacing={3}>
                    {/* Form */}
                    {isDisplayForm && <TaskForm
                        onToggleForm={onToggleForm}
                        onSubmit={onSubmit}
                        taskEditing={taskEditing}
                        setTaskEditing={setTaskEditing}
                    />}
                    <Grid item xs={12} sm={12} md={isDisplayForm ? 8 : 12} lg={isDisplayForm ? 8 : 12} xl={isDisplayForm ? 8 : 12}>
                        <Box mt={4} component="section">
                            <Box mb={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={onAdd}
                                >
                                    Thêm Công Việc
                                </Button>
                            </Box>
                            <Grid container spacing={2}>
                                {/* Control */}
                                <TaskControl
                                    onSearch={onSearch}
                                    onSort={onSort}
                                />
                                {/* List */}
                                <TaskList
                                    tasks={tasks}
                                    search={searchTasks}
                                    sort={sortTasks}
                                    onUpdateStatus={onUpdateStatus}
                                    onDelete={onDelete}
                                    onUpdate={onUpdate}
                                />
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default TaskFeature;