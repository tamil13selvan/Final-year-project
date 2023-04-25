import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams, useLocation } from 'react-router-dom';
import BookingForm from './BookingForm';
import Cookies from 'js-cookie';
import Payment from './Payment';

const PreviousHistory = () => {

  const cusername = Cookies.get('cusername');
  
  
  const [data, setData] = useState([]); 

  
  useEffect(() => {
    fetch(`http://localhost:1234/${cusername}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data || []);
      });
  }, []);
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "60%" }}>
        {data.map((booking) => (
          cusername === booking.cusername && (
            <Card key={booking._id} style={{ width: "100%", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", marginBottom: "20px" }}>
              <Card.Body>
                <Card.Title style={{ marginBottom: "10px", borderBottom: "1px solid #e2e2e2", paddingBottom: "10px" }}>Previous Booking</Card.Title>
  
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Card.Text style={{ fontWeight: "bold" }}>Service Id:</Card.Text>
                    <Card.Text>{booking.service}</Card.Text>
                  </div>
                  <div>
                    <Card.Text style={{ fontWeight: "bold" }}>Booked on:</Card.Text>
                    <Card.Text>{new Date(booking.timestamp).toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short'})}</Card.Text>
                  </div>
                </div>
  
                <Card.Text style={{ marginTop: "10px", fontWeight: "bold" }}>Provider:</Card.Text>
                <Card.Text>{booking.provider}</Card.Text>
  
                <Card.Text style={{ marginTop: "10px", fontWeight: "bold" }}>Service Date:</Card.Text>
                <Card.Text>{new Date(booking.date).toLocaleDateString()}</Card.Text>
  
                <Card.Text style={{ marginTop: "10px", fontWeight: "bold" }}>Time:</Card.Text>
                <Card.Text>{booking.time}</Card.Text>
  
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <div>
                    <Card.Text style={{ fontWeight: "bold" }}>Status:</Card.Text>
                    <Card.Text style={{ color: booking.status === "Confirmed" ? "green" : "red", fontWeight: "bold" }}>{booking.status}</Card.Text>
                  </div>
                </div>
                {booking.status === "accepted" && (
                <> 
                <Card.Text>Amount = Rs. {booking.charges} </Card.Text> 
                </>
                )}
              </Card.Body>
            </Card>
          )
        ))}
      </div>
    </div>
  );
  
}

export default PreviousHistory;

