import React, { useEffect, useState } from "react";


const FilmInfo = ({ ghibli }) => {
    const [release_date, setRelease_date] = useState("");
    const [rt_score, setRt_score] = useState("");
    const [producer, setProducer] = useState("");
    const [title, setTitle] = useState("");
    useEffect(() => {
      setRelease_date(ghibli.release_date)
      setRt_score(ghibli.rt_score)
      setProducer(ghibli.producer)
      setTitle(ghibli.title)
    }, [ghibli]);

    return (
      <>
        <div style={{ display: "flex", gap: "10px"}} >
          <p>{title}</p>
          <p>{release_date}</p>
          <p>{producer}</p>
          <p>{rt_score}</p>
        </div>
      </>
    )
}
  
  export default FilmInfo;
  