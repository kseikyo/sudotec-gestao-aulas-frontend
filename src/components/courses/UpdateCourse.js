import React from 'react';
import { changeHandler } from '../forms/handler';
import TextArea from '../forms/TextArea';
import projects from '../../services/api/projects';
import courses from '../../services/api/courses';
import TextInput from '../forms/Input';
import ImageUploader from '../misc/ImageUploader';
import SectionStatus from '../misc/SectionStatus';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Select from '../forms/Select';
import { statusHandler } from '../forms/statusHandler';
import StatusCheckbox from '../misc/StatusCheckbox';

class UpdateCourse extends React.Component {
    constructor(props) {
        super(props);

        let { course } = props;

        this.state = {
            formControls: { 
                ...course,
            },
            projects: [],
        };

        this.formRef = React.createRef();
        this.statusHandler = statusHandler.bind(this);
        this.changeHandler = changeHandler.bind(this);
    }

    update() {
        let form = new FormData(this.formRef.current);
        
        if(!!form.get('status'))
            form.set('status', 'active')
        else
            form.set('status', 'inactive')

        form.append('_method', 'put');
        courses.update(form)
            .then(res => {
                this.props.update();
            }).then(() => {
                this.redirect();
            })
    }

    redirect() {
        this.props.history.push('/cursos');
    }

    cancel() {
        this.setState({ 
            formControls: { ...this.props.project } 
        }, this.redirect());
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
        projects
            .getAll()
            .then(res => {
                this.setState({
                    projects: res.data,
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
                            <Select label='Projeto' name='project_id' value={formControls.project_id} onChange={this.changeHandler} options={this.state.projects} />
                            <TextArea name='description' value={formControls.description} onChange={this.changeHandler} label='Descrição' />
                        </div>
                        <div className="col-md-4">
                            <ImageUploader name='image' handler={this.imageHandler.bind(this)} imagePreview={formControls.image} />
                            
                        </div>
                        <div className="col-md-2">
                            {/* <SectionStatus icon="plus" status="Ativo" /> */}
                            <StatusCheckbox status={formControls.status} handler={this.statusHandler}/>
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

export default withRouter(UpdateCourse);