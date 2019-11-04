import React from 'react';
import { changeHandler } from '../forms/handler';
import TextArea from '../forms/TextArea';
import Select from '../forms/Select';
import grades from '../../services/api/grades';
import projects from '../../services/api/projects';
import teachers from '../../services/api/teachers';
import TextInput from '../forms/Input';
import DeleteModal from '../misc/DeleteModal';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

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
      openDeleteModal: false,
    };

    this.changeHandler = changeHandler.bind(this);
  }

  deleteGrade() {
    grades.delete(this.props.grade.id).then(() => {
      this.props.history.push('/turmas');
    })
  }

  toggleDeleteModal() {
    this.setState({openDeleteModal: !this.state.openDeleteModal});
  }

  update() {
    grades.update(this.state.formControls)
      .then(res => {
        this.props.update();
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

    let courseId = 0;
    
    if (selectedProject.courses.length > 0) {
      courseId = selectedProject.courses[0].id
    }

    this.setState({
      courses: selectedProject.courses,
      formControls: {...this.state.formControls, course_id: courseId}
    });
  }

  render() {
    let { formControls } = this.state;

    return (
      <>
        <div className={`row ${this.props.className}`}>
          <div className="col-md-6">
            <TextInput name='name' value={formControls.name} onChange={this.changeHandler} label='Nome' />
            <Select label='Período' onChange={this.changeHandler} name='shift' value={formControls.shift} options={this.shifts} descriptionAttr='description' />
            <Select label='Professor' name='teacher_id' value={formControls.teacher_id} onChange={this.changeHandler} options={this.state.teachers} />
            <TextArea name='resources' value={formControls.resources} onChange={this.changeHandler} label='Recursos necessários' />
          </div>

          <div className="col-md-6">
            <Select label='Projeto' value={formControls.project_id} name='project_id' onChange={(event) => { this.changeHandler(event, this.setCourses.bind(this)) }} options={this.state.projects} />
            <Select label='Cursos' value={formControls.course_id} name='course_id' onChange={this.changeHandler} options={this.state.courses} />
            <TextInput type='date' value={formControls.initial_date} name='initial_date' onChange={(event) => { this.changeHandler(event, this.setLimitDate.bind(this)) }} label='Data inicial' />
            <TextInput type='date' value={formControls.final_date} name='final_date' onChange={(event) => { this.changeHandler(event, this.setLimitDate.bind(this)) }} label='Data final' />
            <TextInput value={this.state.formControls.registration_date_limit} type='date' name='registration_date_limit' onChange={this.changeHandler} label='Data limite para matrícula' />
          </div>

          <div className="col-12 pt-3 text-right">
            <div onClick={this.toggleDeleteModal.bind(this)} className='mr-4 text-danger d-inline-block hover-pointer'>Excluir turma</div>
            <Button variant='secondary' onClick={this.cancel.bind(this)} className='mr-3'>Cancelar</Button>
            <Button variant='primary' onClick={this.update.bind(this)}>Atualizar</Button>
          </div>

          <DeleteModal show={this.state.openDeleteModal} onDelete={this.deleteGrade.bind(this)} onHide={this.toggleDeleteModal.bind(this)}>
            Tem certeza que deseja excluir a turma <b>{this.props.grade.name}</b>?
          </DeleteModal>
        </div>
      </>
    );
  }
}

export default withRouter(UpdateGrade);