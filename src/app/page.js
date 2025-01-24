"use client";

import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState('Total energy supply');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

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
    setCurrentPage(1);
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

  const changePaginationLimit = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1); // Reset to the first page
    }
  };

  return (
    <div className="App container mx-auto">
      <h1 className="text-3xl font-semibold text-gray-900 text-center mt-3 mb-3">Sortable Table</h1>
      <div className="mb-4 justify-end flex">
          <label htmlFor="itemsPerPage" className="mr-2 mt-1">Items per page:</label>
          <input
            type="number"
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={changePaginationLimit}
            className="border border-gray-300  px-2 py-1 w-20"
          />
        </div>
      <table className="table-fixed min-w-full border">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="w-1/4 p-2 text-left cursor-pointer hover:underline" onClick={() => sortData('country')}>
              Country 
              {sortField === 'country' && (sortDirection === 'asc' ? '🔼' : '🔽')}
            </th>
            <th className="w-1/4 p-2 text-left cursor-pointer hover:underline" onClick={() => sortData('region')}>
              Region 
              {sortField === 'region' && (sortDirection === 'asc' ? '🔼' : '🔽')}
            </th>
            <th className="w-1/4 p-2 text-left cursor-pointer hover:underline" onClick={() => sortData('Total energy supply')}>
              Total Energy Supply 
              {sortField === 'Total energy supply' && (sortDirection === 'asc' ? '🔼' : '🔽')}
            </th>
            <th className="w-1/4 p-2 text-left">¿Is a IEA member?</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {paginatedData.map((row, index) => (
            <tr className="border-b border-gray-200 hover:bg-gray-100" key={index}>
              <td className="p-2">{row['country']}</td>
              <td className="p-2">{row['region']}</td>
              <td className="p-2">{row['Total energy supply']}</td>
              <td className="p-2">{row['IEA member']?"Yes":"No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination flex justify-center items-center space-x-2 mt-6 space-y-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={'px-4 py-2 ' + (currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 ')}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;