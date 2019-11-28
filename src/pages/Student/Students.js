import React from 'react';
import studentsAPI from '../../services/api/students';
import AddStudent from '../../components/students/AddStudent';
import Content from '../../components/misc/Content';
import SectionTitle from '../../components/misc/SectionTitle';
import {Link} from 'react-router-dom';
import Loader from '../../components/misc/Loader';
import AdminBlock from './../../components/users/AdminBlock';
import SearchInput from '../../components/forms/SearchInput';
import {changeHandler} from '../../components/forms/handler';

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
      formControls: {
        search: '',
      }
    }

    this.changeHandler = changeHandler.bind(this);
  }

  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents() {
    studentsAPI.getAll().then(res => {
      this.setState({students: res.data, loaded: true});
    })
  }

  filteredStudents() {
    return this.state.students.filter(({name}) =>name.toLowerCase().includes(this.state.formControls.search.toLowerCase()));
  }

  render() {
    if (!this.state.loaded) {
      return <Loader />
    }

    return(
      <Content> 
        <div className="d-flex mb-3">
          <SectionTitle icon="students" title='Alunos' />
          <AdminBlock>
            <div className="ml-auto">
              <AddStudent onRegister={this.getAllStudents.bind(this)} />
            </div>
          </AdminBlock>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <SearchInput name='search' onChange={this.changeHandler.bind(this)} />
          </div>
        </div>
        <div className='row'>
          {this.filteredStudents().map(student => 
                (<div key={student.id} className='col-md-4 mt-2'><StudentListCard key={student.id} student={student} /></div>)
              )}
        </div>
      </Content>
    );
  }
}

export default Students;