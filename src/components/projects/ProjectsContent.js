import React from 'react';
import Content from '../misc/Content';
import SectionTitle from '../misc/SectionTitle';
import GlyphButton from '../misc/GlyphButton';
import ProjectCard from './ProjectCard';
import projects from '../../services/api/projects';
import RegisterProjectModal from './RegisterProjectModal';
import SectionInfo from '../misc/SectionInfo';
import ProjectsFilterForm from '../forms/ProjectsFilterForm';

const styles = {
    flexFlow: 'row wrap',
    justifyContent: 'space-between'
}

const SectionInfoStyles = {
    width: '100%',
    marginTop: '2em',
    marginBottom: '2em',
    marginLeft: '1em'
}


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
        const len = this.state.projects.length.toString();
        return (
            <Content>
                <RegisterProjectModal onRegister={this.addProject.bind(this)} show={this.state.showRegisterModal} close={this.closeRegister.bind(this)} />
                <div className="d-flex mb-5" style={styles}>
                    <SectionTitle icon="project" title='Projetos'></SectionTitle>
                    <div className="ml-auto">
                        <GlyphButton className="ml-auto" click={this.openRegister.bind(this)}>Novo projeto</GlyphButton>
                    </div>
                    <div className="d-flex" style={{ ...styles, justifyContent: '', ...SectionInfoStyles }}>
                        <SectionInfo hasBorder={true} title="Projetos cadastrados" subtitle={len} />
                        <SectionInfo hasBorder={true} title="Projetos ativos" subtitle={len} />
                        <SectionInfo title="Alunos atuais" subtitle="130" />
                    </div>
                    <div style={{ width: '100%' }}>
                        <ProjectsFilterForm />
                    </div>
                    <div className="project-cards d-flex" style={styles}>
                        {this.state.projects.map(this.renderProject)}
                    </div>
                </div>
            </Content>
        );
    }
}

export default ProjectsContent;