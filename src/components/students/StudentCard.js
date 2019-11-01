import React from 'react';
// import UpdateLessonModal from './UpdateLessonModal';
// import StudentFrequency from '../lesson/frequency/StudentFrequency';

function frequencyColor(frequency) {
  if (parseInt(frequency) === 100) {
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
    }
  }

  updateLesson() {
    this.props.updateLesson();
    this.closeModal();
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
        </div>
        {/* <UpdateLessonModal onUpdate={this.updateLesson.bind(this)} showModal={this.state.showModal} closeModal={this.closeModal.bind(this)} grade={this.props.grade} lesson={lesson} /> */}
      </>
    );
  }
}

export default StudentCard;
