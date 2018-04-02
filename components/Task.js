import React, {Component} from 'react';

class Task extends Component {

    constructor(props){
        super(props)
    }

    render(){
        const {task, removeTask, editTask} = this.props
        return(
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-header">
                        <h2 >
                            {task.title}
                            {task.important}
                            <button className="btn btn-primary" onClick={editTask} data-id={task.id}>edit</button>
                            <button className="btn btn-danger" onClick={removeTask} data-id={task.id}>delete</button>
                        </h2>
                    </div>
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">time: {task.timetask}</h6>
                        <section className="card-text">{task.text}</section>
                    </div>
                    <div className="card-footer">
                        {task.people}
                    </div>
                </div>
            </div>
        )
    }
}


export default Task
