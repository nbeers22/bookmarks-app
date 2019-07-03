import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';

export default function BookmarkItem(props) {
  const { id, title, url, rating, description } = props;
  return (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'>
            {title}
          </a>
        </h3>
        <Rating value={rating} />
      </div>
      <p className='BookmarkItem__description'>
        {description}
      </p>
      <div className='BookmarkItem__buttons'>
        <button
          className='BookmarkItem__description'
          onClick={() => props.handleDelete(props.id,'DELETE')}
        >
          Delete
        </button>
        <button
          className='BookmarkItem__description'
        >
          <Link to={`edit/${id}`}>Edit</Link>
        </button>
      </div>
    </li>
  )
}

BookmarkItem.defaultProps = {
  handleDelete: () => {},
}
