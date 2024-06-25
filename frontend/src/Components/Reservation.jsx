import React from 'react'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Reservation = () => {
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [date, setDate]=useState("");
    const [time, setTime]=useState("");
    const [email, setEmail]=useState("");
    const [phone, setPhone]=useState("");
    const navigate =useNavigate();

    const handleReservation = async(e)=>{
        e.preventDefault();
        try{
            const{data} = await axios.post("http://127.0.0.1:4000/api/v1/reservation/send",{firstName, lastName, email, date, time, phone},
                {
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true,
                }
            );
            toast.success(data.message);
            setFirstName("");
            setLastName("");
            setEmail("");
            setTime("");
            setDate("");
            setPhone("");
            navigate("/Success");
        }
        catch(error){
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };
  return ( 
  <section className='reservation' id='reservation'>
    <div className="container">
        <div className="banner">
            <img src="/store.webp" alt="res" />
        </div>
        <div className="banner">
            <div className="reservation_form_box">
                <h1>MAKE A RESERVATION</h1>
                <p>For any queries call us</p>
                <form onSubmit={handleReservation}>
                    <div>
                        <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}  />
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}  />
                    </div>  
                    <div>
                        <input type="date" placeholder="Date" value={date} onChange={(e)=>setDate(e.target.value)}  />
                        <input type="time" placeholder="Time" value={time} onChange={(e)=>setTime(e.target.value)}  />  
                    </div>
                    <div>
                    <input type="email" placeholder="Email" className="email_tag" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    <input type="phone" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)}  />
                    </div>
                    <button type='submit'>RESERVE NOW{" "} <span><HiOutlineArrowNarrowRight /></span></button>
                </form>
            </div>
        </div>
    </div>
  </section>
  );
  
};

export default Reservation;
