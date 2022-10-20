import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Form.scss'
import { authorization } from '../../store/userSlice'

const Authorization = () => {
  const dispatch = useDispatch()
  const { createEmail, isAuth } = useSelector((state) => state.user)
  const user = JSON.parse(localStorage.getItem('user'))
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })
  const onSubmit = (data) => {
    dispatch(authorization(data))
  }
  if (user || isAuth) return <Redirect to="/articles" />
  return (
    <div className="form">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="form__label-title">Email address</span>
          <input
            type="email"
            defaultValue={createEmail}
            className={errors?.email ? 'form__input-error' : ''}
            placeholder="Email address"
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/i,
                message: 'Некорректный email',
              },
            })}
          />
          {errors?.email && <span className="form__error">{errors?.email?.message || 'Ошибка'}</span>}
        </label>
        <label>
          <span className="form__label-title">Password</span>
          <input
            type="password"
            className={errors?.password ? 'form__input-error' : ''}
            placeholder="Password"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          {errors?.password && <span className="form__error">{errors?.password?.message || 'Ошибка'}</span>}
        </label>
        <input className="form__submit" type="submit" value="Login" />
      </form>
      <div className="form__prompt">
        <span>Don’t have an account? </span>
        <Link to="/sign-up">Sign Up.</Link>
      </div>
    </div>
  )
}

export default Authorization
