import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import MenuItem from '../misc/menuItem';

class MainMenu extends React.Component {

    render() {
        return (
            <div className="container" id="sidebar">
                <div className="sidebar-container" role="navigation">
                    <div id="logo">
                        <header>
                            <span className="nav-logo">
                                Sudotec Desenvolvimento e tecnologia
                            </span>
                        </header>
                    </div>
                    <div className='text-center mt-3 text-black-50 font-weight-bold'>
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