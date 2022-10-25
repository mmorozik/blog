import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { deletedArticle, fetchArticlePage } from '../../store/articleSlice'
import Article from '../Article'
import deleteIcon from '../img/delete-icon.svg'

import './ArticlePage.scss'

const ArticlePage = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticlePage(props.slug))
  }, [])
  const { articlePage, statusPage, errPage } = useSelector((state) => state.article)
  const { user } = useSelector((state) => state.user)
  const [deleteState, setDeleteState] = useState(false)
  const toggleDeleted = () => {
    setDeleteState((state) => !state)
  }
  const classDelete = deleteState ? 'article-page__delete' : 'article-page__delete hidden'
  const onDeleted = (slug) => {
    dispatch(deletedArticle(slug))
  }
  const edit =
    user?.username === articlePage?.author?.username ? (
      <div className="article-page__edit">
        <button className="btn btn-delete" onClick={toggleDeleted}>
          Delete
        </button>
        <Link to={`/articles/${articlePage?.slug}/edit`} className="btn btn-edit">
          Edit
        </Link>
        <div className={classDelete}>
          <div className="article-page__delete-message">
            <img className="article-page__delete-img" src={deleteIcon} />
            <span className="article-page__delete-title">Are you sure to delete this article?</span>
          </div>
          <div className="article-page__delete-btn">
            <button className="article-page__btn article-page__btn-no" onClick={toggleDeleted}>
              No
            </button>
            <Link
              className="article-page__btn article-page__btn-yes"
              to="/"
              onClick={() => onDeleted(articlePage.slug)}
            >
              Yes
            </Link>
          </div>
        </div>
      </div>
    ) : null
  return (
    <div className="article-page">
      {statusPage === 'loading' && <h1>Loading...</h1>}
      {errPage && <h1>Error: {errPage}</h1>}
      {statusPage === 'fulfilled' && (
        <>
          <Article articleData={articlePage} />
          {edit}
          <div className="article-page__body">
            <ReactMarkdown>{articlePage?.body}</ReactMarkdown>
          </div>
        </>
      )}
    </div>
  )
}

export default ArticlePage
