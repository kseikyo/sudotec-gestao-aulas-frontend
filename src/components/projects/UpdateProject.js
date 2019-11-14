import React from 'react';
import { changeHandler } from '../forms/handler';
import TextArea from '../forms/TextArea';
import courses from '../../services/api/courses';
import projects from '../../services/api/projects';
import TextInput from '../forms/Input';
import ImageUploader from '../misc/ImageUploader';
import SectionStatus from '../misc/SectionStatus';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class UpdateProject extends React.Component {
    constructor(props) {
        super(props);

        let { project } = props;

        this.state = {
            formControls: { ...project },
            courses: [],
        };

        this.formRef = React.createRef();
        this.changeHandler = changeHandler.bind(this);
    }

    update() {
        let form = new FormData(this.formRef.current);
        form.append('_method', 'put');
        projects.update(form)
            .then(res => {
                this.props.update();
            })
    }

    cancel() {
        this.setState({ formControls: { ...this.props.project } });
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
                            <ImageUploader name='image' handler={this.imageHandler.bind(this)} imageFile={formControls.image} />
                            
                        </div>
                        <div className="col-md-2">
                            <SectionStatus icon="plus" status="Ativo" />
                        </div>
                    </form>
                </div>
                <div className="col-12 pt-3 text-right">
                    <Button variant='secondary' onClick={this.cancel.bind(this)} className='mr-3'>Cancelar</Button>
                    <Button variant='primary' onClick={this.update.bind(this)}>Atualizar</Button>
                </div>
            </>
        );
    }
}

export default withRouter(UpdateProject);