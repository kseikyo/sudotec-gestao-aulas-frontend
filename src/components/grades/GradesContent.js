import React from 'react';
import Content from '../misc/Content';
import SectionTitle from '../misc/SectionTitle';
import GlyphButton from '../misc/GlyphButton';
import GradeCard from './GradeCard';
import grades from '../../services/api/grades';
import RegisterGradeModal from '../grades/RegisterGradeModal';
import Loader from '../../components/misc/Loader';
import AdminBlock from './../users/AdminBlock';

class GradesContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grades: [],
      showRegisterModal: false,
      loaded: false,
    }
  }

  componentDidMount() {
    if (this.props.grades) {
      this.setState({ grades: this.props.grades, loaded: true });
    } else {
      grades.getAll().then(res => {
        this.setState({ grades: res.data, loaded: true });
      });
    }
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
    if (!this.state.loaded) {
      return <Loader />
    }
    console.log(this.state.grades);

    return (
      <Content>
        <div className="d-flex mb-5">
          <SectionTitle icon="grade" title='Turmas'></SectionTitle>
          <AdminBlock>
            <div className="ml-auto">
              <GlyphButton click={this.openRegister.bind(this)} className="ml-auto">Nova turma</GlyphButton>
            </div>
            <RegisterGradeModal onRegister={this.addGrade.bind(this)} show={this.state.showRegisterModal} close={this.closeRegister.bind(this)} />
          </AdminBlock>
        </div>
        <div className="grade-cards">
          {this.state.grades.map(this.renderGrade)}
        </div>
      </Content>
    );
  }
}

export default GradesContent;