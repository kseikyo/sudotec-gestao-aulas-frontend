import React from 'react';
import Content from '../../components/misc/content';
import SectionTitle from '../../components/misc/SectionTitle';
import GlyphButton from '../../components/misc/GlyphButton';
import GradeCard from '../../components/grades/GradeCard';
import grades from '../../services/api/grades';

class Grades extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grades: [],
    }
  }

  componentDidMount() {
    grades.getAll().then(res => {
      this.setState({grades: res.data});
      console.log(this.state.grades);
    })
  }

  renderGrade(grade) {
    return (
      <GradeCard key={grade.id} grade={grade}/>
    );
  }

  render() {
      return(
        <div> 
          <Content>
            <div className="d-flex mb-5">
              <SectionTitle icon="grade" title='Turmas'></SectionTitle>
              <div className="ml-auto">
                <GlyphButton className="ml-auto">Nova turma</GlyphButton>
              </div>
            </div>

            <div className="grade-cards">
              {this.state.grades.map(this.renderGrade)}
            </div>

          </Content>
        </div>
      );
  }
}

export default Grades;