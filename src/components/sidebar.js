import React from 'react';
import '../styles/sidebar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function MenuItem(props) {
    return (
        <Link to={props.span} style={{ textDecoration: 'none', color: '#454545'}}>
            <li className="nav-item menu-item" onClick={() => alert(`hi ${props.span}`)} style={{ cursor: "pointer" }}>
                <a style={{ paddingRight: "1rem" }}><i className={props.icon} style={{ fontSize: "1.5em" }}></i></a>
                <span>{props.span}</span>
            </li>
            <Route path={`/${props.span}/`}/>
        </Link>
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
                        <Router>
                            <menu>
                                <MenuItem icon="fas fa-home" span="Home" />
                                <MenuItem icon="fas fa-folder-open projects-icon" span="Projetos" />
                                <MenuItem icon="fas fa-book-open courses-icon" span="Cursos" />
                                <MenuItem icon="fas fa-chalkboard-teacher classes-icon" span="Turmas" />
                                <MenuItem icon="fas fa-user-friends students-icon" span="Alunos" />
                                <MenuItem icon="fas fa-user users-icon" span="Usuarios" />
                            </menu>
                        </Router>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Sidebar;