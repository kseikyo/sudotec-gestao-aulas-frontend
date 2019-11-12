import React, { Component } from 'react'
import projectsAPI from '../../services/api/projects';

export default class Project extends Component {
    state = {
        project: { courses: [] },
        loaded: false,
    }

    componentDidMount() {
        this.updateCourse();
    }

    updateProject() {
        let routeId = this.props.match.params.id;

        projectsAPI.getById(routeId).then(res => {
            this.setState({
                project: res,
                loaded: true
            });
        });
    }

    render() {
        let { project, loaded } = this.state;

        if (!loaded) {
            return 'loading...'
        }
        return (
            <>
                <div className='d-flex'>
                    <PageTitle title={project.name} subtitle={project.name} />
                </div>
                <Content>
                    <SectionTitle title='Dados' icon='info-circle' />
                    <UpdateProject update={this.updateProject.bind(this)} className="pt-3" project={project} />
                </Content>
            </>
        )
    }
}
