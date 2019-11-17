import React from 'react';
import Content from '../../components/misc/Content';
// import UpdateGrade from '../../components/grades/UpdateGrade';
// import LessonsContent from '../../components/lesson/LessonsContent';
// import StudentsContent from '../../components/students/StudentsContent';
// import RegisterLessonModal from '../../components/lesson/RegisterLessonModal';
import SectionTitle from '../../components/misc/SectionTitle';
import TextInput from '../../components/forms/Input';
import Select from '../../components/forms/Select';
// import GlyphButton from '../../components/misc/GlyphButton';
import PageTitle from '../../components/misc/PageTitle';
// import {Button} from 'react-bootstrap';
import studentsAPI from '../../services/api/students';
import {changeHandler} from '../../components/forms/handler';
import DeleteModal from '../../components/misc/DeleteModal';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class Student extends React.Component {
  constructor(props) {
    super(props);

    this.genders = [
      {id: 'F', description: 'Feminino'},
      {id: 'M', description: 'Masculino'}
    ];

    this.state = {  
      student: null,
      loaded: false,
      formControls: {},
      openDeleteModal: false,
    }

    this.changeHandler = changeHandler.bind(this);
  }

  componentDidMount() {
    this.updateStudent();
  }

  updateStudent() {
    let routeId = this.props.match.params.id;
    
    studentsAPI.getById(routeId).then(res => {
      this.setState({
        student: res.data, 
        loaded: true,
        formControls: {...res.data},
      });
    });
  }

  deleteStudent() {
    studentsAPI.delete(this.state.student.id).then(res => {
      this.props.history.push('/alunos');
    });
  }

  toggleDeleteModal() {
    this.setState({openDeleteModal: !this.state.openDeleteModal});
  }

  cancel() {
    this.setState({formControls: this.state.student});
  }

  update() {
    studentsAPI.update(this.state.formControls).then(res => {
      this.updateStudent();
    });
  }

  render() {
    let {student, loaded, formControls} = this.state;

    if (!loaded) {
      return 'loading...'
    }
    
    return(
      <>
      <div className='d-flex'>
        <PageTitle title='Perfil do estudante'/>
      </div>
      <Content>
        <SectionTitle title='Dados' icon='info-circle' />
        
        <div className='row mt-5'>
          <div className='col-md-6'>
            <TextInput name='name' onChange={this.changeHandler} label='Nome' value={formControls.name}/>
            <TextInput type='date' name='birth_date' onChange={this.changeHandler.bind(this)} value={formControls.birth_date} label='Data de nascimento'/>
            <Select label='Gênero' onChange={this.changeHandler} name='gender' value={formControls.gender} options={this.genders} descriptionAttr='description' />
            <TextInput name='rg' onChange={this.changeHandler} label='RG' value={formControls.rg}/>
            <TextInput name='cpf' onChange={this.changeHandler} label='CPF'  value={formControls.cpf} />
          </div>
          <div className='col-md-6'>
            <TextInput name='email' onChange={this.changeHandler} label='Email'  value={formControls.email} type='email' />
            <TextInput name='hometown' onChange={this.changeHandler} label='Cidade natal' value={formControls.hometown} type='email' />
            <TextInput name='mother_name' onChange={this.changeHandler} label='Nome da mãe' value={formControls.mother_name} type='phone' />
            <TextInput name='phone' onChange={this.changeHandler} label='Telefone' value={formControls.phone} type='phone' />
            <TextInput name='address' onChange={this.changeHandler} label='Endereço' value={formControls.address} type='phone' />
          </div>
          
          <div className="col-12 pt-3 text-right">
            <div onClick={this.toggleDeleteModal.bind(this)} className='mr-4 text-danger d-inline-block hover-pointer'>Excluir aluno</div>
            <Button variant='secondary' onClick={this.cancel.bind(this)} className='mr-3'>Cancelar</Button>
            <Button variant='primary' onClick={this.update.bind(this)}>Atualizar</Button>
          </div>
        </div>

        <DeleteModal show={this.state.openDeleteModal} onDelete={this.deleteStudent.bind(this)} onHide={this.toggleDeleteModal.bind(this)}>
          Tem certeza que deseja excluir o aluno <b>{this.state.student.name}</b>?
        </DeleteModal>

      </Content>
      </>
    );
  }
}

export default withRouter(Student);