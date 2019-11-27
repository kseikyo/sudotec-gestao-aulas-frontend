import React from 'react';
import { changeHandler } from '../forms/handler';
import TextArea from '../forms/TextArea';
import courses from '../../services/api/courses';
import projects from '../../services/api/projects';
import TextInput from '../forms/Input';
import ImageUploader from '../misc/ImageUploader';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import StatusCheckbox from '../misc/StatusCheckbox';
import DeleteModal from '../misc/DeleteModal';

class UpdateProject extends React.Component {
    constructor(props) {
        super(props);

        let { project } = props;

        this.state = {
            formControls: { ...project },
            courses: [],
            openDeleteModal: false
        };

        this.formRef = React.createRef();
        this.changeHandler = changeHandler.bind(this);
    }

    update() {
        let form = new FormData(this.formRef.current);

        if (!!form.get('status'))
            form.set('status', 'active')
        else
            form.set('status', 'inactive')

        form.append('_method', 'put');
        projects.update(form)
            .then(res => {
                this.props.update();
            })
            .then(() => {
                this.redirect();
            });
    }

    redirect() {
        this.props.history.push('/projetos');
    }

    cancel() {
        this.setState({
            formControls: { ...this.props.project }
        },
            this.redirect()
        );
    }

    deleteProject() {
        projects.delete(this.props.project.id).then(() => {
            this.props.history.push('/projetos');
        })
    }

    toggleDeleteModal() {
        this.setState({ openDeleteModal: !this.state.openDeleteModal });
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

    componentDidMount() {
        courses
            .getAll()
            .then(res => {
                this.setState({
                    courses: res.data,
                })
            });
    }

    render() {
        let { formControls } = this.state;
        return (
            <>
                <div className={`row ${this.props.className}`}>
                    <form className="row col-12" encType="multipart/form-data" ref={this.formRef}>
                        <div className="col-md-6">
                            <input type='hidden' name='id' value={formControls.id} />
                            <TextInput name='name' value={formControls.name} onChange={this.changeHandler} label='Nome' />
                            <TextArea name='description' value={formControls.description} onChange={this.changeHandler} label='Descrição' />
                        </div>
                        <div className="col-md-4">
                            <ImageUploader name='image' handler={this.imageHandler.bind(this)} imagePreview={formControls.image} />
                        </div>
                        <div className="col-md-2">
                            <StatusCheckbox status={formControls.status} handler={this.changeHandler} />
                        </div>
                    </form>
                </div>
                <div className="col-12 pt-3 text-right">
                    <div onClick={this.toggleDeleteModal.bind(this)} className='mr-4 text-danger d-inline-block hover-pointer'>Excluir curso</div>
                    <Button variant='secondary' onClick={this.cancel.bind(this)} className='mr-3'>Cancelar</Button>
                    <Button variant='primary' onClick={this.update.bind(this)}>Atualizar</Button>
                </div>

                <DeleteModal show={this.state.openDeleteModal} onDelete={this.deleteProject.bind(this)} onHide={this.toggleDeleteModal.bind(this)}>
                    Tem certeza que deseja excluir o projeto <b>{this.props.project.name}</b>?
                </DeleteModal>
            </>
        );
    }
}

export default withRouter(UpdateProject);