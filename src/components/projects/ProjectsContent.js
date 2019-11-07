import React from 'react';
import Content from '../misc/Content';
import SectionTitle from '../misc/SectionTitle';
import GlyphButton from '../misc/GlyphButton';
import ProjectCard from './ProjectCard';
import projects from '../../services/api/projects';
import RegisterProjectModal from './RegisterProjectModal';
import SectionInfo from '../misc/SectionInfo';

class ProjectsContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            showRegisterModal: false,
        }
    }

    componentDidMount() {
        projects.getAll().then(res => {
            this.setState({ projects: res.data });
        });
    }

    renderProject(project) {
        return (
            <ProjectCard key={project.id} project={project} />
        );
    }

    openRegister() {
        this.setState({ showRegisterModal: true });
    }
    closeRegister() {
        this.setState({ showRegisterModal: false });
    }

    addProject(project) {
        this.setState({
            projects: [...this.state.projects, project]
        });
    }

    render() {
        return (
            <Content>
                <RegisterProjectModal onRegister={this.addProject.bind(this)} show={this.state.showRegisterModal} close={this.closeRegister.bind(this)}/>
                    <div className="d-flex mb-5">
                        <SectionTitle icon="project" title='Projetos'></SectionTitle>
                        <div className="ml-auto">
                            <GlyphButton className="ml-auto" click={this.openRegister.bind(this)}>Novo projeto</GlyphButton>
                        </div>
                        <div className="project-card">
                            {this.state.projects.map(this.renderProject)}
                        </div>
                    </div>
            </Content>
        );
    }
}

export default ProjectsContent;