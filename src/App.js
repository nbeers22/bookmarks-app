import React, { Component } from 'react';
import { withRouter,Route } from 'react-router-dom';

import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import EditBookmark from './EditBookmark/EditBookmark';
import Nav from './Nav/Nav';
import config from './config';

import './App.css';

class App extends Component {
  state = {
    page: 'list',
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }
  
  deleteBookmark = bookmarkId => {
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
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Nav />
        <div className='content' aria-live='polite'>
          <Route
            path='/add-bookmark'
            render={({history}) => {
              console.log(history)
              return (
                <AddBookmark
                  onAddBookmark={this.addBookmark}
                  onClickCancel={() => history.push('/')}
                />
              )
            }}
          />
          <Route
            exact
            path='/'
            render={() => 
              <BookmarkList
                bookmarks={this.state.bookmarks}
                deleteBookmark={this.deleteBookmark}
              />}
          />
          <Route
            path='/edit/:id'
            render={() => 
              <EditBookmark/>
            }
          />

        </div>
      </main>
    );
  }
}

export default withRouter(App);
