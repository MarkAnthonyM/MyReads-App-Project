import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books, name } = this.props

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{name}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {books.map((book) => (
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
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListBooks
