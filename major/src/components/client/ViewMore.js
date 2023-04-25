import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams, useLocation } from 'react-router-dom';
import BookingForm from './BookingForm';

const Viewmore = () => {

  const { username } = useParams();
  
  const location = useLocation();  
  const serviceType = location.state ? location.state.serviceType : ''; 
  // console.log(serviceType);
  const [data, setData] = useState([]); 
  useEffect(() => {
   
    fetch(`http://localhost:1234/view/${username}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data, 'serviceData');
        setData(data.data || []);
        
      });
  }, );
  

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "60%" }}>
          {data.map(service => (
            <div key={service._id} style={{ marginBottom: "20px" }}>
              <Card style={{ width: "100%", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                <Card.Header as="h5">Title: {service.title}</Card.Header>
                <Card.Body>
                  <Card.Text>Description: {service.description}</Card.Text>
                  <Card.Text>Service Type: {service.type}</Card.Text>
                  <Card.Text>Operating Areas: {service.operatingArea}</Card.Text>
                  <Card.Text>Availability: {service.availability}</Card.Text>
                  <Card.Text>Working Hours: {service.startTime} to {service.endTime}</Card.Text>

                  {/* <Card.Text>
                    {service.pricing &&
                      typeof service.pricing === 'object'
                      ? `${service.pricing.amount} ${service.pricing.currency}`
                      : service.pricing}
                  </Card.Text>
                  <Card.Text>
                    {service.duration &&
                      typeof service.duration === 'object'
                      ? `${service.duration.hours} hours ${service.duration.minutes} minutes`
                      : service.duration}
                  </Card.Text> */}
                  <Card.Text>Requirements: {service.requirements}</Card.Text>
                  
                  {/* <Link to={`/BookingForm?serviceType=${service.type}&serviceId=${service._id}`}>
                   Book Now
                  </Link> */}
                  <Link to={`/BookingForm?serviceType=${service.type}&serviceId=${service._id}&provider=${service.username}`}>
                     Book Now
                  </Link>



                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Viewmore;
