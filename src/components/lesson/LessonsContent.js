import React from 'react';
import SectionTitle from '../../components/misc/SectionTitle';
import Content from './../misc/Content';
import LessonCard from './LessonCard';

class LessonsContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchDate: null,
    }
  }

  render() {
    let {lessons} = this.props;

    return (
      <Content className='lessons-content'>
        <SectionTitle title='Aulas' icon='lesson' />

        <div className='lessons-content-list row pr-3'>
          {lessons.map(lesson => 
            <div className='col-md-6 col-lg-4 mt-4' key={lesson.id} >
              <LessonCard updateLesson={this.props.updateLessons} grade={this.props.grade} lesson={lesson} />  
            </div>
            )}
        </div>
      </Content>
    );
  }
}

export default LessonsContent;
