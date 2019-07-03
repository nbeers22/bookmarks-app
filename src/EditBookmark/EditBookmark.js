import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import config from '../config';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      title: '',
      url: '',
      description: '',
      rating: null
    }
  }

  componentDidMount(){
    const bookmarkId = this.props.match.params.id;

    // get data from current bookmarkId to
    // populate form fields
    fetch(`${config.API_ENDPOINT}/${bookmarkId}`,{
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
      if(!res.ok)
        throw new Error(res.status)
      return res.json();
    })
    .then(data => {
      this.setState({
        title: data.title,
        url: data.url,
        description: data.description,
        rating: data.rating
      });
    });
  }

  onClickSave = event => {

  }

  render() {
    const { error, title, rating, url, description } = this.state

    return (
      <section className="EditBookmark">
        <h2>Edit bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              value={url}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              value={rating}
              min='1'
              max='5'
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={() => this.props.history.push('/')}>
              Cancel
            </button>
            {' '}
            <button type='submit' onclick={this.onClickSave}>
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(EditBookmark);