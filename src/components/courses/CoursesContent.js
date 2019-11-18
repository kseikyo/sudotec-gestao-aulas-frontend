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
            courses: [],
            projects: [],
            students: [],
            showRegisterModal: false,
        }
    }

    componentDidMount() {
        projects.getAll().then(res => {
            this.setState({ projects: res.data });
        });

        students.getAll().then(res => {
            this.setState({ students: res.data });
        });

        courses.getAll().then(res => {
            this.setState({ courses: res.data, loaded: true})
        })
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
            courses: [...this.state.courses, course]
        });
    }

    render() {
        if (!this.state.loaded) {
            return <Loader />
        }
        const courses_len = this.state.courses.length;
        const students_len = this.state.students.length;
        return (
            <Content>
                <RegisterCourseModal onRegister={this.addCourse.bind(this)} show={this.state.showRegisterModal} close={this.closeRegister.bind(this)} />
                <div className="d-flex mb-5" style={styles}>
                    <SectionTitle icon="course" title='Cursos'></SectionTitle>
                    <div className="ml-auto">
                        <GlyphButton className="ml-auto" click={this.openRegister.bind(this)}>Novo Curso</GlyphButton>
                    </div>
                    <div className="d-flex" style={{ ...styles, justifyContent: '', ...SectionInfoStyles }}>
                        <SectionInfo hasBorder={true} title="Cursos cadastrados" subtitle={courses_len} />
                        <SectionInfo hasBorder={true} title="Cursos ativos" subtitle={courses_len} />
                        <SectionInfo title="Alunos atuais" subtitle={students_len} />
                    </div>
                    <div style={{ width: '100vw' }}>
                        <CoursesFilterForm />
                    </div>
                    <div className="project-cards d-flex" style={styles}>
                        {this.state.courses.map(this.renderCourse)}
                    </div>
                </div>
            </Content>
        );
    }
}

export default ProjectsContent;