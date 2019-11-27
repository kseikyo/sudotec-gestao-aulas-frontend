import React, { Component } from 'react'
import courseAPI from '../../services/api/courses';
import PageTitle from '../../components/misc/PageTitle';
import Content from '../../components/misc/Content';
import SectionTitle from '../../components/misc/SectionTitle';
import UpdateCourse from '../../components/courses/UpdateCourse';
import Loader from '../../components/misc/Loader';
import GradesContent from '../../components/grades/GradesContent';
import gradesAPI from '../../services/api/grades';

export default class Project extends Component {
    state = {
        course: { projects: [] },
        grades: [],
        loaded: false,
    }

    componentDidMount() {
        this.updateCourse(() => {
            if (this.state.course.grades[0]) {
                gradesAPI.getById(this.state.course.grades[0].course_id).then(res => {
                    this.setState({
                        grades: [res],
                        loaded: true
                    });
                }
                )
            }else {
                this.setState({
                    loaded: true
                })
            }
        });

    }

    componentWillUnmount() {
        this.setState({
            course: { projects: [] },
            grades: [],
            loaded: false,
        })
    }

    updateCourse(callback) {
        let routeId = this.props.match.params.id;
        courseAPI.getById(routeId).then(res => {
            this.setState({
                course: res.data,
            }, () => {
                if (callback) callback();
            });
        });
    }

    render() {
        let { course, loaded, grades } = this.state;
        if (!loaded) {
            return <Loader />
        }
        return (
            <>
                <div className='d-flex'>
                    <PageTitle title={course.name} subtitle={course.name} />
                </div>
                <Content>
                    <SectionTitle title='Dados' icon='info-circle' />
                    <UpdateCourse update={this.updateCourse.bind(this)} className="pt-3" course={course} />
                </Content>
                <GradesContent grades={grades}/>
            </>
        )
    }
}
