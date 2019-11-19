import React, { Component } from 'react'
import projectsAPI from '../../services/api/projects';
import PageTitle from '../../components/misc/PageTitle';
import Content from '../../components/misc/Content';
import SectionTitle from '../../components/misc/SectionTitle';
import UpdateProject from '../../components/projects/UpdateProject';
import Loader from '../../components/misc/Loader';

export default class Project extends Component {
    state = {
        project: { courses: [] },
        loaded: false,
    }

    componentDidMount() {
        this.updateProject();
    }

    componentWillUnmount() {
        this.setState({
            project: { courses: [] },
            loaded: false,
        })
    }

    updateProject() {
        let routeId = this.props.match.params.id;
        projectsAPI.getById(routeId).then(res => {
            this.setState({
                project: res.data,
                loaded: true
            });
        });
    }

    render() {
        let { project, loaded } = this.state;

        if (!loaded) {
            return <Loader />
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
