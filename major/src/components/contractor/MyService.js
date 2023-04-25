import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const MyService = () => {

  const username = Cookies.get('username');

  const [data, setData] = useState([]); 
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1234/myservices/${username}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data || []);
      });
  }, [username]);

  return (
    <div className="row">
      {data.map((service) => {
        if (service.provider === username) {
          return (
            <Card key={service._id} style={{ width: "100%", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", marginBottom: "20px" }}>
               <Card.Body>
                    
                  <div>
                    <Card.Text style={{ fontWeight: "bold" }}>Service Id:</Card.Text>
                    <Card.Text>{service.title}</Card.Text>
                  </div>
              </Card.Body>
            </Card>
          );
        }
      })}
    </div>
  );
}

export default MyService;
