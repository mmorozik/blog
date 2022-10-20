import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createAccount } from '../../store/userSlice'
import './Form.scss'

const CreateAccount = () => {
  const { createErrorMessage, createStatus } = useSelector((state) => state.user)
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })
  const onSubmit = (data) => {
    dispatch(createAccount(data))
  }
  if (createStatus || user) return <Redirect to="/sign-in" />
  return (
    <div className="form">
      <h1>Create new account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="form__label-title">Username</span>
          <input
            className={errors?.username || createErrorMessage?.username ? 'form__input-error' : ''}
            placeholder="Username"
            {...register('username', {
              required: 'Поле обязательно для заполнения',
              validate: () => {
                if (createErrorMessage?.username) return 'Имя уже используется'
              },
            })}
          />
          {errors?.username && <span className="form__error">{errors?.username?.message || 'Ошибка'}</span>}
        </label>
        <label>
          <span className="form__label-title">Email address</span>
          <input
            type="email"
            className={errors?.email || createErrorMessage?.email ? 'form__input-error' : ''}
            placeholder="Email address"
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/i,
                message: 'Некорректный email',
              },
              validate: () => {
                if (createErrorMessage?.email) return 'Email уже используется'
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
              minLength: {
                value: 8,
                message: 'Длина пароля не менее 8 символов',
              },
            })}
          />
          {errors?.password && <span className="form__error">{errors?.password?.message || 'Ошибка'}</span>}
        </label>
        <label>
          <span className="form__label-title">Password</span>
          <input
            type="password"
            className={errors?.repassword ? 'form__input-error' : ''}
            placeholder="Password"
            {...register('repassword', {
              required: 'Поле обязательно для заполнения',
              validate: (value) => {
                if (value !== watch('password')) return 'Пароли должны совпадать'
              },
            })}
          />
          {errors?.repassword && <span className="form__error">{errors?.repassword?.message || 'Ошибка'}</span>}
        </label>
        <label className="form__checkbox">
          <input
            type="checkbox"
            className={errors?.agreement ? 'form__checkbox-error' : ''}
            {...register('agreement', { required: 'Поле обязательно для заполнения' })}
          />
          <span>I agree to the processing of my personal information</span>
        </label>
        <input className="form__submit" type="submit" value="Submit" />
      </form>
      <div className="form__prompt">
        <span>Already have an account? </span>
        <Link to="/sign-in">Sign In.</Link>
      </div>
    </div>
  )
}

export default CreateAccount
