import React from 'react';
import RegisterModal from '../misc/RegisterModal';
import { changeHandler } from '../forms/handler';
import TextInput from '../forms/Input';
import TextArea from '../forms/TextArea';
import ImageUploader from '../misc/ImageUploader';
import courses from '../../services/api/courses';
import SectionStatus from '../misc/SectionStatus';
import Select from '../forms/Select';
import projects from '../../services/api/projects';

class RegisterCourseModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            formControls: {
                name: '',
                description: '',
                image: '',
                status: 'active',
                project_id: ''
            }
        }

        this.formRef = React.createRef();
        this.clearFormControl = this.clearFormControl.bind(this);
        this.changeHandler = changeHandler.bind(this);
        this.imageHandler = this.imageHandler.bind(this);
    }

    componentDidMount() {
        projects.getAll().then(res => {
            this.setState({ projects: res.data });
        });
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

    clearFormControl() {
        this.setState({
            formControls: {
                name: '',
                description: '',
                image: '',
                status: 'active',
                project_id: ''
            }
        })
    }

    create() {
        let form = new FormData(this.formRef.current);
        form.append('status', 'active');

        courses.create(form).then(res => {
            this.props.onRegister(res.data);
            this.props.close();
        });
    }

    render() {
        let { formControls } = this.state;
        return (
            <RegisterModal save={this.create.bind(this)} show={this.props.show} close={this.props.close} cancel={() => {this.props.close(); this.clearFormControl()}} title='Cadastrar curso' subtitle='Preencha as informações para cadastrar um novo curso.'>
                <form encType="multipart/form-data" ref={this.formRef}>
                    <TextInput name='name' onChange={this.changeHandler} label='Nome' />
                    <Select label='Projeto' name='project_id' value={formControls.project_id} onChange={this.changeHandler} options={this.state.projects} />
                    <TextArea name='description' onChange={this.changeHandler} label='Descrição' />
                    <div className="d-flex flex-row">
                        <ImageUploader name='image' handler={this.imageHandler} imageFile={formControls.image} />
                        <div>
                            <SectionStatus icon="plus" status="Ativo" />
                        </div>
                    </div>
                </form>
            </RegisterModal>
        )
    }
}

export default RegisterCourseModal;
