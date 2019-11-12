import React from 'react';
import { changeHandler } from '../forms/handler';
import TextArea from '../forms/TextArea';
import courses from '../../services/api/courses';
import projects from '../../services/api/projects';
import TextInput from '../forms/Input';
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
        projects.update(form)
            .then(res => {
                this.props.update();
            })
    }

    cancel() {
        this.setState({ formControls: { ...this.props.project } });
        // this.render();
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
                    <form encType="multipart/form-data" ref={this.formRef}>
                        <div className="col-md-6">
                            <TextInput name='name' onChange={this.changeHandler} label='Nome' />
                            <TextArea name='description' onChange={this.changeHandler} label='Descrição' />
                        </div>
                        <div className="col-md-3">
                            <ImageUploader name='image' handler={this.imageHandler} imageFile={formControls.image} />
                        </div>
                        <div className="col-md-3">
                            <SectionStatus icon="plus" status="Ativo" />
                        </div>
                    </form>
                    <div className="col-12 pt-3 text-right">
                        <Button variant='secondary' onClick={this.cancel.bind(this)} className='mr-3'>Cancelar</Button>
                        <Button variant='primary' onClick={this.update.bind(this)}>Atualizar</Button>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(UpdateProject);