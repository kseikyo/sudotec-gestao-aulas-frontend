import React from 'react';
import Content from '../../components/misc/Content';
import UpdateGrade from '../../components/grades/UpdateGrade';
import LessonsContent from '../../components/lesson/LessonsContent';
import StudentsContent from '../../components/students/StudentsContent';
import RegisterLessonModal from '../../components/lesson/RegisterLessonModal';
import SectionTitle from '../../components/misc/SectionTitle';
// import GlyphButton from '../../components/misc/GlyphButton';
import gradesAPI from '../../services/api/grades';
import lessonsAPI from '../../services/api/lessons';
import PageTitle from '../../components/misc/PageTitle';
import {Button} from 'react-bootstrap';
import grades from '../../services/api/grades';
import Input from '../../components/forms/Input';
import Loading from '../../components/misc/Loading';

class Grade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  
      grade: {students: []},
      loaded: false,
    }
  }

  componentDidMount() {
    this.updateGrade();
  }

  updateGrade() {
    let routeId = this.props.match.params.id;
    
    gradesAPI.getById(routeId).then(res => {
      this.setState({
        grade: res, 
        loaded: true
      });
    });
  }

  updateLessons() {
    let {grade} = this.state;

    const lessons = lessonsAPI.getAllByGrade(grade.id);
    const students = gradesAPI.students(grade.id);

    Promise.all([lessons, students]).then((values) => {
      grade.lessons = values[0].data;      
      grade.students = values[1].data;

      this.setState({
        grade
      });
    });
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
        <RegisterLessonModal key={grade.students.length} onRegister={this.updateLessons.bind(this)} grade={grade} />
      </div>
      <Content>
        <SectionTitle title='Dados' icon='info-circle' />
        <UpdateGrade update={this.updateGrade.bind(this)} className="pt-3" grade={grade} />
      </Content>
      <LessonsContent updateLessons={this.updateLessons.bind(this)} grade={grade} lessons={grade.lessons} />
      <StudentsContent update={this.updateLessons.bind(this)} grade={grade} students={this.state.grade.students} />
      </>
    );
  }
}

export default Grade;