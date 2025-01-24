"use client";

import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState('Total energy supply');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((json) => {
        sortData(sortField,json);
      });
  }, []);

  const getAndUpdateSortField = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
    return direction;
  };

  const sortData = (field, dataToSort = data) => {
    const direction = getAndUpdateSortField(field);
    const sortedData = [...dataToSort].sort((a, b) => {
      if (field === 'Total energy supply') {
        return direction === 'asc' ? a[field] - b[field] : b[field] - a[field];
      } else {
        return direction === 'asc'
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });
    setData(sortedData);
  };

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
            <th onClick={() => sortData('country')}>Country</th>
            <th onClick={() => sortData('region')}>Region</th>
            <th onClick={() => sortData('Total energy supply')}>Total Energy Supply</th>
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