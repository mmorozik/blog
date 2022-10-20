import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { editArticle, fetchArticlePage } from '../../store/articleSlice'
import './Form.scss'

const EditArticle = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchArticlePage(props.slug))
  }, [])
  const { articlePage, statusPage, errPage, articleStatus } = useSelector((state) => state.article)
  const [tag, setTag] = useState([...(articlePage?.tagList || [''])])
  console.log(articlePage)
  console.log(statusPage)
  console.log(errPage)
  let key = 1
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })
  const onSubmit = (data) => {
    const { title, description, body } = data
    dispatch(
      editArticle(
        {
          article: {
            title,
            description,
            body,
            tagList: tag,
          },
        },
        articlePage.slug
      )
    )
    dispatch(fetchArticlePage(props.slug))
  }
  const onAddTag = () => {
    setTag((state) => [...state, ''])
  }
  const onDeleteTag = (index) => {
    setTag((state) => [...state.slice(0, index), ...state.splice(index + 1)])
  }
  const onEditTag = (e, index) => {
    const text = e.target.value
    setTag((state) => [...state.slice(0, index), text, ...state.splice(index + 1)])
  }
  const addTag = (
    <button className="btn btn-add" onClick={onAddTag}>
      Add Tag
    </button>
  )
  const tagItem = tag.map((el, index, array) => {
    return (
      <div key={'tagKey' + key} className="edit-form__tag-list">
        <input
          className="edit-form__tag"
          placeholder="Tag"
          value={el}
          {...register(`tag${key++}`)}
          onChange={(e) => onEditTag(e, index)}
        />
        <button className="btn btn-delete" onClick={() => onDeleteTag(index)}>
          Delete
        </button>
        {index === array.length - 1 && addTag}
      </div>
    )
  })
  const tagList = tag.length ? tagItem : addTag
  if (articleStatus) return <Redirect to="/" />
  return (
    <div className="form edit-form">
      <h1>Edit article</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span className="form__label-title">Title</span>
          <input
            className={errors?.title ? 'form__input-error' : ''}
            defaultValue={articlePage?.title}
            placeholder="Title"
            {...register('title', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          {errors?.title && <span className="form__error">{errors?.title?.message || 'Ошибка'}</span>}
        </label>
        <label>
          <span className="form__label-title">Short description</span>
          <input
            className={errors?.description ? 'form__input-error' : ''}
            defaultValue={articlePage?.description}
            placeholder="Short description"
            {...register('description', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          {errors?.description && <span className="form__error">{errors?.description?.message || 'Ошибка'}</span>}
        </label>
        <label>
          <span className="form__label-title">Text</span>
          <textarea
            type="textarea"
            className={errors?.body ? 'form__input-error' : ''}
            defaultValue={articlePage?.body}
            placeholder="Text"
            {...register('body', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          {errors?.body && <span className="form__error">{errors?.body?.message || 'Ошибка'}</span>}
        </label>
        <label>
          <span className="form__label-title">Text</span>
          {tagList}
        </label>
        <input className="form__submit edit-form__submit" type="submit" value="Send" />
      </form>
    </div>
  )
}

export default EditArticle
