import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import {changeHandler} from '../forms/handler';
import TextInput from '../forms/Input';
import Select from '../forms/Select';
import studentsAPI from '../../services/api/students';
import GlyphButton from '../misc/GlyphButton';

class AddStudent extends React.Component {
  constructor(props) {
    super(props);

    this.genders = [
      {id: 'F', description: 'Feminino'},
      {id: 'M', description: 'Masculino'}
    ];

    this.state = {
      showModal: false,
      formControls: {
        name: '',
        gender: null,
        rg: '',
        cpf: '',
        email: '',
        phone: '',
        hometown: '',
        birth_date: '',
        address: '',
        mother_name: '',
      },
    }

    this.changeHandler = changeHandler.bind(this);
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  create() {
    studentsAPI.create(this.state.formControls).then(res => {
      this.props.onRegister(res.data);
      this.toggleModal();
    });
  }

  render() {
    let {formControls} = this.state;

    return (
      <>
        <GlyphButton click={this.toggleModal.bind(this)} className="ml-auto">Novo aluno</GlyphButton>

        <RegisterModal save={this.create.bind(this)} show={this.state.showModal} close={this.toggleModal.bind(this)} cancel={this.toggleModal.bind(this)} title='Cadastrar Aluno' subtitle='Preencha os dados para cadastrar um novo aluno.'>
          <TextInput name='name' onChange={this.changeHandler} label='Nome' value={formControls.name}/>
          <TextInput type='date' name='birth_date' onChange={this.changeHandler.bind(this)} label='Data de nascimento' value={formControls.birth_date}/>
          <Select label='Gênero' onChange={this.changeHandler} name='gender' value={formControls.gender} options={this.genders} descriptionAttr='description' />
          <TextInput name='rg' onChange={this.changeHandler} label='RG' value={formControls.rg}/>
          <TextInput name='cpf' onChange={this.changeHandler} label='CPF'  value={formControls.cpf} />
          <TextInput name='email' onChange={this.changeHandler} label='Email'  value={formControls.email} type='email' />
          <TextInput name='hometown' onChange={this.changeHandler} label='Cidade natal' value={formControls.hometown} type='email' />
          <TextInput name='mother_name' onChange={this.changeHandler} label='Nome da mãe' value={formControls.mother_name} type='phone' />
          <TextInput name='phone' onChange={this.changeHandler} label='Telefone' value={formControls.phone} type='phone' />
          <TextInput name='address' onChange={this.changeHandler} label='Endereço' value={formControls.address} type='phone' />
        </RegisterModal>
      </>
    )
  }
}

export default AddStudent;
