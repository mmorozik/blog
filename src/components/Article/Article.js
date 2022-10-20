import React, { useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import unlike from '../img/unlike.svg'
import like from '../img/like.svg'
import './Article.scss'
import { followArticle } from '../../store/articleSlice'

const Article = (props) => {
  const dispatch = useDispatch()
  const { title, favoritesCount, tagList, slug, author, createdAt, description, favorited } = props.articleData
  let [count, setCount] = useState(favoritesCount)
  const [liked, setLiked] = useState(favorited)
  const titleLengthFix = () => {
    if (title.length > 40) return title.slice(0, title.slice(0, 40).lastIndexOf(' ')) + '...'
    return title
  }
  const descriptionLengthFix = () => {
    if (description.length > 340) return description.slice(0, description.slice(0, 340).lastIndexOf(' ')) + '...'
    return description
  }
  const tag = tagList.map((el) => {
    if (el === '') return
    return (
      <div key={el + slug + Math.random()}>
        <span>{el}</span>
      </div>
    )
  })
  const toggleLike = (slug, type) => {
    dispatch(followArticle(slug, type))
    if (liked) {
      setCount((state) => state - 1)
    } else {
      setCount((state) => state + 1)
    }
    setLiked((state) => !state)
  }
  const date = format(new Date(createdAt), 'MMMM d, yyyy')
  const heart = liked ? (
    <img src={like} className="article__like" onClick={() => toggleLike(slug, 'DELETE')} />
  ) : (
    <img src={unlike} className="article__like" onClick={() => toggleLike(slug, 'POST')} />
  )

  return (
    <div className="article">
      <div className="article__header">
        <div>
          <div className="article__info">
            <span className="article__title">
              <Link to={`/articles/${slug}`}>{titleLengthFix()}</Link>
            </span>
            {heart}
            <span className="article__like-count">{count}</span>
          </div>
          <div className="article__tag">{tag}</div>
        </div>
        <div className="article__user">
          <div className="article__user-info">
            <span className="article__user-nickname">{author.username}</span>
            <span className="article__user-date">{date}</span>
          </div>
          <div className="article__user-avatar">
            <img src={author.image} />
          </div>
        </div>
      </div>
      <div className="article__body">
        <span>{descriptionLengthFix()}</span>
      </div>
    </div>
  )
}

export default Article
