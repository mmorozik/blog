import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import { withRouter } from 'react-router-dom'

import { fetchArticle, toggleArticleStatus } from '../../store/articleSlice'
import Article from '../Article/'

import './ArticleList.scss'

const ArticleList = ({ match, history }) => {
  const dispatch = useDispatch()
  const { article, status, err, articleStatus, totalActicle } = useSelector((state) => state.article)
  useEffect(() => {
    const mathPage = match.params.id ? (match.params.id - 1) * 20 : 0
    dispatch(fetchArticle(mathPage))
    if (articleStatus) dispatch(toggleArticleStatus())
  }, [])
  const onChange = (page) => {
    const mathPage = page ? (page - 1) * 20 : 0
    dispatch(fetchArticle(mathPage))
    history.push(`/articles/page/${page}`)
  }
  return (
    <div className="article-list">
      {status === 'loading' && <h1>loading</h1>}
      {err && <h1>Error: {err}</h1>}
      {status === 'fulfilled' &&
        article.map((el) => {
          return <Article articleData={el} key={el.slug} />
        })}
      <Pagination
        className="pagination"
        current={+match.params.id || 1}
        onChange={onChange}
        total={totalActicle}
        showSizeChanger={false}
        defaultPageSize={20}
      />
    </div>
  )
}

export default withRouter(ArticleList)
