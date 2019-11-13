import React, { Component } from 'react'
import SearchInput from './SearchInput';
import Select from './Select';
import { changeHandler } from './handler';

export default class CoursesFilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: props.projects,
            courses: props.courses,
            formControls: {
                project_id: null,
                search: "",
                course_status: null
            },
        };
        this.changeHandler = changeHandler.bind(this);
    }

    render() {
        return (
            <div className="d-inline-flex">
                <Select label="Projetos" name="project_id" value={this.state.formControls.project_id} onInput={(event) => { this.changeHandler(event) }} options={this.state.projects} defaultValue="Todos" />
                <Select
                    label='Status' name='course_status'
                    value={this.state.formControls.course_status}
                    onInput={this.changeHandler} options={this.state.courses.status}
                />
                <SearchInput name="search" onChange={this.changeHandler} />
            </div>
        );
    }
}
