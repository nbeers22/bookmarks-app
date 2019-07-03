import React, { Component } from 'react';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    page: 'list',
    bookmarks: [],
    error: null,
  };

  changePage = (page) => {
    this.setState({ page })
  }

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
      page: 'list',
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }
  
  updateBookmarks = bookmarkId => {
    const bookmarks = this.state.bookmarks.filter( bookmark => (
      bookmark.id !== bookmarkId
    ));
    this.setState({
      bookmarks
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(this.setBookmarks)
    .catch(error => this.setState({ error }))
  }

  render() {
    const { page, bookmarks } = this.state
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav clickPage={this.changePage} />
        <div className='content' aria-live='polite'>
          {page === 'add' && (
            <AddBookmark
              onAddBookmark={this.addBookmark}
              onClickCancel={() => this.changePage('list')}
            />
          )}
          {page === 'list' && (
            <BookmarkList
              bookmarks={bookmarks}
              updateBookmarks={this.updateBookmarks}
            />
          )}
        </div>
      </main>
    );
  }
}

export default App;
