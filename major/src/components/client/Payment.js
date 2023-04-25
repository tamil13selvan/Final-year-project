import React, {useState} from 'react';
import StatusCheck from './StatusCheck';

const Payment =({charges}) => {
    const [amount, setamount] = useState(charges);
    console.log(charges);
    const handlesubmit = (e) => {
       
        e.preventDefault();
        if(amount === ""){
            alert("please enter amount")
        }else {
            var options = {
                key: "rzp_test_eRawzQkLulIOoK",
                key_secret:"HgyrGH0y8uQY2jmsfv03dkcE",
                amount: amount,
                currency:"INR",
                name:"Movers and Cleaners",
                description:"Payment process",
                handler: function(response){
                    alert(response.razorpay_payment_id)
                },
               prefill: {
                name:"Ram",
                email:"ram@gmail.com"
               }
            };
            var pay = new window.Razorpay(options);
            pay.open();
        }
    }

    return (
        
        <div className="card">
            
      <div className="card-header">
        <h2>Payment</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handlesubmit}>
          <label htmlFor="amount">Enter Amount:</label>
          <input type="text" id="amount" value={amount} onChange={(e) => setamount(e.target.value)} />
          <button type="submit">Pay</button>
        </form>
      </div>
    </div>
    )
}

export default Payment;

