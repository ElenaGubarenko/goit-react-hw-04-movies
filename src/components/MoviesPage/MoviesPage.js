import { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Api from '../Api';
// import Cast from '../Cast';
// import routes from '../../routes';

const api = new Api();

class MoviesPage extends Component {
  state = {
    inputValue: '',
    foundedFilms: [],
    searchedFilm: this.props.location.search.split('=')[1],
  };

  componentDidMount() {
    // const searchedFilm = this.props.location.search.split('=')[1];
    // this.setState({
    //   searchedFilm: searchedFilm,
    // });
    if (this.state.searchedFilm) {
      this.apiFindFilm(this.state.searchedFilm);
    }
  }

  changeStateValue = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  pushHistory = () => {
    const { location } = this.props.history;

    this.props.history.push({
      ...location,
      pathname: this.props.location.pathname,
      search: `?query=${
        this.state.searchedFilm
          ? this.state.searchedFilm
          : this.state.inputValue
      }`,
    });
  };

  clearHistory = () => {
    // this.props.history.push({
    //   ...this.props.location,
    //   search: '',
    // });
    this.props.location.search = '';
  };

  apiFindFilm = value => {
    api
      .findFilm(value)
      .then(
        answer =>
          this.setState({
            foundedFilms: [...answer],
          }),
        this.pushHistory(),
      )
      .catch(error => console.log(error));
  };

  findFilm = e => {
    e.preventDefault();
    this.apiFindFilm(this.state.inputValue);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.findFilm}>
          <input type="input" onChange={this.changeStateValue}></input>
        </form>
        {this.props.location.search === '' ? (
          <div>Hello</div>
        ) : (
          <ul>
            {this.state.foundedFilms.map(film => (
              <li key={film.id}>
                <NavLink
                  to={{
                    pathname: `${this.props.match.url}/${film.id}`,
                    state: {
                      from: this.props.location,
                    },
                  }}
                >
                  {film.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <Route
          path={`${this.props.match.path}?query=${this.state.inputValue}`}
        ></Route>
      </div>
    );
  }
}
export default MoviesPage;
