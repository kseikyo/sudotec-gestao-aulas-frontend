import React from 'react';
import {Button, Table} from 'react-bootstrap';
import Content from '../../components/misc/Content';
import UpdateGrade from '../../components/grades/UpdateGrade';
import LessonsContent from '../../components/lesson/LessonsContent';
import StudentsContent from '../../components/students/StudentsContent';
import RegisterLessonModal from '../../components/lesson/RegisterLessonModal';
import SectionTitle from '../../components/misc/SectionTitle';
import gradesAPI from '../../services/api/grades';
import lessonsAPI from '../../services/api/lessons';
import PageTitle from '../../components/misc/PageTitle';
import Loader from '../../components/misc/Loader';
import ReportModal from '../../components/misc/ReportModal';
import Ausent from '../../components/lesson/frequency/Ausent';
import Justified from '../../components/lesson/frequency/Justified';
import Present from '../../components/lesson/frequency/Present';

function frequencyColor(frequency) {
  if (parseInt(frequency) >= 90) {
    return 'text-success';
  } else if (frequency >= 75) {
    return 'text-primary';
  } else {   
    return 'text-danger';
  }
}

const Frequency = ({frequency}) => {
  if (frequency === 'P') {
    return <Present />
  }
  
  if (frequency === 'J') {
    return <Justified />
  }

  return <Ausent />
}

const formatDate = (date) => {
  date = new Date(date + ' 00:00');

return (
        <div className='text-center'>
          <div className='text-primary'>{date.getDate() + '/' + (date.getMonth()+1)}</div>
          <small className='d-block'>{date.getFullYear()}</small>
        </div>
      )
}

class Grade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {  
      grade: null,
      loaded: false,
      showReportModal: false,
      students: [],
      studentsLoaded: false,
      lessonsLoaded: false,
    }
  }

  componentDidMount() {
    this.updateGrade();
  }

  toggleReportModal() {
    this.setState({showReportModal: !this.state.showReportModal});
  }

  updateGrade() {
    let routeId = this.props.match.params.id;
    
    gradesAPI.getById(routeId).then(res => {

      this.setState({
        grade: Object.assign(res, {lessons: [], students: []}), 
        loaded: true
      });

      this.updateLessons();
    });
  }

  updateLessons() {
    let {grade} = this.state;

    const lessons = lessonsAPI.getAllByGrade(grade.id);
    const students = gradesAPI.studentsWithAttendances(grade.id);

    Promise.all([lessons, students]).then((values) => {
      grade.lessons = values[0].data;      
      grade.students = values[1].data;

      this.setState({
        grade,
        lessonsLoaded: true,
        studentsLoaded: true,
      });
    });
  }

  getStudentFrequency(id) {
    let student = this.state.grade.students.find(student => student.id === id);

    if (!student) return;
    
    return student.frequency;
  }

  render() {
    let {grade, loaded} = this.state;

    if (!loaded || !grade) {
      return <Loader />
    } 
    
    return(
      <>
        <div className='d-flex justify-content-between'>
          <PageTitle title={grade.name} subtitle={grade.course.name}/>
          <div>
            <Button variant='primary' onClick={this.toggleReportModal.bind(this)} className='ml-auto mr-2 text-shadow align-self-start'>Relatório</Button>
            <RegisterLessonModal key={`${grade.students.length}-${grade.lessons.length}`} onRegister={this.updateLessons.bind(this)} grade={grade} />
          </div>
        </div>
        <Content>
          <SectionTitle title='Dados' icon='info-circle' />
          <UpdateGrade update={this.updateGrade.bind(this)} className="pt-3" grade={grade} />
        </Content>
        <LessonsContent loaded={this.state.lessonsLoaded} updateLessons={this.updateLessons.bind(this)} grade={grade} lessons={grade.lessons} />
        <StudentsContent loaded={this.state.studentsLoaded} update={this.updateLessons.bind(this)} grade={grade} students={this.state.grade.students} />
        <ReportModal browserPrint={true} title='Relatório de frequências' subtitle={this.state.grade.name} show={this.state.showReportModal} close={this.toggleReportModal.bind(this)} size='lg' filename={`Frequencia-${this.state.grade.name}`}>
          Curso: <span className='font-weight-bold'>{grade.course.name}</span> <br />
          Turma: <span className='font-weight-bold'>{grade.name}</span>
          <div className='frequency-report mt-3 overflow-auto' style={{height: '500px'}}>
            <Table striped hover>
              <thead>
                <tr>
                  <th className='sticky-top bg-white' style={{minWidth: '200px'}}>Alunos</th>
                  {grade.lessons.map(lesson => 
                    (
                      <th className='sticky-top bg-white text-muted d-print-none' key={lesson.id}>{formatDate(lesson.grade_date)}</th>
                    ))}
                  <th className='sticky-top bg-white'>Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.grade.students.map(student => {
                  let stdFrequency = this.getStudentFrequency(student.id);

                  return (
                    <tr key={`report-student-${student.id}`} className={stdFrequency < 75 ? 'bg-danger-light' : ''}>
                      <td style={{position: 'sticky', left: '0'}} className={stdFrequency < 75 ? 'bg-danger-lighter' : 'bg-white'}><small>{student.name}</small></td>
                      {student.attendances.map(att => (
                        <td className='d-print-none' key={att.id}><Frequency frequency={att.presence} /></td>
                      ))}
                      <td className={frequencyColor(stdFrequency)}>{stdFrequency}%</td>
                    </tr> 
                  );
                })}
              </tbody>
            </Table>
          </div>
        </ReportModal>
      </>
    );
  }
}

export default Grade;