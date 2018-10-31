import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from "./SearchBook.js"
import Main from "./Main.js"
import { Route } from "react-router-dom"


class BooksApp extends React.Component {
  state = {
    books: []
  }


  componentDidMount(){
      BooksAPI.getAll().then((books) => {
        this.setState({books: books})
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)

    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
  })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Main
            books={this.state.books}
            moveBook={this.moveBook}
          />
        )}/>
        <Route path="/search" render={() =>(
          <SearchBook
            moveBook = {this.moveBook}
            shelfCheck = {this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
