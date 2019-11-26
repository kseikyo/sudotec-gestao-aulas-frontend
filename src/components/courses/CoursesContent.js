import React from 'react';
import Content from '../misc/Content';
import SectionTitle from '../misc/SectionTitle';
import GlyphButton from '../misc/GlyphButton';
import projects from '../../services/api/projects';
import courses from '../../services/api/courses';
import students from '../../services/api/students';
import RegisterCourseModal from './RegisterCourseModal';
import SectionInfo from '../misc/SectionInfo';
import CoursesFilterForm from '../forms/CoursesFilterForm';
import Loader from '../misc/Loader';
import CourseCard from './CourseCard';
import { searchFilter } from '../misc/searchFilter';
import { statusFilter } from '../misc/statusFilter';
import { projectsFilter } from '../misc/projectsFilter';
import AdminBlock from './../users/AdminBlock';

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
            status: '',
            searchValue: '',
            project_id: '',
            rendered: [],
            courses: [],
            projects: [],
            students: [],
            showRegisterModal: false,
        }

        this.updateStatusValue = this.updateStatusValue.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.updateProjectId   = this.updateProjectId.bind(this);

        this.projectsFilter = projectsFilter.bind(this); 
        this.searchFilter   = searchFilter.bind(this);
        this.statusFilter   = statusFilter.bind(this);
    }

    componentDidMount() {
        projects.getAll().then(res => {
            this.setState({ projects: res.data });
        });

        students.getAll().then(res => {
            this.setState({ students: res.data });
        });

        courses.getAll().then(res => {
            this.setState({ courses: res.data, rendered: res.data, loaded: true })
        })
    }

    updateProjectId(event) {
        const id = event.target.value;
        this.setState({
            project_id: id,
        },
            () => {
                this.projectsFilter(this.state.projects, id);
        });
    }

    updateSearchValue(event) {
        const value = event.target.value;
        this.setState({
            searchValue: value
        },
            () => {
                this.searchFilter(this.state.courses, value);
            });
    }

    updateStatusValue(event) {
        const value = event.target.value === 'Ativo' ? 'active' : 'inactive';
        this.setState({
            status: value
        },
            () => {
                this.statusFilter(this.state.courses, value);
            });
    }

    renderCourse(course) {
        return (
            <CourseCard key={course.id} course={course} />
        );
    }

    openRegister() {
        this.setState({ showRegisterModal: true });
    }
    closeRegister() {
        this.setState({ showRegisterModal: false });
    }

    addCourse(course) {
        this.setState({
            courses: [...this.state.courses, course],
            rendered: [...this.state.rendered, course]
        });
    }

    render() {
        if (!this.state.loaded) {
            return <Loader />
        }

        const active = this.state.courses.reduce((total, course) => {
            total += course.status === 'active' ? 1 : 0;
            return total;
        }, 0);

        const courses_len = this.state.courses.length;
        const students_len = this.state.students.length;
        return (
            <Content>
                <div className="d-flex mb-5" style={styles}>
                    <SectionTitle icon="course" title='Cursos'></SectionTitle>
                    <AdminBlock>
                        <div className="ml-auto">
                            <GlyphButton className="ml-auto" click={this.openRegister.bind(this)}>Novo Curso</GlyphButton>
                        </div>
                        <RegisterCourseModal onRegister={this.addCourse.bind(this)} show={this.state.showRegisterModal} close={this.closeRegister.bind(this)} />
                    </AdminBlock>
                    <div className="d-flex" style={{ ...styles, justifyContent: '', ...SectionInfoStyles }}>
                        <SectionInfo hasBorder={true} title="Cursos cadastrados" subtitle={courses_len} />
                        <SectionInfo hasBorder={true} title="Cursos ativos" subtitle={active} />
                        <SectionInfo title="Alunos atuais" subtitle={students_len} />
                    </div>
                    <div style={{ width: '100vw' }}>
                        <CoursesFilterForm
                            onProjectChange={ this.updateProjectId }
                            onStatusChange={ this.updateStatusValue }
                            onChange={ this.updateSearchValue }
                        />
                    </div>
                    <div className="project-cards d-flex" style={styles}>
                        {this.state.rendered.map(this.renderCourse)}
                    </div>
                </div>
            </Content>
        );
    }
}

export default ProjectsContent;