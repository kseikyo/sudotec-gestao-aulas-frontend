import React from 'react';
import '../styles/sidebar.css';

function MenuItem(props) {
    return (
        <li className="nav-item menu-item" onClick={() => alert(`hi ${props.span}`)} style={{ cursor: "pointer" }}>
            <a style={{ paddingRight: "1rem"}}><i className={props.icon} style={{fontSize: "1.5em"}}></i></a>
            <span>{props.span}</span>
        </li>
    );
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container sidebar-container">
                <nav className="sidebar" role="navigation">
                    <ul className="nav flex-column nav-tabs">
                        <li id="logo" className="nav-item">
                            <header>
                                <span className="nav-logo">
                                    Sudotec Desenvolvimento e tecnologia
                                </span>
                            </header>
                        </li>
                        <li className="nav-item">
                            <span className="nav-title">
                                Gerenciamento de aulas
                            </span>
                        </li>
                        <menu>
                            <MenuItem icon="fas fa-home" span="Home" />
                            <MenuItem icon="projects-icon" span="Projetos" />
                            <MenuItem icon="courses-icon" span="Cursos" />
                            <MenuItem icon="classes-icon" span="Turmas" />
                            <MenuItem icon="students-icon" span="Alunos" />
                            <MenuItem icon="users-icon" span="Usuarios" />
                        </menu>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Sidebar;