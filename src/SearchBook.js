import React, { Component } from 'react';
import './App.css'
import Book from "./Book.js"
import * as BooksAPI from './BooksAPI'
import { Link } from "react-router-dom"

/*
*This is the search Page template
*used to search books accordingly
*/

class SearchBook extends Component{
  state = {
    query: "",
    searchResult: []
  }

//update search page with resulting books
  updateQuery = (query) => {
      if(query){
        this.setState({
          query: query
        })
        this.bookSearch(query)
    }
    else{
      this.setState({searchResult: [] })
      this.setState({query: ""})
    }
  }

//book search
  bookSearch = (query) => {
    if(query){
      BooksAPI.search(query).then((searchResult) => {
        //invalid or on available input error handling
        if(searchResult.error){
            this.setState({ searchResult: [] })
        }
        else{
            this.setState({ searchResult: searchResult })
        }
      })
    }
    else{
      this.setState({ searchResult: [] })
    }
  }

  render(){
      return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"
                type="text"
                placeholder="Search By Title or Author"
                value={this.state.query}
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                this.state.searchResult.map(searchResult => {
                  let shelf = "none"
                  this.props.shelfCheck.map(book => (
                    book.id === searchResult.id ?
                    shelf = book.shelf : ""
                  ))
                  return (
                  <li key={searchResult.id}>
                    <Book
                      book={searchResult}
                      moveBook = {this.props.moveBook}
                      inShelf = {shelf}
                    />
                  </li>
                )}
              )
              }
            </ol>
          </div>
        </div>
    )
  }
}

export default SearchBook
