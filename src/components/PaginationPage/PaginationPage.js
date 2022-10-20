import { Pagination } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticle } from '../../store/articleSlice'

import './PaginationPage.scss'

const PaginationPage = () => {
  const dispatch = useDispatch()
  const total = useSelector((state) => state.article.totalActicle)
  const [current, setCurrent] = useState(1)
  const onChange = (page) => {
    setCurrent(page)
    const mathPage = (page - 1) * 20
    dispatch(fetchArticle(mathPage))
  }
  return (
    <Pagination
      className="pagination"
      current={current}
      onChange={onChange}
      total={total}
      showSizeChanger={false}
      defaultPageSize={20}
    />
  )
}
export default PaginationPage
