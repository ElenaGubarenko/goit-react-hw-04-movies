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
    // console.log(this.props);
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.findFilm}>
          {/* <NavLink
            to={{
              pathname: `/movies?query=${this.state.inputValue}`,
              state: {
                from: this.props.location,
              },
            }}
          >
            <input
              value={this.state.inputValue}
              type="input"
              onChange={() => this.changeStateValue}
            ></input>
            <span>Search</span>
          </NavLink> */}

          <NavLink to={`/movies?query=${this.state.inputValue}`}>
            <input
              type="input"
              value={this.state.inputValue}
              onChange={this.changeStateValue}
            ></input>
          </NavLink>
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
        <Route
          path={`/movies?query=${this.state.inputValue}`}
          // render={props => console.log(props)}
        ></Route>
      </div>
    );
  }
}
export default MoviesPage;
