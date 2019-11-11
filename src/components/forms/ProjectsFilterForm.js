import React, { Component } from 'react';
import SearchInput from './SearchInput';
import Select from './Select';
import { changeHandler } from './handler';
import projects from '../../services/api/projects';

class ProjectsFilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            formControls: {
                status: '',
                search: "",
            },
        };
        this.changeHandler = changeHandler.bind(this);
    }

    componentDidMount() {
        projects.getAll().then(res => {
            this.setState({ projects: res.data });
        });
    }

    render() {
        
        return (
            <div className="d-inline-flex">
                <Select
                    value={this.state.formControls.status}
                    label="Status"
                    name="status"
                    descriptionAttr='status'
                    valueAttr='status'
                    onChange={(event) => { this.changeHandler(event) }}
                    options={[{'status': 'Ativo'}, {'status': 'Inativo'}]}
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