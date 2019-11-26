import React from 'react';
import studentsAPI from '../../services/api/students';
import AddStudent from '../../components/students/AddStudent';
import Content from '../../components/misc/Content';
import SectionTitle from '../../components/misc/SectionTitle';
import {Link} from 'react-router-dom';
import Loader from '../../components/misc/Loader';

function StudentListCard({student}) {
  return (
    <Link to={`/alunos/${student.id}`}>
    <div className='user-card'>
      <div className='user-name'>
        {student.name}
      </div>
      <span></span>
    </div>
    </Link>
  );
}

class Students extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      loaded: false,
    }
  }

  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents() {
    studentsAPI.getAll().then(res => {
      this.setState({students: res.data, loaded: true});
    })
  }

  render() {
    if (!this.state.loaded) {
      return <Loader />
    }

    return(
      <Content> 
        <div className="d-flex mb-3">
          <SectionTitle icon="students" title='Alunos' />
          <div className="ml-auto">
            <AddStudent onRegister={this.getAllStudents.bind(this)} />
          </div>
        </div>
        <div className='row'>
          {this.state.students.map(student => 
                (<div key={student.id} className='col-md-4 mt-2'><StudentListCard key={student.id} student={student} /></div>)
              )}
        </div>
      </Content>
    );
  }
}

export default Students;