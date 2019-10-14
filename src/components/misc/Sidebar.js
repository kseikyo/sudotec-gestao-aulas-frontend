import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
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
                        <Router>
                            <menu>
                                <MenuItem icon="home" span="home" />
                                <MenuItem icon="project" span="projetos" />
                                <MenuItem icon="course" span="cursos" />
                                <MenuItem icon="grade" span="turmas" />
                                <MenuItem icon="students" span="alunos" />
                                <MenuItem icon="user" span="usuarios" />
                            </menu>
                        </Router>
                    </ul>
                </div>
            </div>
        );
    }
}

export default MainMenu;
/* It will work calling it Sidebar into dashboard because it's a default export
 * If it was a named import, e.g, export const MainMenu = MainMenu.
 * It would work by importing using "import {MainMenu} from 'path'" or by "import {MainMenu as Sidebar} .."
 */