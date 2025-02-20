import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {auth} from "../actions";


class Menu extends React.Component {

    getPanel = () => {
        const {isAuthenticated, isSuperUser} = this.props;
        let elements = [
            <NavLink to="/" activeClassName="nav-link" className="nav-link">
                Главная
            </NavLink>,
            <NavLink to="/gallery" activeClassName="nav-link" className="nav-link">
                Галерея
            </NavLink>,
            <NavLink to="/detection" activeClassName="nav-link" className="nav-link">
                Детекция
            </NavLink>,
            <NavLink to="/classification" activeClassName="nav-link" className="nav-link">
                Классификация
            </NavLink>
        ]

        if (isSuperUser) {
            elements.push(
                <NavLink to="/statistics" activeClassName="nav-link" className="nav-link">
                    Статистика
                </NavLink>
            );
        }

        if (!isAuthenticated) {
            elements = elements.concat([
                <NavLink to="/login" activeClassName="nav-link" className="nav-link">
                    Войти
                </NavLink>,
                <NavLink exact to="/register" activeClassName="nav-link" className="nav-link">
                    Зарегистрироваться
                </NavLink>
            ]);
        }

        return elements;
    }

    render() {
        const { isAuthenticated, logout } = this.props;

        return (
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-light">
                <button className="navbar-toggler"
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarText" 
                        aria-controls="navbarText" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ml-auto">
                        {this.getPanel().map((el, i) => {
                            return (
                                <li className="nav-item" key={`li-${i}`}>
                                    {el}
                                </li>
                            )
                        })}
                        {isAuthenticated && 
                            <li className="nav-item nav-link logout-link">
                                <a onClick={logout} >Выйти</a>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}

const mapStateToProps = state => {
    const { user, isAuthenticated } = state.auth;
    return {
        isAuthenticated: isAuthenticated,
        isSuperUser: user && user.is_superuser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
