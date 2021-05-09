import { Component } from 'react';
import Api from '../Api';

const api = new Api();

class Reviews extends Component {
  state = {
    reviews: [],
    noReview: null,
  };

  componentDidMount() {
    this.getReviews();
  }

  getReviews = () => {
    const id = this.props.match.params.movieId;
    api
      .getReviews(id)
      .then(answer =>
        answer.data.total_results === 0
          ? this.setState({
              noReview: 'There is no review',
            })
          : this.setState({
              reviews: [...answer.data.results],
            }),
      )
      .catch(error => console.log(error));
  };

  render() {
    // console.log(this.state);
    return (
      <div>
        <ul>
          {this.state.noReview ? (
            <p>{this.state.noReview}</p>
          ) : (
            this.state.reviews.map(review => (
              <li key={review.author}>
                {review.author}: <p>{review.content}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}
export default Reviews;
