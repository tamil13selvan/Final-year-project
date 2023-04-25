import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './userList.css';

function UserList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1234/getAllUser', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userData');
        setData(data.data);
      });
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center'  }}>
      <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }}>
          <tr>
            <th scope="col" style={{ padding: '10px', border: '1px solid black' }}>Full name</th>
            <th scope="col" style={{ padding: '10px', border: '1px solid black' }}>User name</th>
            <th scope="col" style={{ padding: '10px', border: '1px solid black' }}>Phone</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'white'}}>
          {data.map((user) => (
            <tr key={user._id} style={{ border: '1px solid black' }}>
              <td style={{ padding: '10px', border: '1px solid black' }}>{user.fullname}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>{user.username}</td>
              <td style={{ padding: '10px', border: '1px solid black' }}>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
