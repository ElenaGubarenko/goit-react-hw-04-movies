import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';

class Header extends Component {
  render() {
    return (
      <div>
        <NavLink to={routes.homepage}>Home</NavLink>
        <NavLink to={routes.movies}>Movies</NavLink>
      </div>
    );
  }
}
export default Header;
