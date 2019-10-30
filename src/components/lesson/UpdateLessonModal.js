import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import {changeHandler} from '../forms/handler';
import TextInput from '../forms/Input';
import TextArea from '../forms/TextArea';
import lessons from '../../services/api/lessons';
import StudentFrequency from './frequency/StudentFrequency';
import attendanceDefs from '../../config/attendance';

class UpdateLessonModal extends React.Component {
  constructor(props) {
    super(props);

    let formControls = this.props.lesson;
    formControls.attendances = formControls.attendances.map(el => {
      if (el.presence === attendanceDefs.JUSTIFIED) {
        el.justification = el.justification.justification;
      }

      return el;
    })

    this.state = {
      showModal: false,
      formControls: this.props.lesson,
    }

    this.changeHandler = changeHandler.bind(this);
  }
  
  setPresence(presence) {
    let index = this.state.formControls.attendances.findIndex(el => el.student_id === presence.student_id);
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

  render() {
    return (
      <>
        <RegisterModal icon='lesson' save={this.update.bind(this)} show={this.props.showModal} close={this.props.closeModal} cancel={this.props.closeModal} title='Relatório de aula' subtitle={this.props.grade.name}>
          <div className='pb-3'>
            <h6 className="text-muted">Dados da aula</h6>
            <TextInput type='date' name='grade_date' defaultValue={this.state.formControls.grade_date} onInput={this.changeHandler} label='Data'/>
            <TextArea name='description' defaultValue={this.props.lesson.description} onInput={this.changeHandler} label='Descrição'/>
          </div>
          <div className='pb-3'>
            <h6 className="text-muted mb-0">Presenças</h6>
            <small className='text-black-50'>Clique nos ícones ou dê dois cliques para alterar a presença.</small>
            {this.state.formControls.attendances.map(student => (<StudentFrequency key={student.student_id} onchange={this.setPresence.bind(this)} student={student} />))}
          </div>
        </RegisterModal>
      </>
    )
  }
}

export default UpdateLessonModal;
