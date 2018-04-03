import React, {Component} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

class ModalForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            important: false,
            timetask: '',
            text: '',
            people: [],
            id: null,
            requireFields: [
                'title'
            ],
            validForm: false
        }

        this.idEditTask = null

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);


    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.task)
            this.setState({
                title: nextProps.task.title,
                important: nextProps.task.important,
                timetask: nextProps.task.timetask,
                text: nextProps.task.text,
                people: nextProps.task.people,
                id: nextProps.task.id
            });
        else
            this.setState({
                title: '',
                important: false,
                timetask: '',
                text: '',
                people: [],
                id: null
            })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleDelete(i) {
        let people = this.state.people;
        people.splice(i, 1);
        this.setState({people: people});
    }

    handleAddition(text) {
        let people = this.state.people;
        people.push({
            id: people.length + 1,
            text: text
        });
        this.setState({people: people});
    }


    handleSubmit = (e) => {
        e.preventDefault()
        const {handleSubmit} = this.props

        // this.validateFrom()

        // console.log(this.state.validForm)

        // if(this.state.validForm)
            handleSubmit(this.state)
    }

    // validateFrom = () => {
    //     const {requireFields} = this.state
    //     var valid = true
    //     requireFields.forEach((item) => {
    //         if(this.state[item] == ''){
    //             valid = false
    //             alert(item + ' is required' )
    //         }
    //     })
    //     this.setState({
    //         validForm: valid
    //     })
    // }
    

    render() {
        const {open, handleSubmit, onCloseModal} = this.props
        console.log(this.state.errorTexts)
        return (
            <div className="modal-form" style={{'display': open ? 'block' : 'none' }}>
                <div className="modal-form__background" onClick={onCloseModal}>

                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="">
                            title
                        </label>
                        <input name="title" type="text" className="form-control" value={this.state.title} onChange={this.handleInputChange}/>

                    </div>

                    <div className="form-group">
                        <label htmlFor="">
                            timetask

                        </label>
                        <input name="timetask" type="date" className="form-control" value={this.state.timetask}
                               onChange={this.handleInputChange}/></div>
                    <div className="form-group">
                        <label htmlFor="">
                            text
                        </label>
                        <textarea className="form-control" value={this.state.text} name="text" onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">
                            people

                        </label>
                        <ReactTags
                            tags={this.state.people}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            placeholder="add people"
                        />
                    </div>
                    <div className="form-check">

                        <input name="important" className="form-check-input" type="checkbox" checked={ this.state.important ? 'checked' : ''}
                               onChange={this.handleInputChange}/>
                        <label htmlFor="" className="form-check-label">
                            important
                        </label>
                    </div>



                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}


export default ModalForm
