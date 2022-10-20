import { configureStore } from '@reduxjs/toolkit'

import articleSlice from './articleSlice'
import userSlice from './userSlice'

export default configureStore({
  reducer: {
    article: articleSlice,
    user: userSlice,
  },
})
