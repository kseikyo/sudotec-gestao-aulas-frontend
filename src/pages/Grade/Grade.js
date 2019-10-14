import React from 'react';
import Content from '../../components/misc/Content';
import Checkbox from '../../components/forms/Checkbox';
<<<<<<< HEAD
import SectionTitle from '../../components/misc/SectionTitle';
import PageTitle from '../../components/misc/PageTitle';
=======
import SectionTitle from '../../components/misc/sectionTitle';
import PageTitle from '../../components/misc/pageTitle';
>>>>>>> ff8efe3159ff7df36987ccdfc23eafd0a116a0f6
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