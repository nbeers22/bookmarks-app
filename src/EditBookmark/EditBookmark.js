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
      formData: {
        title: '',
        url: '',
        description: '',
        rating: ''
      }
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
        formData: {
          title: data.title,
          url: data.url,
          description: data.description,
          rating: data.rating
        }
      });
    });
  }

  handleFormChange = event => {
    const { name,value } = event.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const bookmarkId = this.props.match.params.id;
    const { formData } = this.state;
    console.log(formData)

    fetch(`${config.API_ENDPOINT}/${bookmarkId}`,{
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
      body: JSON.stringify( formData )
    })
    .then(res => {
      if(!res.ok)
        throw new Error(res.status)
      this.props.history.push('/')
    })

  }

  render() {
    const { error, title, rating, url, description } = this.state.formData

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
              onChange={this.handleFormChange}
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
              onChange={this.handleFormChange}
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
              onChange={this.handleFormChange}
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
              onChange={this.handleFormChange}
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
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default withRouter(EditBookmark);