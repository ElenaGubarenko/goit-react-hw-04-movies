import { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Api from '../Api';
// import Cast from '../Cast';
import routes from '../../routes';

const api = new Api();

class MoviesPage extends Component {
  state = {
    inputValue: '',
    foundedFilms: [],
  };

  changeStateValue = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  findFilm = e => {
    e.preventDefault();
    api
      .findFilm(this.state.inputValue)
      .then(answer =>
        this.setState({
          foundedFilms: [...answer],
        }),
      )
      .catch(error => console.log(error));

    // const { history, location } = this.props;
    // history.push(location.state.from);
  };

  render() {
    console.log(this.props);
    // console.log(this.state);
    // console.log(this.state.inputValue);
    return (
      <div>
        <form onSubmit={this.findFilm}>
          <NavLink
            to={{
              state: {
                from: this.props.location,
                pathname: `${this.props.match.url}?query=${this.state.inputValue}`,
              },
            }}
            // to={`${this.props.match.url}?query=${this.state.inputValue}`}
          >
            <input type="input" onChange={this.changeStateValue}></input>
          </NavLink>
          <Route path={`${routes.movies}${routes.search}`}></Route>
        </form>
        <ul>
          {this.state.foundedFilms.map(film => (
            <li key={film.id}>
              <NavLink to={`${this.props.match.url}/${film.id}`}>
                {film.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default MoviesPage;
