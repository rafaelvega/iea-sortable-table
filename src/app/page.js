"use client";

import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="App">
      <h1>Sortable Table</h1>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Region</th>
            <th>Total Energy Supply</th>
            <th>¿Is a IEA member?</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              <td>{row['country']}</td>
              <td>{row['region']}</td>
              <td>{row['Total energy supply']}</td>
              <td>{row['IEA member']?"Yes":"No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
