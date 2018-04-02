import React, {Component} from 'react';
import TaskList from './TaskList'
import Navigations from './Navigations'
import Tasks from '../fixtures'
import ModalForm from './ModalForm'
import '../css/css.css'
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            group: -1,
            openModal: false,
            editTask: null
        }

        localStorage.setItem('Tasks', JSON.stringify(Tasks));

    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">
                        TODO list
                    </h1>
                    <button onClick={this.openModal.bind(this)}>create</button>
                </div>
                <Navigations
                    onGroupClick={this.onGroupClick.bind(this)}
                />
                <TaskList
                    tasks={this.filterBy(JSON.parse(localStorage.getItem('Tasks')), 'timetask', new Date())}
                    removeTask={this.handleRemoveTask.bind(this)}
                    editTask={this.handleEditTask.bind(this)}
                />
                <ModalForm
                    open={this.state.openModal}
                    onCloseModal={this.closeModal.bind(this)}
                    task={this.state.editTask}
                    handleSubmit={this.onSubmitForm.bind(this)}
                />
            </div>
        )
    }
    
    onSubmitForm = (task) => {

        try {
            var id = task.id,
                tasks = JSON.parse(localStorage.getItem("Tasks"))

            var index = tasks.findIndex((item) => {
                return item.id == id
            })

            if(index >= 0)
                tasks[index] = task
            else
                tasks.push(task)

            localStorage.setItem("Tasks", JSON.stringify(tasks))

            this.setState({
                group: this.state.group
            })
            this.closeModal()
            alert('Задача записана')
        } catch (e){
            alert('Произошла ошибка записи')
            console.log(e)
        }

    }

    onGroupClick = (group) => {
        this.setState({
            group: group
        })
    }

    openModal = () => {
        this.setState({
            openModal: true
        })
    }

    closeModal = () => {
        this.setState({
            openModal: false,
            editTask: null
        })
    }

    filterBy = (data, field, today) => {
        var g = this.state.group

        if(g == -1)
            return data

        return data.filter(item => {
            var d = new Date(item[field]),
                razn = Math.ceil((d-today) / (1000 * 60 * 60 * 24))
            var day = razn === -0 ? 0 : razn

            if(day < 2)
                return (day == g && d.getDay() >= today.getDay())
            else
                return (day <= g && d.getDay() >= today.getDay())
        })
    }

    handleRemoveTask = (e) => {
        try{
            var id = e.target.dataset.id,
                tasks = JSON.parse(localStorage.getItem("Tasks"))

            var index = tasks.findIndex((item) => {
                return item.id == id
            })

            tasks.splice(index, 1)

            localStorage.setItem("Tasks", JSON.stringify(tasks))

            this.setState({
                group: this.state.group
            })

            alert('Задача успешно удалена')
        }catch (error){
            alert('Ошибка удаления')
            console.log(error)
        }


    }

    handleEditTask = (e) => {
        var id = e.target.dataset.id,
            tasks = JSON.parse(localStorage.getItem("Tasks"))

        var index = tasks.findIndex((item) => {
            return item.id == id
        })

        this.setState({
            editTask: tasks[index],
            openModal: true
        })
    }

}

export default App