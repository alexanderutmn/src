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
            <div className="tasklist">
                <div className="row">
                    {this.renderTasks()}
                </div>
            </div>
        )

    }

    renderTasks = () => {
        const {removeTask, editTask, tasks} = this.props
        if(tasks.length === 0)
            return (<div className="col-sm-6"><h4>Zadach ne naideno</h4></div>)
        return tasks.map((task, index) =>
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