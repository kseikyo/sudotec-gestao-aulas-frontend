import React from 'react';
import UpdateLessonModal from './UpdateLessonModal';

function frequencyColor(frequency) {
  if (parseInt(frequency) === 100) {
    return 'text-success';
  } else if (frequency >= 75) {
    return 'text-primary';
  } else {   
    return 'text-danger';
  }
}

class LessonCard extends React.Component {
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
    let {lesson, className} = this.props;
    return (
      <>
        <div className={`lesson-card border ${className}`} onClick={this.openModal.bind(this)}>
          <div className='d-flex'>
            <div className='lesson-date'>{lesson.grade_date}</div>
            <div className={`lesson-frequency ml-auto ${frequencyColor(lesson.frequency)}`}>{lesson.frequency}%</div>  
          </div>
          <span className='lesson-description'>
            {lesson.description}
          </span>
        </div>
        <UpdateLessonModal onUpdate={this.updateLesson.bind(this)} showModal={this.state.showModal} closeModal={this.closeModal.bind(this)} grade={this.props.grade} lesson={lesson} />
      </>
    );
  }
}

export default LessonCard;
