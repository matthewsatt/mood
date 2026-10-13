import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import HomePage from './components/HomePage'
import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Songs from './components/Songs'
import MoodLists from './components/moodlists'
import OneSong from './components/OneSong';
import NotFound from './components/NotFound';
import PlayerBar from './components/PlayerBar';
import { usePlayer } from './context/Player';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { current } = usePlayer();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className={`app ${current ? 'app--with-player' : ''}`}>
        <NavBar />
        <Switch>

          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>

          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>

          <ProtectedRoute path='/moodlists/:moodId' exact={true} >
            <Songs />
          </ProtectedRoute>

          <ProtectedRoute exact path='/songs/:songId' >
            <OneSong />
          </ProtectedRoute>

          <ProtectedRoute path='/' exact={true} >
            <MoodLists />
          </ProtectedRoute>

          <Route path="/home" >
            <HomePage />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
        <PlayerBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
