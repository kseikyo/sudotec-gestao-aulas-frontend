import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import {changeHandler} from '../forms/handler';
import TextInput from '../forms/Input';
import Select from '../forms/Select';
import usersAPI from '../../services/api/users';
import GlyphButton from '../misc/GlyphButton';

class AddUser extends React.Component {
  constructor(props) {
    super(props);

    this.types = [
      {id: 'admin', description: 'Admin'},
      {id: 'teacher', description: 'Professor'},
    ];

    this.state = {
      showModal: false,
      formControls: {
        name: '',
        email: '',
        type: '',
      },
    }

    this.changeHandler = changeHandler.bind(this);
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  create() {
    usersAPI.create(this.state.formControls).then(res => {
      this.props.onRegister(res.data);
      this.toggleModal();
    });
  }

  render() {
    let {formControls} = this.state;

    return (
      <>
        <GlyphButton click={this.toggleModal.bind(this)} className="ml-auto">Novo usuário</GlyphButton>

        <RegisterModal save={this.create.bind(this)} show={this.state.showModal} close={this.toggleModal.bind(this)} cancel={this.toggleModal.bind(this)} title='Cadastrar Aluno' subtitle='Preencha os dados para cadastrar um novo aluno.'>
          <TextInput name='name' onChange={this.changeHandler} label='Nome' value={formControls.name}/>
          <TextInput name='email' onChange={this.changeHandler} label='Email'  value={formControls.email} type='email' />
          <Select label='Tipo de usuário' onChange={this.changeHandler} name='type' value={formControls.type} options={this.types} descriptionAttr='description' />
        </RegisterModal>
      </>
    )
  }
}

export default AddUser;
