import { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Api from '../Api';

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

  findFilm = query => {
    api
      .findFilm(query)
      .then(answer =>
        this.setState({
          foundedFilms: [...answer],
        }),
      )
      .catch(error => console.log(error));
    // <Route
    //   path={`${this.props.match.path}${this.props.location.search}`}
    // ></Route>;

    // const { history, location } = this.props;
    // history.push(location.state.from);

    // console.log(this.state.foundedFilms);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <input
          value={this.state.inputValue}
          type="input"
          onChange={this.changeStateValue}
        ></input>
        <NavLink to={`${this.props.match.url}?query=${this.state.inputValue}`}>
          <button
            onClick={() => this.findFilm(this.state.inputValue)}
            type="button"
          >
            Search
          </button>
        </NavLink>
        <ul>
          {this.state.foundedFilms.map(film => (
            <li key={film.id}>
              <NavLink to={`${this.props.match.url}/${film.id}`}>
                {film.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <Route
          path={`${this.props.match.path}${this.props.location.search}`}
        ></Route>
      </div>
    );
  }
}
export default MoviesPage;
