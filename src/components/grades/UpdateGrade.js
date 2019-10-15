import React from 'react';
import { changeHandler } from '../forms/handler';
import TextArea from '../forms/TextArea';
import Select from '../forms/Select';
import grades from '../../services/api/grades';
import projects from '../../services/api/projects';
import teachers from '../../services/api/teachers';
import TextInput from '../forms/Input';
import {Button} from 'react-bootstrap';

class UpdateGrade extends React.Component {
  constructor(props) {
    super(props);

    let { grade } = props;

    this.shifts = [
      { id: 'Matutino', description: 'Matutino' },
      { id: 'Vespertino', description: 'Vespertino' }
    ];

    this.state = {
      formControls: { ...grade },
      projects: [],
      courses: [],
      teachers: [],
    };

    this.changeHandler = changeHandler.bind(this);
  }

  update() {
    grades.update(this.state.formControls)
      .then(res => {
        console.log(res)
      })
  }

  cancel() {
    this.setState({formControls: {...this.props.grade}});
    // this.render();
  }

  setLimitDate() {
    
  }

  componentDidMount() {
    projects
      .getAll()
      .then(res => {
        this.setState({
          projects: res.data,
        }, () => {
          let project = this.state.projects.find(el => el.id === this.props.grade.course.project_id);

          this.setState({ courses: project.courses })
        })
      });

    teachers.getAll().then(res => {
      this.setState({ teachers: res.data });
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

  render() {
    let { formControls } = this.state;

    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <TextInput name='name' defaultValue={formControls.name} onInput={this.changeHandler} label='Nome' />
            <Select label='Período' onChange={this.changeHandler} name='shift' defaultValue={formControls.shift} options={this.shifts} descriptionAttr='description' />
            <Select label='Professor' name='teacher_id' defaultValue={formControls.teacher_id} onChange={this.changeHandler} options={this.state.teachers} />
            <TextArea name='resources' defaultValue={formControls.resources} onInput={this.changeHandler} label='Recursos necessários' />
          </div>

          <div className="col-md-6">
            <Select label='Projeto' defaultValue={formControls.project_id} name='project_id' onChange={(event) => { this.changeHandler(event, this.setCourses.bind(this)) }} options={this.state.projects} />
            <Select label='Cursos' defaultValue={formControls.course_id} name='course_id' onChange={this.changeHandler} options={this.state.courses} />
            <TextInput type='date' defaultValue={formControls.initial_date} name='initial_date' onChange={(event) => { this.changeHandler(event, this.setLimitDate.bind(this)) }} label='Data inicial' />
            <TextInput type='date' defaultValue={formControls.final_date} name='final_date' onChange={(event) => { this.changeHandler(event, this.setLimitDate.bind(this)) }} label='Data final' />
            <TextInput value={this.state.formControls.registration_date_limit} type='date' name='registration_date_limit' onChange={this.changeHandler} label='Data limite para matrícula' />
          </div>

          <div className="col-12 text-right">
            <Button variant='secondary' onClick={this.cancel.bind(this)} className='mr-3'>Cancelar</Button>
            <Button variant='primary' onClick={this.update.bind(this)}>Atualizar</Button>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateGrade;