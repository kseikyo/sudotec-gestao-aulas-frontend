import React from 'react';
import Content from '../../components/misc/content';
import Checkbox from '../../components/forms/Checkbox';
import SectionTitle from '../../components/misc/SectionTitle';
import PageTitle from '../../components/misc/pageTitle';
import GlyphButton from '../../components/misc/GlyphButton';
import grades from '../../services/api/grades';
import Input from '../../components/forms/Input';

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
      console.log(res)
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