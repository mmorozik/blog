import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ArticleList from '../ArticleList/ArticleList'
import ArticlePage from '../ArticlePage/ArticlePage'
import CreateAccount from '../Form/CreateAccount'
import Authorization from '../Form/Authorization'
import EditProfile from '../Form/EditProfile'
import Header from '../Header/Header'
import CreateArticle from '../Form/CreateArticle'
import EditArticle from '../Form/EditArticle'

import './App.scss'

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Route exact path="/" render={() => <ArticleList />} />
        <Route exact path="/articles/" render={() => <ArticleList />} />
        <Route exact path="/articles/page/:id" render={({ match }) => <ArticleList id={+match.params.id} />} />
        <Route exact path="/articles/:slug/" render={({ match }) => <ArticlePage slug={match.params.slug} />} />
        <Route exact path="/sign-up" render={() => <CreateAccount />} />
        <Route exact path="/sign-in" render={() => <Authorization />} />
        <Route exact path="/profile" render={() => <EditProfile />} />
        <Route exact path="/new-article" render={() => <CreateArticle />} />
        <Route exact path="/articles/:slug/edit" render={({ match }) => <EditArticle slug={match.params.slug} />} />
      </Router>
    </div>
  )
}

export default App
