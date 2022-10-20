import { createSlice } from '@reduxjs/toolkit'

export const createAccount = (data) => (dispatch) => {
  const { username, email, password } = data
  const user = {
    user: {
      username,
      email,
      password,
    },
  }
  fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  })
    .then((body) => {
      if (!body.ok) {
        body.json().then((err) => dispatch(addErrorMessage(err.errors)))
        throw new Error()
      }
      return body.json()
    })
    .then((body) => {
      // console.log(body)
      dispatch(toggleCreateStatus(body))
      return body
    })
    .catch(() => dispatch(onError()))
}

export const authorization = (data) => (dispatch) => {
  const { email, password } = data
  const user = {
    user: {
      email,
      password,
    },
  }
  fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  })
    .then((body) => {
      if (!body.ok) throw new Error()
      return body.json()
    })
    .then((body) => {
      // console.log(body)
      dispatch(addUser(body.user))
    })
    .catch(() => dispatch(onAuthorizationError()))
}

export const editUser = (data, token) => (dispatch) => {
  console.log(data, token)
  const { username, email, password, image } = data
  const user = {
    user: {
      username,
      email,
      password,
      image,
    },
  }
  fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((body) => {
      if (!body.ok) {
        body.json().then((body) => {
          dispatch(onEditError(body))
          console.log(body)
          throw new Error('Server Error')
        })
      }
      return body.json()
    })
    .then((body) => {
      console.log(body)
      dispatch(addUser(body.user))
    })
    .catch((err) => console.log(err))
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    createStatus: false,
    createError: false,
    createErrorMessage: {},
    createEmail: '',
    authorizationError: false,
    editError: null,
    user: null,
    isAuth: false,
  },
  reducers: {
    toggleCreateStatus(state, action) {
      // console.log('toggleCreateStatus')
      if (action?.payload?.user) state.createEmail = action.payload.user.email
      state.createStatus = !state.createStatus
    },
    onError(state) {
      // console.log('onError')
      state.createError = true
    },
    addErrorMessage(state, action) {
      // console.log(action.payload)
      state.createErrorMessage = action.payload
    },
    onAuthorizationError(state) {
      state.authorizationError = true
    },
    onEditError(state, action) {
      state.editError = action.payload.errors
    },
    addUser(state, action) {
      // console.log('pay', action.payload)
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.user = action.payload
      state.isAuth = true
    },
    deleteUser(state) {
      localStorage.removeItem('user')
      state.user = null
      state.isAuth = false
    },
  },
})

export default userSlice.reducer

export const { toggleCreateStatus, onError, addErrorMessage, onEditError, onAuthorizationError, addUser, deleteUser } =
  userSlice.actions

// Успех {
//     "username": "sdffff43ffffasd",
//     "email": "asfsdsdgasdsdg@mail.ru",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGNhZDc4M2NmNzA1MWIwMDgyYWZjOCIsInVzZXJuYW1lIjoic2RmZmZmNDNmZmZmYXNkIiwiZXhwIjoxNjcxMTUzNTI4LCJpYXQiOjE2NjU5Njk1Mjh9.c5P4exbb80UWZ_pTdLQrabu1MoOCnns6Is6VHGrXd28"
// }
