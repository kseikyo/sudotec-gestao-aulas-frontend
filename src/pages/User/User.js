import React from 'react';
import Content from '../../components/misc/Content';
import SectionTitle from '../../components/misc/SectionTitle';
import TextInput from '../../components/forms/Input';
import Select from '../../components/forms/Select';
import PageTitle from '../../components/misc/PageTitle';
import usersAPI from '../../services/api/users';
import {changeHandler} from '../../components/forms/handler';
import DeleteModal from '../../components/misc/DeleteModal';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class Student extends React.Component {
  constructor(props) {
    super(props);

    this.types = [
      {id: 'admin', description: 'Admin'},
      {id: 'teacher', description: 'Professor'},
    ];

    this.state = {  
      user: null,
      loaded: false,
      formControls: {},
      openDeleteModal: false,
    }

    this.changeHandler = changeHandler.bind(this);
  }

  componentDidMount() {
    this.updateUser();
  }

  updateUser() {
    let routeId = this.props.match.params.id;
    
    usersAPI.getById(routeId).then(res => {
      this.setState({
        user: res.data, 
        loaded: true,
        formControls: {...res.data},
      });
    });
  }

  deleteUser() {
    usersAPI.delete(this.state.user.id).then(res => {
      this.props.history.push('/usuarios');
    });
  }

  toggleDeleteModal() {
    this.setState({openDeleteModal: !this.state.openDeleteModal});
  }

  cancel() {
    this.setState({formControls: this.state.user});
  }

  update() {
    usersAPI.update(this.state.formControls).then(res => {
      this.updateUser();
    });
  }

  render() {
    let {user, loaded, formControls} = this.state;

    if (!loaded) {
      return 'loading...'
    }
    
    return(
      <>
      <div className='d-flex'>
        <PageTitle title='Perfil do usuário'/>
      </div>
      <Content>
        <SectionTitle title='Dados' icon='info-circle' />
        
        <div className='row mt-3'>
          <div className='col-md-6'>
            <TextInput name='name' onChange={this.changeHandler} label='Nome' value={formControls.name}/>
            <TextInput name='email' onChange={this.changeHandler} label='Email'  value={formControls.email} type='email' />
            <Select label='Tipo de usuário' onChange={this.changeHandler} name='type' value={formControls.type} options={this.types} descriptionAttr='description' />
          </div>
          
          <div className="col-12 pt-3 text-right">
            <div onClick={this.toggleDeleteModal.bind(this)} className='mr-4 text-danger d-inline-block hover-pointer'>Excluir usuário</div>
            <Button variant='secondary' onClick={this.cancel.bind(this)} className='mr-3'>Cancelar</Button>
            <Button variant='primary' onClick={this.update.bind(this)}>Atualizar</Button>
          </div>
        </div>

        <DeleteModal show={this.state.openDeleteModal} onDelete={this.deleteUser.bind(this)} onHide={this.toggleDeleteModal.bind(this)}>
          Tem certeza que deseja excluir o usuário <b>{this.state.user.name}</b>?
        </DeleteModal>

      </Content>
      </>
    );
  }
}

export default withRouter(Student);