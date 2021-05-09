import { Component } from 'react';
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
    if (query !== '') {
      api.findFilm('query').then(answer => console.log(answer));
    } else {
      console.log('more text');
    }
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <input
          value={this.state.inputValue}
          type="input"
          onChange={this.changeStateValue}
        ></input>
        <button onClick={this.findFilm(this.state.inputValue)} type="button">
          Search
        </button>
      </div>
    );
  }
}
export default MoviesPage;
