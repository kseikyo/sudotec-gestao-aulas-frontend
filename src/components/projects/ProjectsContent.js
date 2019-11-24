import React from 'react';
import Content from '../misc/Content';
import SectionTitle from '../misc/SectionTitle';
import GlyphButton from '../misc/GlyphButton';
import ProjectCard from './ProjectCard';
import projects from '../../services/api/projects';
import students from '../../services/api/students';
import RegisterProjectModal from './RegisterProjectModal';
import SectionInfo from '../misc/SectionInfo';
import ProjectsFilterForm from '../forms/ProjectsFilterForm';
import Loader from '../misc/Loader';
import { searchFilter } from '../misc/searchFilter';
import { statusFilter } from '../misc/statusFilter';

const styles = {
    flexFlow: 'row wrap',
    justifyContent: 'space-between'
}

const SectionInfoStyles = {
    width: '100%',
    marginTop: '2em',
    marginBottom: '2em',
    marginLeft: '1rem'
}


class ProjectsContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            searchValue: '',
            status: '',
            projects: [],
            rendered: [],
            students: [],
            showRegisterModal: false,
        }
        this.updateStatusValue = this.updateStatusValue.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.searchFilter = searchFilter.bind(this);
        this.statusFilter = statusFilter.bind(this);
    }

    componentDidMount() {
        projects.getAll().then(res => {
            this.setState({ projects: res.data, rendered: res.data, loaded: true });
        });

        students.getAll().then(res => {
            this.setState({ students: res.data });
        });
    }

    updateSearchValue(event) {
        const value = event.target.value;
        this.setState({
            searchValue: value
        },
            () => {
                this.searchFilter(this.state.projects, value);
            });
    }

    updateStatusValue(event) {
        const value = event.target.value === 'Ativo' ? 'active' : 'inactive';
        this.setState({
            status: value
        },
            () => {
                this.statusFilter(this.state.projects, value);
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
            rendered: [...this.state.projects, project],
            projects: [...this.state.projects, project]
        });
    }

    render() {
        if (!this.state.loaded) {
            return <Loader />
        }

        const active = this.state.projects.reduce((total, project) => {
            total += project.status === 'active' ? 1 : 0;
            return total;
        }, 1);

        const project_len = this.state.projects.length;
        const student_len = this.state.students.length;

        return (
            <Content>
                <RegisterProjectModal onRegister={this.addProject.bind(this)} show={this.state.showRegisterModal} close={this.closeRegister.bind(this)} />
                <div className="d-flex mb-5" style={styles}>
                    <SectionTitle icon="project" title='Projetos'></SectionTitle>
                    <div className="ml-auto">
                        <GlyphButton className="ml-auto" click={this.openRegister.bind(this)}>Novo projeto</GlyphButton>
                    </div>
                    <div className="d-flex" style={{ ...styles, justifyContent: '', ...SectionInfoStyles }}>
                        <SectionInfo hasBorder={true} title="Projetos cadastrados" subtitle={project_len} />
                        <SectionInfo hasBorder={true} title="Projetos ativos" subtitle={active} />
                        <SectionInfo title="Alunos atuais" subtitle={student_len} />
                    </div>
                    <div style={{ width: '100%' }}>
                        <ProjectsFilterForm 
                            onStatusChange={this.updateStatusValue} 
                            onChange={this.updateSearchValue} 
                        />
                    </div>
                    <div className="project-cards d-flex" style={styles}>
                        {this.state.rendered.map(this.renderProject)}
                    </div>
                </div>
            </Content>
        );
    }
}

export default ProjectsContent;