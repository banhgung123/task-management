import React from 'react';
import TaskSearch from './TaskSearch';
import TaskSort from './TaskSort';
import PropTypes from 'prop-types';

TaskControl.propTypes = {
    onSearch: PropTypes.func,
    onSort: PropTypes.func,
}

function TaskControl({ onSearch = null, onSort = null }) {
    return (
        <>
            {/* Search */}
            <TaskSearch onSearch={onSearch}/>
            {/* Sort */}
            <TaskSort onSort={onSort}/>
        </>
    );
}

export default TaskControl;