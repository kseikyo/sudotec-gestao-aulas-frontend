import React from 'react';
import Content from '../../components/misc/Content';
import UpdateGrade from '../../components/grades/UpdateGrade';
import SectionTitle from '../../components/misc/SectionTitle';
import GlyphButton from '../../components/misc/GlyphButton';
import PageTitle from '../../components/misc/PageTitle';
import {Button} from 'react-bootstrap';
import grades from '../../services/api/grades';
import Input from '../../components/forms/Input';
import Loading from '../../components/misc/Loading';

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
      <div className='d-flex'>
        <PageTitle title={grade.name} subtitle={grade.course.name}/>
        <GlyphButton variant='main' className='ml-auto align-self-start'>Chamada</GlyphButton>
      </div>
      <Content>
        <SectionTitle title='Dados' icon='info-circle' />
        <UpdateGrade className="pt-3" grade={grade} />
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