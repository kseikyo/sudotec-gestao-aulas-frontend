import React from 'react';
import Content from '../../components/misc/Content';
import UpdateGrade from '../../components/grades/UpdateGrade';
import SectionTitle from '../../components/misc/SectionTitle';
import PageTitle from '../../components/misc/PageTitle';
import grades from '../../services/api/grades';

class Grade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grade: null,
      loaded: false,
    }
  }

  componentDidMount() {
    grades.getById(1).then(res => {
      this.setState({
        grade: res
        , 
        loaded: true
      });
    })
  }

  render() {
    let {grade, loaded} = this.state;

    if (!loaded) {
      return 'loading...'
    }

    return(
      <>
      <PageTitle title={grade.name} subtitle={grade.course.name}/>
      <Content>
        <SectionTitle title='Dados' icon='info-circle' />
        <UpdateGrade grade={grade} />
      </Content>
      <Content>
        <SectionTitle title='Aulas' icon='lesson' />
      </Content>
      <Content>
        <SectionTitle title='Frequência' icon='calendar' />
      </Content>
      </>
    );
  }
}

export default Grade;