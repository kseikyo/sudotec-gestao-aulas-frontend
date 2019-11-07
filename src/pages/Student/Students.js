import React from 'react';
import studentsAPI from '../../services/api/students';
import AddStudent from '../../components/students/AddStudent';
import Content from '../../components/misc/Content';
import SectionTitle from '../../components/misc/SectionTitle';
import {Link} from 'react-router-dom';

function StudentListCard({student}) {
  return (
    <Link to={`/alunos/${student.id}`}>
      <div>

      {student.name}
      </div>
    </Link>
  );
}

class Students extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
    }
  }

  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents() {
    studentsAPI.getAll().then(res => {
      this.setState({students: res.data});
    })
  }

  render() {
      return(
        <Content> 
          <div className="d-flex mb-3">
            <SectionTitle icon="students" title='Alunos' />
            <div className="ml-auto">
              <AddStudent onRegister={this.getAllStudents.bind(this)} />
            </div>
          </div>
          {this.state.students.map(student => 
                (<StudentListCard key={student.id} student={student} />)
              )}
        </Content>
      );
  }
}

export default Students;