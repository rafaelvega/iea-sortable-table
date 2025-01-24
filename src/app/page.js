"use client";

import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);




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
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row['country']}</td>
              <td>{row['region']}</td>
              <td>{row['Total energy supply']}</td>
              <td>{row['IEA member']?"Yes":"No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
