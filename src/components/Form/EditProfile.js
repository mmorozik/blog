import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { editUser } from '../../store/userSlice'
import './Form.scss'

const EditProfile = () => {
  const user = useSelector((state) => state.user.user)
  if (!user) return <Redirect to="/" />
  const dispatch = useDispatch()
  const { editError } = useSelector((state) => state.user)
  const { username, email } = user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })
  const onSubmit = (data) => {
    console.log('onSub', data)
    dispatch(editUser(data, user.token))
  }
  return (
    <div className="form">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="form__label-title">Username</span>
          <input
            className={errors?.username || editError?.username ? 'form__input-error' : ''}
            placeholder="Username"
            defaultValue={username}
            {...register('username')}
          />
          {editError?.username ? (
            <span className="form__error">Данное имя уже используется</span>
          ) : (
            errors?.username && <span className="form__error">{errors?.username?.message || 'Ошибка'}</span>
          )}
        </label>
        <label>
          <span className="form__label-title">Email address</span>
          <input
            type="email"
            className={editError?.email || errors?.email ? 'form__input-error' : ''}
            placeholder="Email address"
            defaultValue={email}
            {...register('email', {
              pattern: {
                value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/i,
                message: 'Некорректный email',
              },
            })}
          />
          {editError?.email ? (
            <span className="form__error">Данный email уже используется</span>
          ) : (
            errors?.email && <span className="form__error">{errors?.email?.message || 'Ошибка'}</span>
          )}
        </label>
        <label>
          <span className="form__label-title">Password</span>
          <input
            type="password"
            className={errors?.password ? 'form__input-error' : ''}
            placeholder="Password"
            {...register('password', {
              minLength: {
                value: 8,
                message: 'Длина пароля не менее 8 символов',
              },
            })}
          />
          {errors?.password && <span className="form__error">{errors?.password?.message || 'Ошибка'}</span>}
        </label>
        <label>
          <span className="form__label-title">Avatar image (url)</span>
          <input
            className={errors?.image ? 'form__input-error' : ''}
            placeholder="Email address"
            {...register('image', {
              pattern: {
                value: /([A-z0-9_.-]{1,}).([A-z]{2,8})/i,
                message: 'Некорректная ссылка',
              },
            })}
          />
          {errors?.image && <span className="form__error">{errors?.image?.message || 'Ошибка'}</span>}
        </label>
        <input className="form__submit" type="submit" value="Save" />
      </form>
    </div>
  )
}

export default EditProfile
