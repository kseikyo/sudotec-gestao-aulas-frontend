import React from 'react';
import MenuItem from './MenuItem';

class MainMenu extends React.Component {

    render() {
        return (
            <div className="container" id="sidebar">
                <div className="sidebar-container" role="navigation">
                    <div id="logo" className="p-4 text-center text-white">
                        <span className="nav-logo">
                            <img alt="Sudotec" src="/images/logo-white.png" className="img-fluid" width="150px"></img>
                        </span>
                    </div>
                    <div className='text-center mt-4 text-black-50 font-weight-bold'>
                        <span className="nav-title">
                            Gerenciamento de aulas
                        </span>
                    </div>
                    <ul className="nav flex-column nav-tabs">
                        <menu>
                            <MenuItem exact={true} icon="home" span="Home" link='/'/>
                            <MenuItem icon="project" span="Projetos" link='/projetos' />
                            <MenuItem icon="course" span="Cursos" link='/cursos' />
                            <MenuItem icon="grade" span="Turmas" link='/turmas' />
                            <MenuItem icon="students" span="Alunos" link='/alunos' />
                            <MenuItem icon="user" span="Usuários" link='/usuarios' />
                        </menu>
                    </ul>
                </div>
            </div>
        );
    }
}

export default MainMenu;