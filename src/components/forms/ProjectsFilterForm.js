import React, { Component } from 'react';
import SearchInput from './SearchInput';
import Select from './Select';
import {changeHandler} from './handler';

class ProjectsFilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: props.projects,
            formControls: {
                project_id: null,
                search: "",
            },
        };
        this.changeHandler  = changeHandler.bind(this);
    }
    
    render() {
        return(
            <div className = "d-inline-flex" >
                <Select value={this.state.formControls.project_id} label="Status" name="project_id" onInput={(event) => {this.changeHandler(event)}} options={this.state.projects} defaultValue="Todos"/>
                <SearchInput name="search" onChange={this.changeHandler}/>
            </div>
        );
    }
}

export default ProjectsFilterForm;