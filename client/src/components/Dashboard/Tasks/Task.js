import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Task = ({ task: { loading, tasks, task } }) => {

    return (
        <div>
            test
        </div>
    )
}

Task.propTypes = {

}

const mapStateToProps = state => ({
    task: state.task
})

export default connect(mapStateToProps)(Task)
