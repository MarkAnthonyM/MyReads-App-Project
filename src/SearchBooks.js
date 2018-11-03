import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    searchBooks: [],
    query: ''
  }

  //This method sets query state based on user-search input, and makes a call back to searchDatabase method.
  updateQuery(query) {
    this.setState({ query: query }, this.searchDatabase)
  }

  //This method matches shelf state of backend database with books currently on front-end shelf
  updateShelfState(booksDatabase) {
    booksDatabase.forEach(book => {
      this.props.books.forEach(shelfBook => {
        if (shelfBook.id === book.id) {
          book.shelf = shelfBook.shelf
        }
      })
    })
  }

  //This method searches book backend using query state, updates backend response if required, and sets searchBooks state.
  searchDatabase() {
    if (this.state.query) {
      BooksAPI.search(this.state.query.trim()).then((books) => {
        if (books === undefined || books.error) {
          this.setState({ searchBooks: [] })
        } else {
          this.updateShelfState(books)
          this.setState({ searchBooks: books })
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      return this.setState({ searchBooks: [] })
    }
  }

  render() {
    const { query, searchBooks } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className='books-grid'>
            {searchBooks.map((book) => (
              <li key={book.id}>
                <div className='book'>
                  <div className='book-top'>
                    <div
                      className='book-cover'
                      style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks && book.imageLinks.thumbnail) || ''})`}}>
                    </div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf || 'none'} onChange={(event) => this.props.updateBook(book, event.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors || 'Author Not Found'}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
