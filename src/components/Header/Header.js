import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addUser, deleteUser } from '../../store/userSlice'
import avatar from '../img/avatar.jpg'
import './Header.scss'

const Header = () => {
  const dispatch = useDispatch()
  const { isAuth, user } = useSelector((state) => state.user)
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'))
    if (!u) return
    if (!user) dispatch(addUser(u))
  }, [])
  const logOut = () => {
    dispatch(deleteUser())
  }
  const account =
    user || isAuth ? (
      <div className="header__button">
        <Link to="/new-article" className="link-green">
          Create article
        </Link>
        <Link to="/profile">
          <span className="header__username">{user.username}</span>
          {user.image ? (
            <img className="header__avatar" src={user.image} />
          ) : (
            <img className="header__avatar" src={avatar} />
          )}
        </Link>
        <Link to="/" className="link-border" onClick={logOut}>
          Log Out
        </Link>
      </div>
    ) : (
      <div className="header__button">
        <Link to="/sign-in" className="link">
          Sign In
        </Link>
        <Link to="/sign-up" className="link-green">
          Sign Up
        </Link>
      </div>
    )
  return (
    <div className="header">
      <Link className="link" to={'/articles'}>
        <span>Realworld Blog</span>
      </Link>
      {account}
    </div>
  )
}

export default Header
