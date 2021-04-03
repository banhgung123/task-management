import React, { useState } from 'react';
import { Box, Button, Divider, Grid, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import { SORT_LIST_STRING } from 'constants/index';

TaskSort.propTypes = {
    onSort: PropTypes.func,
}

function TaskSort({ onSort = null }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isSort, setIsSort] = useState(() => SORT_LIST_STRING[0]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = (value) => {
        const { by, val } = value;
        setIsSort(`${by} - ${val}`);

        if (onSort) onSort(value);
        handleClose();
    };

    return (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Box pt={1}>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<ArrowDropDownIcon />}
                    onClick={handleClick}
                >
                    Sắp Xếp
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    getContentAnchorEl={null}
                >   
                    <MenuItem onClick={() => handleSort({ by: 'name', val: 1 })}>
                        <i className="fas fa-sort-alpha-down"></i>&nbsp;Tên A-Z
                        {isSort === SORT_LIST_STRING[0] && <CheckIcon />}
                    </MenuItem>
                    <MenuItem onClick={() => handleSort({ by: 'name', val: -1 })}>
                        <i className="fas fa-sort-alpha-down-alt"></i>&nbsp;Tên Z-A
                        {isSort === SORT_LIST_STRING[1] && <CheckIcon />}
                    </MenuItem>
                    <Divider light />
                    <MenuItem onClick={() => handleSort({ by: 'status', val: 1 })}>
                        Trạng Thái Kích Hoạt&nbsp;
                        {isSort === SORT_LIST_STRING[2] && <CheckIcon />}
                    </MenuItem>
                    <MenuItem onClick={() => handleSort({ by: 'status', val: -1 })}>
                        Trạng Thái Ẩn&nbsp;
                        {isSort === SORT_LIST_STRING[3] && <CheckIcon />}
                    </MenuItem>
                </Menu>
            </Box>
        </Grid>
    );
}

export default TaskSort;