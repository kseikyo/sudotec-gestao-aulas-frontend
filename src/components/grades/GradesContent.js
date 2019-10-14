import React from 'react';
import Content from '../misc/content';
import SectionTitle from '../misc/SectionTitle';
import GlyphButton from '../misc/GlyphButton';
import GradeCard from './GradeCard';
import grades from '../../services/api/grades';
import RegisterGradeModal from '../grades/RegisterGradeModal';

class GradesContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grades: [],
      showRegisterModal: false,
    }
  }

  componentDidMount() {
    grades.getAll().then(res => {
      this.setState({ grades: res.data });
    })
  }

  renderGrade(grade) {
    return (
      <GradeCard key={grade.id} grade={grade} />
    );
  }

  openRegister() {
    this.setState({ showRegisterModal: true });
  }
  closeRegister() {
    this.setState({ showRegisterModal: false });
  }

  addGrade(grade) {
    this.setState({
      grades: [...this.state.grades, grade]
    });
  }

  render() {
    return (
      <Content>
        <RegisterGradeModal onRegister={this.addGrade.bind(this)} show={this.state.showRegisterModal} close={this.closeRegister.bind(this)} />
        <div className="d-flex mb-5">
          <SectionTitle icon="grade" title='Turmas'></SectionTitle>
          <div className="ml-auto">
            <GlyphButton click={this.openRegister.bind(this)} className="ml-auto">Nova turma</GlyphButton>
          </div>
        </div>
        <div className="grade-cards">
          {this.state.grades.map(this.renderGrade)}
        </div>
      </Content>
    );
  }
}

export default GradesContent;