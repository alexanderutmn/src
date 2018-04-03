import React, {Component} from 'react';
import TaskList from './TaskList'
import Navigations from './Navigations'
import Tasks from '../fixtures'
import ModalForm from './ModalForm'
import Calendar from 'react-calendar';
import '../css/css.css'
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            group: -1,
            openModal: false,
            editTask: null,
            dateCalendar: new Date(),
            pickCalendar: false
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
                    <button onClick={this.openModal.bind(this)} className="btn btn-primary btn-lg">create</button>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Calendar
                            onChange={this.onChangeCalendar}
                            value={this.state.date}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Navigations
                            onGroupClick={this.onGroupClick.bind(this)}
                        />
                    </div>
                </div>
                <TaskList
                    tasks={this.filterTasks(JSON.parse(localStorage.getItem('Tasks')))}
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

    onChangeCalendar = (dateCalendar) => {
        this.setState({
            pickCalendar: true,
            dateCalendar: dateCalendar
        })
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
            else{
                task.id = Math.random()
                tasks.push(task)
            }


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
            group: group,
            pickCalendar: false
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

    filterTasks = (data) => {
        var {group, pickCalendar} = this.state

        if(group == -1 && !pickCalendar)
            return data

        if(pickCalendar)
            return this.filterByCalendar(data)

        return this.filterByGroup(data, group)
    }

    filterByCalendar = (data) => {
        return data.filter(item => {
            var d = new Date(item.timetask),
                dayC = new Date(this.state.dateCalendar)

            return (d.getDate() == dayC.getDate() && d.getMonth() == dayC.getMonth() && d.getFullYear() == dayC.getFullYear())
        })
    }

    filterByGroup = (data, group) => {
        var today = new Date()
        return data.filter(item => {
            var d = new Date(item.timetask),
                razn = Math.ceil((d-today) / (1000 * 60 * 60 * 24))
            var day = razn === -0 ? 0 : razn

            if(day < 2)
                return (day == group && d.getDay() >= today.getDay())
            else
                return (day <= group && d.getDay() >= today.getDay())
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