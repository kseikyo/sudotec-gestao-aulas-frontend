import React from 'react';
import UpdateLessonModal from './UpdateLessonModal';

function frequencyColor(frequency) {
  if (parseInt(frequency) >= 90) {
    return 'text-success';
  } else if (frequency >= 75) {
    return 'text-primary';
  } else {   
    return 'text-danger';
  }
}

const GradeDate = ({date}) => {
  const months = {
    0: () => "Jan",
    1: () => "Fev",
    2: () => "Mar",
    3: () => "Abr",
    4: () => "Mai",
    5: () => "Jun",
    6: () => "Jul",
    7: () => "Ago",
    8: () => "Set",
    9: () => "Out",
    10: () => "Nov",
    11: () => "Dez",
  }

  date = new Date(date + ' 00:00')

  return (<span>
            {date.getDate()} {months[date.getMonth()]()} <small className='font-weight-bold'>- {date.getFullYear()}</small>
          </span>)
}

class LessonCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      updateCount: 0,
    }
  }

  updateLesson() {
    this.props.updateLesson();
    this.closeModal();
    this.setState({updateCount: this.state.updateCount + 1});
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
            <div className='lesson-date'><GradeDate date={lesson.grade_date} /></div>
            <div className={`lesson-frequency ml-auto ${frequencyColor(lesson.frequency)}`}>{lesson.frequency}%</div>  
          </div>
          <span className='lesson-description'>
            {lesson.description}
          </span>
        </div>
        <UpdateLessonModal key={`${lesson.attendances.length}-${this.state.updateCount}`} onUpdate={this.updateLesson.bind(this)} showModal={this.state.showModal} closeModal={this.closeModal.bind(this)} grade={this.props.grade} lesson={lesson} />
      </>
    );
  }
}

export default LessonCard;
