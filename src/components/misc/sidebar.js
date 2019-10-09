import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

function MenuItem(props) {
    return (
        <NavLink activeClassName='is-active' to={props.span} style={{ textDecoration: 'none', color: '#454545'}}>
            <li className="nav-item menu-item" style={{ cursor: "pointer" }}>
                <div className="nav-icon"><i className={`icon-${props.icon}`}></i></div>
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

export default Sidebar;