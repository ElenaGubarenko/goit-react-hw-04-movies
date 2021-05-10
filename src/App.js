import { Suspense, lazy } from 'react';
// import HomePage from './components/HomePage';
import Header from './components/Header';
// import MoviesPage from './components/MoviesPage';
// import MovieDetailsPage from './components/MovieDetailsPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';

const HomePage = lazy(() =>
  import('./components/HomePage' /* webpackChunkName: "HomePage" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
  ),
);
const MoviesPage = lazy(() =>
  import('./components/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <div className="container">
            <Route path={routes.homepage} exact component={HomePage} />
            <Route
              path={routes.movieDetailsPage}
              component={MovieDetailsPage}
            />
            <Route path={routes.movies} exact component={MoviesPage} />
          </div>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
