import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { loadTasks } from '../../actions/task'
import { connect } from 'react-redux'

//MATERIAL UI
import Box from "@material-ui/core/Box"
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    filterWrapper: {
        marginBottom: theme.spacing(4)
    },
    radioGroup: {
        flexDirection: "row"
    },
    filterBy: {
        marginBottom: theme.spacing(2)
    },
    sortBy: {
        marginBottom: theme.spacing(2)
    },
}))


const TaskFilter = ({ loadTasks }) => {

    const classes = useStyles()

    const [filterValues, setFilterValues] = useState({
        completed: '',
        sortBy: ''
    })

    const { completed, sortBy } = filterValues

    //ASYNC SETSTATE
    //setState is async hence if you try to immediately use the value after changing the state it may not yet have changed
    //hence we use useEffect which runs a function when listening to something that cahnges
    //We use useEffect to changes in filterValues and dispatch action. Similar to waiting to be updated then dispatch action
    useEffect(() => {
        loadTasks(filterValues)
    }, [filterValues, loadTasks])


    const handleRadio = e => {

        console.log(e.target.name, e.target.value)

        setFilterValues({
            ...filterValues,
            [e.target.name]: e.target.value
        })


    }

    return (
        <Box className={classes.filterWrapper}>
            <Box className={classes.filterBy}>
                <Typography variant="h5">
                    Filter By
                </Typography>

                <FormControl component="fieldset">
                    <RadioGroup name="completed" className={classes.radioGroup} value={completed} onChange={e => handleRadio(e)}>
                        <FormControlLabel value="" control={<Radio />} label="None" />
                        <FormControlLabel value="false" control={<Radio />} label="Incompleted" />
                        <FormControlLabel value="true" control={<Radio />} label="Completed" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box className={classes.sortBy}>
                <Typography variant="h5">
                    Sort By
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup name="sortBy" className={classes.radioGroup} value={sortBy} onChange={e => handleRadio(e)}>
                        <FormControlLabel value="" control={<Radio />} label="None" />
                        <FormControlLabel value="createdAt:asc" control={<Radio />} label="Oldest" />
                        <FormControlLabel value="createdAt:desc" control={<Radio />} label="Newest" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    )
}

TaskFilter.propTypes = {
    loadTasks: PropTypes.func.isRequired,
}

export default connect(null, { loadTasks })(TaskFilter)
