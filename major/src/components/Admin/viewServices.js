import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';


function ViewServices() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1234/getAllServices', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'servicesData');
        setData(data.data);
      });
  }, []);

  return (
    <>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "60%" }}>
        {data.map(service => (
            <Card style={{ 
              width: "100%", 
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              border: "none"
            }}>
              <Card.Header 
                as="h5" 
                style={{
                  backgroundColor: "#f7f7f7",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                  textTransform: "capitalize"
                }}
              >
                {service.title}
              </Card.Header>
              <Card.Body>
                <Card.Text><span style={{fontWeight: "bold"}}>Provider:</span> {service.username}</Card.Text>
                <Card.Text><span style={{fontWeight: "bold"}}>Description:</span> {service.description}</Card.Text>
                <Card.Text><span style={{fontWeight: "bold"}}>Service Type:</span> {service.type}</Card.Text>
                <Card.Text><span style={{fontWeight: "bold"}}>Operating Areas:</span> {service.operatingArea}</Card.Text>
                <Card.Text><span style={{fontWeight: "bold"}}>Availability:</span> {service.availability}</Card.Text>
                <Card.Text><span style={{fontWeight: "bold"}}>Start Time:</span> {service.startTime}</Card.Text>
                <Card.Text><span style={{fontWeight: "bold"}}>End Time:</span> {service.endTime}</Card.Text>
              </Card.Body>
            </Card>
            
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewServices;
