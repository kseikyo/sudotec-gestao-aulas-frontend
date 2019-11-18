import React, { Component } from 'react'
import SearchInput from './SearchInput';
import Select from './Select';
import { changeHandler } from './handler';
import projects from '../../services/api/projects';
import courses from '../../services/api/courses';

export default class CoursesFilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            courses: [],
            formControls: {
                project_id: null,
                search: "",
                status: null
            },
        };
        this.changeHandler = changeHandler.bind(this);
    }

    componentDidMount() {
        projects.getAll().then(res => {
            this.setState({ projects: res.data });
        });

        courses.getAll().then(res => {
            this.setState({ courses: res.data });
        });
    }

    render() {
        return (
            <div className="d-flex ">
                <Select 
                    label="Projetos" 
                    name="project_id" 
                    value={this.state.formControls.project_id} 
                    onInput={(event) => { this.changeHandler(event) }} 
                    options={this.state.projects} 
                />
                <Select
                    value={this.state.formControls.status}
                    label="Status"
                    name="status"
                    descriptionAttr='status'
                    valueAttr='status'
                    onChange={(event) => { this.changeHandler(event) }}
                    options={[{'status': 'Ativo'}, {'status': 'Inativo'}]}
                />
                <SearchInput name="search" onChange={this.changeHandler} />
            </div>
        );
    }
}
