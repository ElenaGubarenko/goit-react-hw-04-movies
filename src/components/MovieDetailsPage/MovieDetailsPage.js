import { Component } from 'react';
import { Route } from 'react-router-dom';
import Api from '../Api';
import Cast from '../Cast';
import Reviews from '../Reviews';
import routes from '../../routes';
import { NavLink } from 'react-router-dom';

const api = new Api();

class MovieDetailsPage extends Component {
  state = {
    title: '',
    all: '',
  };

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    api
      .getSelectedFilm(this.props.match.params.movieId)
      .then(answer => {
        this.setState({
          title: answer.data.title,
          all: answer,
        });
      })
      .catch(error => console.log(error));
  };

  goBack = () => {
    const { history, location } = this.props;
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routes.homepage);
  };

  render() {
    const { title } = this.state;
    return (
      <>
        <div>
          <button type="button" onClick={this.goBack}>
            Go back
          </button>
          <ul>
            <li>{title}</li>
          </ul>
          <h2>Additional info</h2>
          <NavLink to={`${this.props.match.url}${routes.cast}`}>Cast</NavLink>
          <NavLink to={`${this.props.match.url}${routes.reviews}`}>
            Reviews
          </NavLink>
        </div>
        <Route
          path={`${this.props.match.path}${routes.cast}`}
          component={Cast}
        />
        <Route
          path={`${this.props.match.path}${routes.reviews}`}
          component={Reviews}
        />
      </>
    );
  }
}
export default MovieDetailsPage;
