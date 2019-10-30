import React from 'react';
import Content from '../../components/misc/Content';
import UpdateGrade from '../../components/grades/UpdateGrade';
import LessonsContent from '../../components/lesson/LessonsContent';
import RegisterLessonModal from '../../components/lesson/RegisterLessonModal';
import SectionTitle from '../../components/misc/SectionTitle';
// import GlyphButton from '../../components/misc/GlyphButton';
import PageTitle from '../../components/misc/PageTitle';
// import {Button} from 'react-bootstrap';
import gradesAPI from '../../services/api/grades';
import lessonsAPI from '../../services/api/lessons';

class Grade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grade: null,
      loaded: false,
    }
  }

  componentDidMount() {
    gradesAPI.getById(1).then(res => {
      this.setState({
        grade: res, 
        loaded: true
      });
    })
  }

  updateLessons() {
    let grade = this.state.grade;

    lessonsAPI.getAllByGrade(grade.id).then(res => {
      grade.lessons = res.data;

      this.setState({
        grade: grade,
      });
    })
  }

  render() {
    let {grade, loaded} = this.state;

    if (!loaded) {
      return 'loading...'
    }
    
    return(
      <>
      <div className='d-flex'>
        <PageTitle title={grade.name} subtitle={grade.course.name}/>
        <RegisterLessonModal onRegister={this.updateLessons.bind(this)} grade={grade} />
      </div>
      <Content>
        <SectionTitle title='Dados' icon='info-circle' />
        <UpdateGrade className="pt-3" grade={grade} />
      </Content>
      <LessonsContent updateLessons={this.updateLessons.bind(this)} grade={grade} lessons={grade.lessons} />
      <Content>
        <SectionTitle title='Frequência' icon='calendar' />
      </Content>
      </>
    );
  }
}

export default Grade;