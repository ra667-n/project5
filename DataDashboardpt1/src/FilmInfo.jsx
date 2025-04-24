import React from "react";

const FilmInfo = ({ ghibli, detailed }) => (
  <div className={`film-info${detailed ? ' detailed' : ''}`}>
    <h3>{ghibli.title}</h3>
    <p>Release: {ghibli.release_date}</p>
    <p>Producer: {ghibli.producer}</p>
    <p>Score: {ghibli.rt_score}</p>
    {detailed && (
      <>
        <p>Director: {ghibli.director}</p>
        <p>Running Time: {ghibli.running_time} min</p>
        <p>Description: {ghibli.description}</p>
      </>
    )}
  </div>
);

export default FilmInfo;
