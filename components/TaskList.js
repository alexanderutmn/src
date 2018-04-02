import React, {Component} from 'react';
import Task from './Task'


class TaskList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
            editTask: null
        }
    }

    render() {
        return (
            <div className="row">
                {this.renderTasks()}
            </div>
        )

    }

    renderTasks = () => {
        const {removeTask, editTask} = this.props
        return this.props.tasks.map((task, index) =>
            <Task
                key = {index}
                task={task}
                removeTask={removeTask}
                editTask={editTask}
            />
        )
    }

}

export default TaskList