import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import {changeHandler} from '../forms/handler';
import GlyphButton from '../misc/GlyphButton';
import TextInput from '../forms/Input';
import TextArea from '../forms/TextArea';
import lessons from '../../services/api/lessons';
import StudentFrequency from '../../components/lesson/frequency/StudentFrequency';
import attendanceDefs from '../../config/attendance';

class RegisterGradeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      formControls: {
        grade_id: this.props.grade.id,
        description: this.props.description,
        grade_date: new Date(),
        attendances: []
      },
    }

    this.changeHandler = changeHandler.bind(this);
  }
  
  componentDidMount() {
    let attendances = [];

    this.props.grade.students.forEach(student => {
      attendances.push({student_id: student.id, presence: attendanceDefs.PRESENT, name: student.name});
    })
    
    this.setState({formControls: {...this.state.formControls, attendances: attendances}});
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

  create() {
    lessons.create(this.state.formControls).then(res => {
      this.props.onRegister();
      this.closeModal();
    });
  }

  render() {
    return (
      <>
        <GlyphButton click={this.openModal.bind(this)} variant='main' className='ml-auto align-self-start'>Chamada</GlyphButton>

        <RegisterModal save={this.create.bind(this)} show={this.state.showModal} close={this.closeModal.bind(this)} cancel={this.closeModal.bind(this)} title='Nova aula' subtitle={this.props.grade.name}>
          <div className='pb-3'>
            <h6 className="text-muted">Dados da aula</h6>
            <TextInput type='date' name='grade_date' onInput={this.changeHandler} label='Data'/>
            <TextArea name='description' onInput={this.changeHandler} label='Descrição'/>
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

export default RegisterGradeModal;
