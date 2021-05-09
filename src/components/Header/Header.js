import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <NavLink to={routes.homepage} className="headerNavlink">
          Home
        </NavLink>
        <NavLink to={routes.movies} className="headerNavlink">
          Movies
        </NavLink>
      </div>
    );
  }
}
export default Header;
