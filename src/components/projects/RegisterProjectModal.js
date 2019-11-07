import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import { changeHandler } from '../forms/handler';
import TextInput from '../forms/Input';
import TextArea from '../forms/TextArea';
import ImageUploader from '../misc/ImageUploader';
import projects from '../../services/api/projects';
import SectionStatus from '../misc/SectionStatus';

class RegisterProjectModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formControls: {
                name: '',
                description: '',
                image: '',
                status: 'active'
            }
        }

        this.changeHandler = changeHandler.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
    }

    imageHandler(file, callback) {
        this.setState({
            formControls: {
                ...this.state.formControls,
                image: file
            }
        }, () => {
            if (callback) {
                callback();
            }
        });
    }

    create() {
        function createForm({name, description, image, status}) {
            let form = new FormData();
            form.append('name', name);
            form.append('description', description);
            form.append('image', image);
            form.append('status', status);
            return form;
        }
        let form = createForm(this.state.formControls);
        projects.create(form).then(res => {
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
                <div className="d-flex flex-row">
                    <ImageUploader handler={this.imageHandler} imageFile={formControls.image} />
                    <div>
                        <SectionStatus icon="plus" status="Ativo" />
                    </div>
                </div>
            </RegisterModal>
        )
    }
}

export default RegisterProjectModal;
