import HomePage from './components/HomePage';
import Header from './components/Header';
import MoviesPage from './components/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={routes.homepage} exact component={HomePage} />
        <Route
          path={routes.movieDetailsPage}
          exact
          component={MovieDetailsPage}
        />
        <Route path={routes.movies} exact component={MoviesPage} />
        {/* <Route component={HomePage} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
