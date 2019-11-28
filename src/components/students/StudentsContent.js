import React from 'react';
import SectionTitle from '../misc/SectionTitle';
import Content from '../misc/Content';
import StudentCard from './StudentCard';
import gradesAPI from './../../services/api/grades';
import {Button} from 'react-bootstrap';
import Loader from '../misc/Loader';
import SearchInput from '../forms/SearchInput';
import {changeHandler} from '../forms/handler';
import SectionInfo from '../misc/SectionInfo';


class StudentsContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentsOptions: [],
      loading: false,
      formControls: {
        search: '',
      },
    }

    this.addStudentInput = React.createRef();
    this.changeHandler = changeHandler.bind(this);
  }

  handleSearchInput(e) {
    this.searchStudents(e.target.value);
  }

  load(status) {
    this.setState({loading: status});
  }

  addStudent() {
    this.load(true);
    let studentName = this.addStudentInput.current.value;
    let student = this.state.studentsOptions.find(el => el.name === studentName);

    gradesAPI.addStudent(this.props.grade.id, student.id).then(() => {
      this.props.update();
      this.load(false);
      this.addStudentInput.current.value = '';
    });
  }

  searchStudents(search) {
    gradesAPI.searchStudents(this.props.grade.id, search)
      .then(res => {
        this.setState({
          studentsOptions: res.data
        });
      });
  };

  filteredStudents() {
    return this.props.students.filter(({name}) => name.toLowerCase().includes(this.state.formControls.search.toLowerCase()));
  }

  render() {
    return (
      <Content className='students-content'>
        <SectionTitle title='Alunos' icon='students' />

        <div className='row mt-2'>
          <div className='col-12'>
            <SectionInfo title="Alunos atuais" subtitle={`${this.props.students.length}`} />
          </div>
          <div className='col-md-4'>
            <SearchInput autoComplete="off" name='search' onChange={this.changeHandler.bind(this)} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-8">
            <div className='students-content-list row pr-3'>
              {this.filteredStudents().map(student => 
                  <StudentCard student={student} key={student.id} grade={this.props.grade} onDelete={this.props.update} />
                )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input list="browsers" className='form-control' ref={this.addStudentInput} onInput={this.handleSearchInput.bind(this)} />
              <label>Adicionar aluno</label>
              <datalist id="browsers">
                {this.state.studentsOptions.map(student =>
                  (<option value={student.name} key={student.id}></option>)
                )}
              </datalist>
            </div>
            <Button size='sm' onClick={this.addStudent.bind(this)} variant='outline-dark'>Adicionar</Button>
            {this.state.loading ? 
              <Loader message='Salvando' size='50px' /> :
              <></>
            }
          </div>
        </div>
        
      </Content>
    );
  }
}

export default StudentsContent;
