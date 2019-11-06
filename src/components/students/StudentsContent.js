import React from 'react';
import SectionTitle from '../misc/SectionTitle';
import Content from '../misc/Content';
import StudentCard from './StudentCard';
import gradesAPI from './../../services/api/grades';
import {Button} from 'react-bootstrap';

class StudentsContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentsOptions: [],
    }

    this.addStudentInput = React.createRef();
  }

  handleSearchInput(e) {
    this.searchStudents(e.target.value);
  }

  addStudent() {
    let studentName = this.addStudentInput.current.value;
    let student = this.state.studentsOptions.find(el => el.name === studentName);

    gradesAPI.addStudent(this.props.grade.id, student.id).then(() => {
      this.props.update();
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

  render() {
    let {students} = this.props;

    return (
      <Content className='students-content'>
        <SectionTitle title='Alunos' icon='students' />

        <div className="row mt-3">
          <div className="col-md-8">
            <div className='students-content-list row pr-3'>
              {students.map(student => 
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
          </div>
        </div>
        
      </Content>
    );
  }
}

export default StudentsContent;
