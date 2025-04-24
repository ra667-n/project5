import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import FilmInfo from './FilmInfo';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const Ghibli = () => {
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchFilms = async () => {
      const response = await fetch('https://ghibliapi.vercel.app/films');
      const data = await response.json();
      setFilms(data);
    };
    fetchFilms();
  }, []);

  const filtered = films.filter(film => 
    film.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === 'all' || film.director === filterType)
  );


  const totalFilms = films.length;
  const avgScore = films.reduce((acc, film) => acc + Number(film.rt_score), 0) / totalFilms || 0;
  const directors = [...new Set(films.map(film => film.director))];

  const directorData = Object.entries(
    films.reduce((acc, film) => {
      acc[film.director] = (acc[film.director] || 0) + 1;
      return acc;
    }, {})
  ).map(([director, count]) => ({ director, count }));

  const scoreData = films.map(film => ({
    title: film.title,
    score: Number(film.rt_score),
    year: film.release_date
  }));


  const filteredFilms = films.filter(film => {
    const matchesSearch = film.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === 'all' || film.director === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard">
      
      <div style={{display: "flex", gap: "20px", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{backgroundColor: "#E0C5C4", borderRadius: "15px", padding: "20px", width: "150px"}}>
          <h3>Total Films</h3>
          <p>{totalFilms}</p>
        </div>
        <div style={{backgroundColor: "#E0C5C4", borderRadius: "15px", padding: "20px", width: "150px"}}>
          <h3>Avg. Score</h3>
          <p>{avgScore.toFixed(1)}</p>
        </div>
        <div style={{backgroundColor: "#E0C5C4", borderRadius: "15px", padding: "20px", width: "150px"}}>
          <h3>Directors</h3>
          <p>{directors.length}</p>
        </div>
      </div>

   
      <div className="charts-container">
        <div className="chart">
          <h4>Rotten Tomatoes Scores</h4>
          <BarChart width={500} height={300} data={scoreData}>
            <XAxis dataKey="title" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </div>
        
        <div className="chart">
          <h4>Films per Director</h4>
          <PieChart width={400} height={300}>
            <Pie
              data={directorData}
              dataKey="count"
              nameKey="director"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {directorData.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      
      <div className="controls">
        <input
          type="text"
          placeholder="Search films..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        
        <select onChange={e => setFilterType(e.target.value)}>
          <option value="all">All Directors</option>
          {directors.map(director => (
            <option key={director} value={director}>{director}</option>
          ))}
        </select>
      </div>

      <div className="film-grid">
        {filteredFilms.map(film => (
          <Link key={film.id} to={`/films/${film.id}`} className="film-card">
            <FilmInfo ghibli={film} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ghibli;
