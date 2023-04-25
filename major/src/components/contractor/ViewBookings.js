import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams, useLocation } from 'react-router-dom';

const ViewBookings = () => {

    const username = Cookies.get('username');
    const [status, setStatus] = useState();
    const [bookingCharges, setBookingCharges] = useState()
    const [data, setData] = useState([]); 

    useEffect(() => {
      fetch(`http://localhost:1234/${username}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data || []);
        });
        }, [username]);
  
       
     
        
        const handleAccept = (id) => {
          console.log("We are here")
          const updatedData = data.map((booking) => {
            if (booking._id === id) {
              booking.status = "accepted";
            }
            return booking;
          });
          setData(updatedData);
          fetch(`http://localhost:1234/booking/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "accepted",
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        };
        
        const handleReject = (id) => {
          const updatedData = data.map((booking) => {
            
            if (booking._id === id) {
              booking.status = "rejected";
            }
            return booking;
          });
          setData(updatedData);
          fetch(`http://localhost:1234/booking/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "rejected",
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        };

        const updateCharges=(id)=>{
          const updatedData = data.map((booking) => {
            // var bookingChargesInput = document.getElemenBtyId('bookingCharges');
            if (booking._id === id) {
              booking.charges = bookingCharges;
            }
            return booking;
          });
          setData(updatedData);
          console.log(updatedData)
          fetch(`http://localhost:1234/booking/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              charges:bookingCharges,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        };
        


    return (
        
      <div className="row">
  {data.map((booking) => {
    if (booking.provider === username) {
      return (
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4" key={booking._id}>
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title">Booking Details</h5>
              <p className="card-text">
                <strong>Booking Id:</strong> {booking._id}
              </p>
              <p className="card-text">
                <strong>Your Email:</strong> {booking.provider}
              </p>7
              <p className="card-text">
                <strong>Client Username:</strong> {booking.cusername}
              </p>
              <p className="card-text">
                <strong>Mobile:</strong> {booking.phone}
              </p>
              <p className="card-text">
                <strong>Service Id:</strong> {booking.service}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {booking.address}
              </p>
              <p className="card-text">
                <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
             </p>

              <p className="card-text">
                <strong>Time:</strong> {booking.time}
              </p>
              <p className="card-text">
                <strong>Booked On:</strong>{" "}
                {new Date(booking.timestamp).toLocaleString("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
              <strong>Enter your desired charges:</strong>
              <input type="text" id = "bookingCharges" onChange={(e)=>setBookingCharges(e.target.value)}></input>
               <button
               className="btn btn-success mr-2"
               onClick={() => updateCharges(booking._id)}
               >Confirm Charges</button>
               {booking.status === "pending" && (
                <>
                  <Button
                    className="btn btn-success mr-2"
                    onClick={() => handleAccept(booking._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    className="btn btn-danger"
                    onClick={() => handleReject(booking._id)}
                  >
                    Reject
                  </Button>
                </>
              )}
              {booking.status === "accepted" && (
                <div className="mt-3 p-2 bg-success text-white rounded">
                  <strong>Status:</strong> Accepted
                </div>
              )}
              {booking.status === "rejected" && (
                <div className="mt-3 p-2 bg-danger text-white rounded">
                  <strong>Status:</strong> Rejected
                </div>
              )} 


            </div>
          </div>
        </div>
      );
    }
    return null;
  })}
</div>

  );
      
      
}

export default ViewBookings;
