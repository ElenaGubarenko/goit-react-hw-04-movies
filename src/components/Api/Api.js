import axios from 'axios';
import { Component } from 'react';

//https://api.themoviedb.org/3/movie/550?api_key=3a340623e63e67af3a950ef535fe576d

class Api extends Component {
  getAllFilms = () => {
    return axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=3a340623e63e67af3a950ef535fe576d`,
      )
      .then(answer => answer.data.results);
  };

  getSelectedFilm = id => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=3a340623e63e67af3a950ef535fe576d`,
      )
      .then(answer => answer);
  };

  getCastData = id => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3a340623e63e67af3a950ef535fe576d`,
      )
      .then(answer => answer);
  };

  getReviews = id => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=3a340623e63e67af3a950ef535fe576d`,
      )
      .then(answer => answer);
  };

  findFilm = query => {
    return axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=3a340623e63e67af3a950ef535fe576d&language=en-US&query=${query}`,
      )
      .then(answer => answer);
  };
}

export default Api;
