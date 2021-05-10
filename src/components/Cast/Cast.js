import { Component } from 'react';
import Api from '../Api';

const api = new Api();

class Cast extends Component {
  state = {
    cast: [],
  };

  componentDidMount() {
    this.getCast();
  }

  getCast = () => {
    const id = this.props.match.params.movieId;
    api
      .getCastData(id)
      .then(answer =>
        this.setState({
          cast: [...answer.data.cast],
        }),
      )
      .catch(error => console.log(error));
  };

  render() {
    // console.log(this.state.cast);
    return (
      <div>
        <ul>
          {this.state.cast.map(actor => (
            <li key={actor.name}>
              <p>Actor name: {actor.name}</p>
              <p>Character of: {actor.character}</p>
              <img
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt={actor.name}
              ></img>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Cast;
