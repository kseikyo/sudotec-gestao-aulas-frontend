import React, { Component } from 'react'
import courseAPI from '../../services/api/courses';
import PageTitle from '../../components/misc/PageTitle';
import Content from '../../components/misc/Content';
import SectionTitle from '../../components/misc/SectionTitle';
import UpdateCourse from '../../components/courses/UpdateCourse';
import Loader from '../../components/misc/Loader';

export default class Project extends Component {
    state = {
        course: { projects: [] },
        loaded: false,
    }

    componentDidMount() {
        this.updateCourse();
    }

    componentWillUnmount() {
        this.setState({
            course: { projects: [] },
            loaded: false,
        })
    }

    updateCourse() {
        let routeId = this.props.match.params.id;
        courseAPI.getById(routeId).then(res => {
            this.setState({
                course: res.data,
                loaded: true
            });
        });
    }

    render() {
        let { course, loaded } = this.state;

        if (!loaded) {
            return <Loader/>
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
            </>
        )
    }
}
