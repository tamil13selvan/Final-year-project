import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function PendingList() {
    
    const [data,setData] = useState()
    
   useEffect(() => {
    fetch("http://localhost:1234/pendingProviders", {
      method:"GET",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setData(data.data);
    })
   },[])

   const handleAccept = (id) => {

    fetch(`http://localhost:1234/acceptProvider/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then(() => {
        fetch("http://localhost:1234/pendingProviders",{
          method:"GET",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data.data);
        });
      });
  };

  const handleReject = (id) => {
    fetch(`http://localhost:1234/rejectProvider/${id}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then(() => {
        fetch("http://localhost:1234/rejectProvider", {
          method:"GET",
        })
       .then((res) => res.json())
      .then((data) => {
        console.log(data, "providerData");
        // Refresh data after reject
        setData(data.data);
      });
    });
  };



  return (
    <table class="table" style={{backgroundColor:'white',marginLeft:'70px', width:'80%',position:'relative'}}>
    <thead>
      <tr>
        <th scope="col">User name</th>
        <th scope="col">User contact</th>
        <th scope="col">Company name</th>
        <th scope="col">company Address</th>
        <th scope="col">company contact</th>
        <th scope="col">Service type</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
    
    {/* {data?.map (i => { */}
  { data && data.map(function (i) {

              return(
                <tr>
                  <td>{i.username}</td>
                  <td>{i.phone}</td>
                  <td>{i.cname}</td>
                  <td>{i.cadddress}</td>
                  <td>{i.ccontact}</td>
                  <td>{i.servicetype}</td>
                  <td> <td>
                <button className='mx-1'onClick={() => handleAccept(i.id)}>Accept</button>
                <button onClick={() => handleReject(i.id)}>Reject</button>
              </td></td>
                </tr>
              )
            })}
    </tbody>
  </table>
  
  );
}

export default PendingList;
