import React from 'react';
import usersAPI from '../../services/api/users';
import AddUser from '../../components/users/AddUser';
import Content from '../../components/misc/Content';
import SectionTitle from '../../components/misc/SectionTitle';
import {Link} from 'react-router-dom';
import Loader from '../../components/misc/Loader';
import SearchInput from '../../components/forms/SearchInput';
import {changeHandler} from '../../components/forms/handler';

function UserListCard({user}) {
  return (
    <Link to={`/usuarios/${user.id}`}>
      <div className='user-card'>
        <div className='user-name'>
          {user.name}
        </div>
        {user.type === 'admin' ?
          (<span>Admin</span>) :
          (<span>Professor</span>)}
      </div>
    </Link>
  );
}

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      laoded: false,
      formControls: {
        search: '',
      }
    }

    this.changeHandler = changeHandler.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
  }

  filteredUsers() {
    return this.state.users.filter(({name}) =>name.toLowerCase().includes(this.state.formControls.search.toLowerCase()));
  }

  getAllUsers() {
    usersAPI.getAll().then(res => {
      this.setState({users: res.data, loaded: true});
    })
  }

  render() { 
    if (!this.state.loaded) {
      return <Loader />
    } 
      
    return(
      <Content> 
        <div className="d-flex mb-3">
          <SectionTitle icon="user" title='Usuários' />
          <div className="ml-auto">
            <AddUser onRegister={this.getAllUsers.bind(this)} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <SearchInput name='search' onChange={this.changeHandler.bind(this)} />
          </div>
        </div>
        <div className='row'>
          {this.filteredUsers().map(user => 
              (
                <div key={user.id} className='col-md-4 mt-2'>
                  <UserListCard user={user} />
                </div>
              )
          )}
        </div>
      </Content>
    );
  }
}

export default Users;