import React from 'react';
import Content from '../misc/Content';
import SectionTitle from '../misc/SectionTitle';
import GlyphButton from '../misc/GlyphButton';
import GradeCard from './GradeCard';
import grades from '../../services/api/grades';
import coursesAPI from '../../services/api/courses';
import RegisterGradeModal from '../grades/RegisterGradeModal';
import Loader from '../../components/misc/Loader';
import AdminBlock from './../users/AdminBlock';
import SearchInput from '../forms/SearchInput';
import {changeHandler} from '../forms/handler';
import Select from '../forms/Select';

class GradesContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grades: [],
      showRegisterModal: false,
      loaded: false,
      formControls: {
        search: '',
        course_id: 0,
      },
      courses: [{id: 0, name: 'Todos'}],
    }

    this.changeHandler = changeHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.grades) {
      this.setState({loaded: true});
    } else {
      grades.getAll().then(res => {
        this.setState({ grades: res.data, loaded: true });
      });
    }
    coursesAPI.getAll().then(({data}) => {
      let courses = this.state.courses;
      courses.push(...data);

      this.setState({courses})
    })
  }

  renderGrade(grade) {
    return (
      <GradeCard key={grade.id} grade={grade} />
    );
  }

  openRegister() {
    this.setState({ showRegisterModal: true });
  }
  closeRegister() {
    this.setState({ showRegisterModal: false });
  }

  addGrade(grade) {
    this.setState({
      grades: [...this.state.grades, grade]
    });
  }

  filteredGrades() {
    let grades = this.state.grades;
    let {search, course_id} = this.state.formControls;
    
    course_id = parseInt(course_id);
    
    if (course_id !== 0) {
      grades = grades.filter((el) => el.course_id === course_id);
    }
    
    return grades.filter(({name}) => name.toLowerCase().includes(search.toLowerCase()));
  }

  render() {
    let {formControls} = this.state;
    if (!this.state.loaded) {
      return <Loader />
    }

    return (
      <Content>
        <div className="d-flex mb-3">
          <SectionTitle icon="grade" title='Turmas'></SectionTitle>
          <AdminBlock>
            <div className="ml-auto">
              <GlyphButton click={this.openRegister.bind(this)} className="ml-auto">Nova turma</GlyphButton>
            </div>
            <RegisterGradeModal onRegister={this.addGrade.bind(this)} show={this.state.showRegisterModal} close={this.closeRegister.bind(this)} />
          </AdminBlock>
        </div>
        <div className='d-flex'>
            <SearchInput name='search' value={formControls.search} onChange={this.changeHandler.bind(this)} />
            <Select showDefault={false} label='Cursos' name='course_id' value={formControls.course_id} onChange={this.changeHandler.bind(this)} options={this.state.courses} />
        </div>
        <div className="grade-cards">
          {this.filteredGrades().map(this.renderGrade)}
        </div>
      </Content>
    );
  }
}

export default GradesContent;