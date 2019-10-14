import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import {changeHandler} from '../forms/handler';
import TextInput from '../forms/Input';
import TextArea from '../forms/TextArea';
import Select from '../forms/Select';
import projects from '../../services/api/projects';
import teachers from '../../services/api/teachers';
import grades from '../../services/api/grades';

class RegisterGradeModal extends React.Component {
  constructor(props) {
    super(props);

    this.shifts = [
      {id: 'Matutino', description: 'Matutino'},
      {id: 'Vespertino', description: 'Vespertino'}
    ];

    this.state = {
      formControls: {
        name: '',
        resources: '',
        project_id: null,
        course_id: null,
        teacher_id: null,
        shift: '',
        initial_date: null,
        final_date: null,
        registration_date_limit: '',
      },
      projects: [],
      courses: [],
      teachers: [],
    }

    this.changeHandler = changeHandler.bind(this);
  }
  
  componentDidMount() {
    projects.getAll().then(res => {
      this.setState({projects: res.data});
    });

    teachers.getAll().then(res => {
      this.setState({teachers: res.data});
    });
  }

  setCourses() {
    let selectedProject = this.state.projects.find(el => {
      return el.id === parseInt(this.state.formControls.project_id);
    });
    
    this.setState({
      courses: selectedProject.courses,
    });
  }

  setLimitDate() {
    // if (!this.state.formControls.initial_date || !this.state.formControls.final_date) {
    //   return;
    // }

    // let start = new Date(this.state.formControls.initial_date);
    // let end = new Date(this.state.formControls.final_date);

    // console.log(start, end);

    // let curr = new Date((start.getTime() + end.getTime()) * 0.25);
    // let limit = curr.toISOString().substr(0,10);
    // console.log(limit)

    // this.setState({
    //   formControls: {
    //       ...this.state.formControls,
    //       registration_date_limit: limit
    //   }
    // });
  }

  create() {
    grades.create(this.state.formControls).then(res => {
      this.props.onRegister(res.data);
      this.props.close();
    });
  }

  render() {
    return (
      <RegisterModal save={this.create.bind(this)} show={this.props.show} close={this.props.close} cancel={this.props.close} title='Cadastrar turma' subtitle='Preencha os dados para cadastrar uma nova turma.'>
        <TextInput name='name' onInput={this.changeHandler} label='Nome'/>
        <Select label='Período' onInput={this.changeHandler} name='shift' options={this.shifts} descriptionAttr='description' />
        <Select label='Professor' name='teacher_id' onInput={this.changeHandler} options={this.state.teachers} />
        <Select label='Projeto' name='project_id' onInput={(event) => {this.changeHandler(event, this.setCourses.bind(this))}} options={this.state.projects} />
        <Select label='Cursos' name='course_id' onInput={this.changeHandler} options={this.state.courses} />
        <TextArea name='resources' onInput={this.changeHandler} label='Recursos necessários' />
        <hr/>
        <h6 className='text-secondary font-weight-bold py-2'>Datas</h6>
        <TextInput type='date' name='initial_date' onChange={(event) => {this.changeHandler(event, this.setLimitDate.bind(this))}} label='Data inicial'/>
        <TextInput type='date' name='final_date' onChange={(event) => {this.changeHandler(event, this.setLimitDate.bind(this))}} label='Data final'/>
        <TextInput value={this.state.formControls.registration_date_limit} type='date' name='registration_date_limit' onChange={this.changeHandler} label='Data limite para matrícula'/>
      </RegisterModal>
    )
  }
}

export default RegisterGradeModal;
