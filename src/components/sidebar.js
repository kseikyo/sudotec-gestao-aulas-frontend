import React from 'react';
import '../styles/sidebar.css';

function MenuItem(props) {
    return (
        <li className="nav-item" onClick={() => alert('hi')} style={{ cursor: "pointer" }}>
            <i className={props.icon}></i>
            <span>{props.span}</span>
        </li>
    );
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowing: true
        }
    }

    handleClick() {
        new Promise((resolve, reject) => {
            this.setState({
                isShowing: !this.state.isShowing
            });
            resolve();
        })
            .then(() => {
                let container = document.querySelector(".container");
                this.state.isShowing ? container.style.left = "0px" : container.style.left = "-300px";
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container">
                <nav className="sidebar" role="navigation">
                    <ul className="nav flex-column nav-tabs">
                        <li className="nav-item">
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
                            <MenuItem icon="home-icon" span="Home" />
                            <MenuItem icon="projects-icon" span="Projetos" />
                            <MenuItem icon="courses-icon" span="Cursos" />
                            <MenuItem icon="classes-icon" span="Turmas" />
                            <MenuItem icon="students-icon" span="Alunos" />
                            <MenuItem icon="users-icon" span="Usuarios" />
                        </menu>
                    </ul>
                </nav>
                <button onClick={() => this.handleClick()}>
                    Click me
                </button>
            </div>
        );
    }
}

export default Sidebar;