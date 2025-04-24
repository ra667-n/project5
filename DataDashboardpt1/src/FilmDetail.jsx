import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FilmInfo from './FilmInfo';

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    fetch(`https://ghibliapi.vercel.app/films/${id}`)
      .then(res => res.json())
      .then(setFilm);
  }, [id]);

  if (!film) return <div className="loading">Loading...</div>;

  return (
    <div className="detail-view">
      <FilmInfo ghibli={film} detailed={true} />
      <div className="extra-details">
        <p><strong>Director:</strong> {film.director}</p>
        <p><strong>Producer:</strong> {film.producer}</p>
        <p><strong>Release Date:</strong> {film.release_date}</p>
        <p><strong>Running Time:</strong> {film.running_time} mins</p>
        <div className="description">
          <h4>Synopsis</h4>
          <p>{film.description}</p>
        </div>
        <Link to="/" className="back-button">← Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default FilmDetail;
