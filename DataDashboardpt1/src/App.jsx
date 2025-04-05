import './Ghibli'
import React, { useState, useEffect } from 'react'; 
import './App.css';
import FilmInfo from './FilmInfo';

const Ghibli = () => {
  const [film, setFilm] = useState(null); 
  const [allFilms, setAllFilms] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [totalFilms, setTotalFilms] = useState(0)
  const searchItems = searchValue => {
    setSearchInput(searchValue);
  }

  
  useEffect(() => {
    const fetchAllFilms = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        const films = await response.json();
        console.log(films)
        setAllFilms(films); 
        setTotalFilms(films.length)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };    

    fetchAllFilms();
  }, []); 

  useEffect(() => {
    setFilteredResults(allFilms)
  }, [allFilms])

  const handleClick = () => {
    console.log(searchInput)
    if (searchInput === "") {
      setFilteredResults(allFilms)
      return 
    }
    const filterTitle = allFilms.filter((film) => film.title === searchInput)
    setFilteredResults(filterTitle)
  }
  
  return (

    <div className = "whole-page" style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", flexDirection: "column", width: "90vw"}}>
      <h1>Studio Ghibli Films</h1>

      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#333333", padding: "20px"}}>
        <h1>{totalFilms}</h1>
        <h2>Total Ghibli Films</h2>
      </div>

      <div style={{width: "100%", backgroundColor: "#333333", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", flexDirection: "column" }}>
        <h1>Movie Dashboard</h1>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "5px"}}>

          <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
          />
          <button onClick = {handleClick}>Submit</button>
        </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", flexDirection: "column"}}>
            {allFilms && filteredResults?.map((Ghibli) => (
              <FilmInfo ghibli={Ghibli} />
                ) 
            )}
        </div>
      </div>
    </div>
  )
  

  }
  
  export default Ghibli;
  

      


  