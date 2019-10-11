import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import TextInput from '../forms/TextInput';
import TextArea from '../forms/TextArea';

class RegisterGradeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grade: {
        name: '',
        description: '',
        project_id: null,
        course_id: null,
        teacher_id: null,
        shift: 'Matutino',
        initial_date: null,
        final_date: null,
      }
    }
  }

  render() {
    return (
      <RegisterModal show={this.props.show} close={this.props.close} title='Cadastrar turma' subtitle='Preencha os dados para cadastrar uma nova turma.'>
        <TextInput label='Nome'/>
        <TextArea label='Descrição'/>
      </RegisterModal>
    )
  }
}

export default RegisterGradeModal;
