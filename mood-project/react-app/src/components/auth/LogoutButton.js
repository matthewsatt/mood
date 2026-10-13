import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { usePlayer } from '../../context/Player';
import { Icon } from '../ui';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const { stop } = usePlayer()

  const onLogout = async () => {
    stop();
    await dispatch(logout());
  };

  return (
    <button className='btn btn--ghost' onClick={onLogout}>
      <Icon name='logout' size={16} />
      <span>Log out</span>
    </button>
  );
};

export default LogoutButton;
