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
    filmData: '',
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
          filmData: answer.data,
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
    // console.log(this.state);

    const {
      poster_path,
      title,
      release_date,
      vote_average,
      overview,
      genres,
    } = this.state.filmData;
    
    const voteAverage = Number(vote_average) * 10;
    return (
      <>
        <div>
          <button type="button" onClick={this.goBack}>
            Go back
          </button>
          <ul>
            <img
              src={`https://image.tmdb.org/t/p/original${poster_path}`}
              alt={title}
            ></img>
            <li>
              <h3>
                {title}
                {`(${release_date})`}
              </h3>
              <p>User Score: {voteAverage}%</p>
              <h3>Overview:</h3> <p>{overview}</p>
            </li>
          </ul>
          <ul>
            <h3>Genres:</h3>
            {genres ? (
              genres.map(genre => <li key={genre.name}>{genre.name}</li>)
            ) : (
              <p>There is no genres</p>
            )}
          </ul>
          <h2 className="additionalInfoTitle">Additional info</h2>
          <div className="additionalInfo">
            <NavLink
              to={`${this.props.match.url}${routes.cast}`}
              className="additionalInfoNavink"
            >
              Cast
            </NavLink>
            <NavLink
              to={`${this.props.match.url}${routes.reviews}`}
              className="additionalInfoNavink"
            >
              Reviews
            </NavLink>
          </div>
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
