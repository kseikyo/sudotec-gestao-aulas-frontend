import React from 'react';
import SectionTitle from '../../components/misc/SectionTitle';
import Content from './../misc/Content';
import LessonCard from './LessonCard';
import Loader from '../misc/Loader';

class LessonsContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchDate: null,
    }
  }

  render() {
    let {lessons} = this.props;

    if (!this.props.loaded) {
      return (
        <Content className='lessons-content'>
          <SectionTitle title='Aulas' icon='lesson' subtitle='Clique em uma aula para ver detalhes' />
          <Loader />
        </Content>  
      );
    }

    return (
      <Content className='lessons-content'>
        <SectionTitle title='Aulas' icon='lesson' subtitle='Clique em uma aula para ver detalhes' />

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
