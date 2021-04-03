import React from 'react';
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useRef } from 'react';
import PropTypes from 'prop-types';

TaskSearch.propTypes = {
    onSearch: PropTypes.func,
}

function TaskSearch({ onSearch = null }) {
    const searchRef = useRef(null);

    const handleSearch = () => {
        if (onSearch) onSearch(searchRef.current.value);
    }

    return (
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
                inputRef={searchRef}
                variant="outlined"
                fullWidth
                placeholder="Nhập từ khóa..."
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            onClick={handleSearch}
                        >
                            Tìm
                        </Button>
                    </InputAdornment>,
                    // classes: {
                    //     root: classes.root
                    // }
                }}
            />
        </Grid>
    );
}

export default TaskSearch;