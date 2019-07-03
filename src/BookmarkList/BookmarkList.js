import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import './BookmarkList.css';
import config from '../config.js';

class BookmarkList extends Component {
  static defaultProps = {
    bookmarks: []
  };

  handleEditDelete = (id,method) => {
    fetch(`${config.API_ENDPOINT}/${id}`, {
      method,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then( res => {
      if(!res.ok) throw new Error(res.status)
      this.props.updateBookmarks(id);
    })
  }

  render() {
    const { bookmarks } = this.props
    return (
      <section className='BookmarkList'>
        <h2>Your bookmarks</h2>
        <ul className='BookmarkList__list' aria-live='polite'>
          {bookmarks.map(bookmark =>
            <BookmarkItem
              key={bookmark.id}
              handleEditDelete={this.handleEditDelete}
              {...bookmark}
            />
          )}
        </ul>
      </section>
    );
  }
}

export default BookmarkList;
