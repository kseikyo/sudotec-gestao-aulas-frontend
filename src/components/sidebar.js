import React from 'react';
import '../styles/sidebar.scss';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

function MenuItem(props) {
    return (
        <NavLink activeClassName='is-active'to={props.span} style={{ textDecoration: 'none', color: '#454545'}}>
            <li className="nav-item menu-item" style={{ cursor: "pointer" }}>
                <div className="nav-icon"><i className={props.icon} style={{ fontSize: "1.5em" }}></i></div>
                <span>{props.span}</span>
            </li>
            <Route path={`/${props.span}/`}/>
        </NavLink>
    );
}

class Sidebar extends React.Component {

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
                    <div>
                        <span className="nav-title">
                            Gerenciamento de aulas
                        </span>
                    </div>
                    <ul className="nav flex-column nav-tabs">
                        <Router>
                            <menu>
                                <MenuItem icon="fas fa-home home-icon" span="Home" />
                                <MenuItem icon="fas fa-folder-open projects-icon" span="Projetos" />
                                <MenuItem icon="fas fa-book-open courses-icon" span="Cursos" />
                                <MenuItem icon="fas fa-chalkboard-teacher classes-icon" span="Turmas" />
                                <MenuItem icon="fas fa-user-friends students-icon" span="Alunos" />
                                <MenuItem icon="fas fa-user users-icon" span="Usuarios" />
                            </menu>
                        </Router>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;