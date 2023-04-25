import React from 'react'

const Services = () => {
  return (
    <div className='row text-center text-white'>
    <p className=' display-5  mt-3'>OUR SERVICES</p>
    <div className="row container d-flex justify-content-between">
      <div className=" col-md-7 mx-5 mt-5">
        <h3>OUR PHILOSOPHY</h3>
        <p>
          We offer various kind of cleaning and relocating services
        </p>
      </div>
      <div className="col-md-4">
        <img className='mt-5' width={500} src="https://safereliablecargo.in/gallery/loading.jpg" alt="truck" />
      </div>
      <div className="row mx-5 mt-5">
        <div className="col-md-3">
        <h4 className='mb-4 fa-solid fa-clock'>PACKING AND MOVING</h4>
        <p>During shifting your households we handle with care. Your move is our responsibility</p>
        </div>
        
        <div className="col-md-3">
        <h4 className='mb-4'>CLEANING SERVICES</h4>
        <p>We are responsible for keeping your houses and organizations clean</p>
        </div>
        
      </div>
    </div>
    </div>
    

    
  )
}

export default Services

