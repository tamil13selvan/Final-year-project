import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './Booking.css';

function Booking() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:1234/getAllProvider', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'providerData');
        setData(data.data);
      });
  }, []);

  const filteredData = data.filter((provider) => {
    const nameMatch = (provider.cname || '').toLowerCase().includes(search.toLowerCase());
    const servicetypeMatch = filter === 'all' || provider.servicetype === filter;

    return nameMatch && servicetypeMatch;
  });

  return (
    <>
      <div className="filter-container" >
        <div>
          Filter by name:
          <input type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          Filter by type of services:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="cleaning services">Cleaning</option>
            <option value="relocation services">Relocation</option>
            <option value="both services">Both</option>
          </select>
        </div>
      </div>
      <div className="card-container">
        {filteredData.map((provider) => (
          <div className="card" key={provider._id}>
            <div className="card-body">
              <div className="card-title">{provider.cname}</div>
              <div className="card-subtitle">{provider.servicetype}</div>
              <div className="card-text">{provider.description}</div>
              <Link to={`/service/${provider.username}`}>View Services</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Booking;




