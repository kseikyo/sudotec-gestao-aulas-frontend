import React from 'react';
import DeleteModal from './../misc/DeleteModal';
import gradesApi from './../../services/api/grades';

function frequencyColor(frequency) {
  if (parseInt(frequency) >= 90) {
    return 'success';
  } else if (frequency >= 75) {
    return 'primary';
  } else {   
    return 'danger';
  }
}

class StudentCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showDeleteModal: false,
    }
  }

  updateLesson() {
    this.props.updateLesson();
    this.closeModal();
  }

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal});
  }

  removeStudentFromGrade() {
    gradesApi.removeStudent(this.props.grade.id, this.props.student.id).then(() => {
      this.props.onDelete();
    })
  }
  
  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    let {student, className} = this.props;

    return (
      <>
        <div className={`student-card border ${frequencyColor(student.frequency)} ${className}`} onClick={this.openModal.bind(this)}>
          <div className='student-name'>{student.name}</div>
          <div className='d-flex'>
            <div className={`student-frequency mr-3 text-${frequencyColor(student.frequency)}`}>{student.frequency}%</div>  
          <span className='student-age'>
            {student.age} anos
          </span>
          </div>
          <div onClick={this.toggleDeleteModal.bind(this)} className='icon icon-delete hover-pointer text-danger'></div>
          <DeleteModal show={this.state.showDeleteModal} onDelete={this.removeStudentFromGrade.bind(this)} onHide={this.toggleDeleteModal.bind(this)}>
            Tem certeza que deseja remover {(student.gender === 'F' ? 'a aluna' : 'o aluno')} <b>{student.name}</b> da turma {this.props.grade.name}?
          </DeleteModal>
        </div>
      </>
    );
  }
}

export default StudentCard;
