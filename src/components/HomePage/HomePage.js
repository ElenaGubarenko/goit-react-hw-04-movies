import { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Api from '../Api';
import routes from '../../routes';

const api = new Api();

class HomePage extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    api
      .getAllFilms()
      .then(answer => {
        this.setState({
          films: [...answer],
        });
      })
      .catch(error => console.log(console.error()));
  };

  render() {
    // console.log(this.props);
    const { films } = this.state;
    // console.log(this.state);
    return (
      <div>
        <h1>Trending today</h1>
        <ul>
          {films.map(film => (
            <li key={film.id}>
              <NavLink
                to={{
                  pathname: `${routes.movies}${this.props.match.url}${film.id}`,
                  state: {
                    from: this.props.location,
                  },
                }}
              >
                {film.original_title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(HomePage);
