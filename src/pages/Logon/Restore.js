import React from 'react';
import {changeHandler} from '../../components/forms/handler';
import TextLink from '../../components/misc/TextLink';
import Input from '../../components/forms/Input';
import {Button} from 'react-bootstrap';
import loginAPI from '../../services/api/login';
import Loader from '../../components/misc/Loader';

class RedefinePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false,
            fail: false,
            formControls: {
                token: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }

        this.changeHandler = changeHandler.bind(this);
    }

    submitHandler() {
        this.setState({loading: true, success: false, fail: false});

        loginAPI.requestReset(this.state.formControls)
        .then(() => {
            this.setState({success: true, loading: false});
        })
        .catch(() => {
            this.setState({fail: true, loading: false});
        });
    }

    render() {
        let {formControls} = this.state;
        return (
            <>
                <form className="form-container">
                    <header className="form-header text-center">
                        <h2>Recuperar Senha</h2>
                    </header>
                    <Input label='Email' name='email' type="email" value={formControls.email} onChange={this.changeHandler.bind(this)} />
                    
                    {this.state.success ? 
                    <small className='d-block text-primary'>Um link de recuperação de senha foi enviado para o seu email.</small> :
                    <></>
                    }
                    
                    {this.state.fail ? 
                    <small className='d-block text-danger'>Falha ao enviar email de recuperação de senha.</small> :
                    <></> 
                    }
                    
                    {this.state.loading ? 
                    <Loader message='Enviando...' size='40px' /> :
                    <></> 
                    }

                    <Button className="form-button w-100" onClick={this.submitHandler.bind(this)}>Confirmar</Button>
                </form>
                <TextLink  to="/auth" span="Fazer login." path="/auth"/>
            </>
        );
    }
}

export default RedefinePassword;
