import React, { Component } from 'react';
import SearchInput from './SearchInput';
import Select from './Select';
import {changeHandler} from './handler';

class ProjectsFilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            formControls: {
                project_status: null,
                search: "",
            },
        };
        this.changeHandler  = changeHandler.bind(this);
    }

    componentDidMount() {
        this.setState({
            projects: this.props.projects
        })
    }
    
    render() {
        console.log(this.state.projects);
        return(
            <div className="d-inline-flex">
                <Select
                    value={this.state.formControls.project_status}
                    label="Status"
                    name="project_status"
                    onChange={(event) => {this.changeHandler(event)}}
                    options={this.state.projects}
                />
                <SearchInput 
                    name="search"
                    onChange={this.changeHandler}
                />
            </div>
        );
    }
}

export default ProjectsFilterForm;