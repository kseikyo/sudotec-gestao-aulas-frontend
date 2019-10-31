import React, { Component } from 'react'
import Select from './Select'
import { changeHandler } from './handler'

export default class GradesFilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: props.teachers,
            grades: props.grades,
            formControls = {
                teacher_name: null,
                grade_status: null,
                search: ""
            }
        }

        this.changeHandler = changeHandler.bind(this);
    }
    
    render() {
        return (
            <div className="d-inline-flex">
                <Select 
                    label="Professores"
                    name="teacher_name"
                    value={this.state.formControls.teacher_name} 
                    onInput={(event) => {this.changeHandler(event)}}
                    options={this.state.teachers}
                    defaultValue="Todos"
                />
                <Select 
                    label='Status' name='grade_status' 
                    value={this.state.formControls.course_status} 
                    onInput={this.changeHandler} options={this.state.courses.status} 
                />
                <SearchInput name="search" onChange={this.changeHandler}/>
            </div>
        )
    }
}
