import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import {changeHandler} from '../forms/handler';
import TextInput from '../forms/Input';
import TextArea from '../forms/TextArea';
import lessons from '../../services/api/lessons';
import StudentFrequency from './frequency/StudentFrequency';
import attendanceDefs from '../../config/attendance';
import DeleteModal from '../misc/DeleteModal';

class UpdateLessonModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      formControls: this.props.lesson,
      showDeleteModal: false,
    }

    this.changeHandler = changeHandler.bind(this);
  }

  componentDidMount() {
    let attendances = this.state.formControls.attendances;

    attendances = attendances.map(att => {      
      if (att.presence === attendanceDefs.JUSTIFIED) {
        att.justification = att.justification.justification;
      }

      return att;
    })

    this.setState({formControls: {...this.state.formControls, attendances}})
  }
  
  setPresence(presence) {    
    let index = this.state.formControls.attendances.findIndex(el => el.student.id === presence.student_id);
    let attendances = this.state.formControls.attendances;

    attendances[index] = Object.assign(attendances[index], presence);

    if (attendances[index].presence !== attendanceDefs.JUSTIFIED) {
      delete attendances[index].justification;
    }

    this.setState({formControls: {...this.state.formControls, attendances: attendances}});
  }

  openModal() {
    this.setState({showModal: true});
  }

  closeModal() {
    this.setState({showModal: false});
  }

  update() {
    lessons.update(this.state.formControls).then(res => {
      this.props.onUpdate(res.data);
      this.closeModal();
    });
  }
  
  deleteLesson() {
    lessons.delete(this.props.lesson.id).then(() => {
      this.props.onUpdate();
      this.closeModal();
    })
  }

  toggleDeleteModal() {
    this.setState({showDeleteModal: !this.state.showDeleteModal, showModal: !this.state.showModal});
  }

  render() {
    return (
      <>
        <RegisterModal enableDelete onDelete={this.toggleDeleteModal.bind(this)} icon='lesson' save={this.update.bind(this)} show={this.props.showModal} close={this.props.closeModal} cancel={this.props.closeModal} title='Relatório de aula' subtitle={`Turma ${this.props.grade.name}`}>
          <div className='pb-3'>
            <h6 className="text-muted">Dados da aula</h6>
            <TextInput type='date' name='grade_date' value={this.state.formControls.grade_date} onChange={this.changeHandler} label='Data'/>
            <TextArea name='description' value={this.state.formControls.description} onChange={this.changeHandler} label='Descrição'/>
          </div>
          <div className='pb-3'>
            <h6 className="text-muted mb-0">Presenças</h6>
            <small className='text-black-50'>Clique nos ícones ou dê dois cliques para alterar a presença.</small>
            {this.state.formControls.attendances.map(attendance => (<StudentFrequency key={attendance.student.id} onchange={this.setPresence.bind(this)} attendance={attendance} />))}
          </div>
          <DeleteModal show={this.state.showDeleteModal} onDelete={this.deleteLesson.bind(this)} onHide={this.toggleDeleteModal.bind(this)}>
            Tem certeza que deseja remover a aula do dia {this.state.formControls.grade_date}?
          </DeleteModal>
        </RegisterModal>
      </>
    )
  }
}

export default UpdateLessonModal;
