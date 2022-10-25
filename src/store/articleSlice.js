import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
let token
if (localStorage.getItem('user')) token = JSON.parse(localStorage.getItem('user')).token

export const fetchArticle = createAsyncThunk('article/fetchArticle', async function (page, { rejectWithValue }) {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/?offset=${page || 0}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Server Error!')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchArticlePage = createAsyncThunk(
  'article/fetchArticlePage',
  async function (slug, { rejectWithValue }) {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`)
      if (!response.ok) {
        throw new Error('Server Error!')
      }
      const data = await response.json()
      console.log('fetch !!!!!  ', data)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createNewArticle = (data) => (dispatch) => {
  fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((body) => {
      if (!body.ok) {
        console.log(body.json())
        throw new Error('Server Error!')
      }
      return body.json()
    })
    .then((body) => {
      console.log(body)
      dispatch(toggleArticleStatus())
    })
    .catch(() => dispatch(onErrorCreate()))
}

export const editArticle = (data, slug) => (dispatch) => {
  fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((body) => {
      if (!body.ok) {
        console.log(body.json())
        throw new Error('Server Error!')
      }
      return body.json()
    })
    .then((body) => {
      console.log(body)
      dispatch(toggleArticleStatus())
    })
    .catch(() => dispatch(onErrorCreate()))
}

export const deletedArticle = (slug) => (dispatch) => {
  fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((body) => {
      if (!body.ok) {
        console.log(body.json())
        throw new Error('Server Error!')
      }
      return body.json()
    })
    .then((body) => console.log(body))
    .catch(() => dispatch(onErrorCreate()))
}

export const followArticle = (slug, type) => (dispatch) => {
  fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: type,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((body) => {
      if (!body.ok) {
        console.log(body.json())
        throw new Error('Server Error!')
      }
      return body.json()
    })
    .then((body) => console.log(body))
    .catch(() => dispatch(onErrorCreate()))
}

const artivlrSlice = createSlice({
  name: 'article',
  initialState: {
    article: null,
    err: null,
    status: null,
    articlePage: null,
    errPage: null,
    statusPage: null,
    articleStatus: false,
    totalActicle: 0,
    pageCurrent: 1,
    errorCreate: false,
  },
  reducers: {
    addArticle(state, action) {
      state.article = action.payload.articles
      state.totalActicle = action.payload.articlesCount
      state.isLoading = false
    },
    addArticlePage(state, action) {
      state.targetArticle = action.payload.article
    },
    togglePageCurrent(state, action) {
      state.pageCurrent = action.payload
    },
    onLoading(state) {
      state.isLoading = true
    },
    onError(state, action) {
      state.err = action.payload
    },
    onErrorCreate(state) {
      state.errorCreate = true
    },
    toggleArticleStatus(state) {
      state.articleStatus = !state.articleStatus
    },
  },
  extraReducers: {
    [fetchArticle.pending]: (state) => {
      state.status = 'loading'
      state.articlePage = null
      state.err = ''
      state.article = null
      state.errPage = ''
      state.statusPage = null
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.article = action.payload.articles
      state.totalActicle = action.payload.articlesCount
      state.status = 'fulfilled'
    },
    [fetchArticle.rejected]: (state, action) => {
      state.status = 'rejected'
      state.err = action.payload
    },
    [fetchArticlePage.pending]: (state) => {
      state.statusPage = 'loading'
      state.errPage = null
    },
    [fetchArticlePage.fulfilled]: (state, action) => {
      state.articlePage = action.payload.article
      state.statusPage = 'fulfilled'
    },
    [fetchArticlePage.rejected]: (state, action) => {
      state.statusPage = 'rejected'
      state.errPage = action.payload
    },
  },
})

export default artivlrSlice.reducer

export const { addArticle, onError, addArticlePage, onLoading, onErrorCreate, toggleArticleStatus, togglePageCurrent } =
  artivlrSlice.actions
