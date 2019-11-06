import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import { changeHandler } from '../forms/handler';
import TextInput from '../forms/Input';
import TextArea from '../forms/TextArea';
import ImageUploader from '../misc/ImageUploader';
import projects from '../../services/api/projects';

class RegisterProjectModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formControls: {
                name: '',
                description: '',
                imageFile: '',
            }
        }

        this.changeHandler = changeHandler.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
    }

    imageHandler(file, callback) {
        this.setState({
            formControls: {
                ...this.state.formControls,
                imageFile: file
            }
          }, () => {
            if (callback) {
              callback();
            }
          });
    }

    create() {
        projects.create(this.state.formControls).then(res => {
            this.props.onRegister(res.data);
            this.props.close();
        });
    }

    render() {
        let { formControls } = this.state;
        return (
            <RegisterModal save={this.create.bind(this)} show={this.props.show} close={this.props.close} cancel={this.props.close} title='Cadastrar projeto' subtitle='Preencha as informações para cadastrar um novo projeto.'>
                <TextInput name='name' onChange={this.changeHandler} label='Nome' />
                <TextArea name='description' onChange={this.changeHandler} label='Descrição' />
                <ImageUploader handler={this.imageHandler} imageFile={formControls.imageFile} />
            </RegisterModal>
        )
    }
}

export default RegisterProjectModal;
