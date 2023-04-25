import React,{ useState } from 'react'
import {Link} from 'react-router-dom'
import AddService from './AddService'
import { userHistory } from 'react-router-dom'

const ProviderPage = () => {
    
  return (
    <div>
        <div id='page' className='row mx-3'>
      <div className="col-md-4 border border-1 p-4 mt-5" style={{ backgroundColor: '#fff'}}>
        <h1 className='mb-5'>WELCOME</h1>
        <Link to="/ViewBookings">
        <button  type='button' className="btn btn-warning form-control mt-3 mb-3">View Bookings</button>
        </Link> 
        <Link to="/AddService">
        <button   type='button' className="btn btn-warning form-control mt-3 mb-3">Add Service</button>
        </Link> 
        <Link to ="/MyService">
        <button type="button" className="btn btn-warning form-control mt-3 mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            My Services
          </button>
          </Link>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>       
        
        <Link to="/"><button  type='button' className="btn btn-danger form-control mt-3 mb-3">Log out</button></Link>

      </div>
    </div>
    </div>
  );
}

export default ProviderPage;
  
