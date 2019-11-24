import React from 'react';
import {changeHandler} from '../../components/forms/handler';
import TextLink from '../../components/misc/TextLink';
import Input from '../../components/forms/Input';
import {Button} from 'react-bootstrap';
import loginAPI from '../../services/api/login'

class RedefinePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordsEqual: true,
            formControls: {
                token: '',
                email: '',
                password: '',
                password_confirmation: '',
                success: false,
            }
        }

        this.changeHandler = changeHandler.bind(this);
    }
    
    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search)
        let formControls = this.state.formControls;

        formControls.token = urlParams.get('token');
        formControls.email = urlParams.get('email');

        this.setState({formControls});
    }

    submitHandler() {
        let {formControls} = this.state;
        if (formControls.password !== formControls.password_confirmation) {
            this.setState({passwordsEqual: false});
            return;
        } else {
            this.setState({passwordsEqual: true});
        }

        loginAPI.restorePassword(this.state.formControls).then(() => {
            this.setState({success: true});
        }).catch(() => {});
    }

    render() {
        let {formControls} = this.state;
        return (
            <>
                <form className="form-container">
                    <header className="form-header text-center">
                        <h2>Redefinir Senha</h2>
                    </header>
                    <input type="hidden" value={formControls.token} />
                    <Input label='Email' name='email' type="email" value={formControls.email} readOnly />
                    <Input label='Senha' name='password' type="password" value={formControls.password} onChange={this.changeHandler} />
                    <Input label='Confirmar senha' name='password_confirmation' type="password" value={formControls.password_confirmation} onChange={this.changeHandler} />
                    
                    <div>
                    <small className='d-block text-muted'>As senhas devem ter no mínimo 8 caracteres.</small>
                    </div>
                    {this.state.passwordsEqual ? 
                    <></> :
                    <small className='d-block text-danger'>As senhas não são iguais.</small>
                    }

                    <Button className="form-button w-100" onClick={this.submitHandler.bind(this)}>Confirmar</Button>
                    
                    {this.state.success ? 
                    <small className='d-block text-success'>Senha redefinida com sucesso.</small> :
                    <></> 
                    }
                </form>
                <TextLink  to="/auth" span="Fazer login." path="/auth"/>
            </>
        );
    }
}

export default RedefinePassword;
