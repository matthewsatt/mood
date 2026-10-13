import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from '../SearchBar';
import { Wordmark } from '../ui';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <header className='navbar'>
      <div className='container navbar__inner'>
        <Link to={user ? '/' : '/home'} className='navbar__brand' aria-label='mood home'>
          <Wordmark />
        </Link>

        {user && <SearchBar />}

        <nav className='navbar__actions'>
          {user ? (
            <>
              <span className='navbar__user'>
                <span className='navbar__avatar' aria-hidden='true'>
                  {user.username[0].toUpperCase()}
                </span>
                <span className='navbar__username'>{user.username}</span>
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to='/login' className='btn btn--ghost'>Log in</Link>
              <Link to='/sign-up' className='btn btn--primary'>Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
