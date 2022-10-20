import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchArticle, toggleArticleStatus } from '../../store/articleSlice'
import Article from '../Article/'
import PaginationPage from '../PaginationPage'

import './ArticleList.scss'

const ArticleList = () => {
  const dispatch = useDispatch()
  const { article, status, err, articleStatus } = useSelector((state) => state.article)
  useEffect(() => {
    dispatch(fetchArticle())
    if (articleStatus) dispatch(toggleArticleStatus())
  }, [])
  return (
    <div className="article-list">
      {status === 'loading' && <h1>loading</h1>}
      {err && <h1>Error: {err}</h1>}
      {status === 'fulfilled' &&
        article.map((el) => {
          return <Article articleData={el} key={el.slug} />
        })}
      <PaginationPage />
    </div>
  )
}

export default ArticleList
