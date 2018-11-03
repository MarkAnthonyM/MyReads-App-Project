import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  //This method calls getAll function on backend and populates books state with promise response
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  //This method updates shelf status of books state items and renders new shelf state
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((updatedBook) => {
      book.shelf = shelf
      this.setState((prevState) => ({
        books: prevState.books.filter(stateItem => stateItem.id !== book.id).concat([ book ])
      }))
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <div className='list-books-content'>
              <div>
                <ListBooks
                  updateBook={this.updateBook}
                  books={books.filter(book => book.shelf === 'currentlyReading')}
                  name='Currently Reading'
                />
                <ListBooks
                  updateBook={this.updateBook}
                  books={books.filter(book => book.shelf === 'wantToRead')}
                  name='Wanting to Read'
                />
                <ListBooks
                  updateBook={this.updateBook}
                  books={books.filter(book => book.shelf === 'read')}
                  name='Read'
                />
              </div>
            </div>
            <div className="open-search">
              <Link
              to='/search'
              >Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks
            updateBook={this.updateBook}
            books={books}
            name='Search'
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
