import React from 'react'
import "./success.scss"
import success_img from "../assets/succesful-img.png"
import { useNavigate } from 'react-router-dom'

function Success() {
    const navigate = useNavigate()
  return (
    <div className='success-container'>
        <div className="success-content-wrap">
            <img src={success_img} alt="" />
            <h2>Community Registration Successful </h2>
            <p> Your community is now registerd on breakaway platform </p>
            <button onClick={()=>navigate("/")}>Explore </button>
        </div>
    </div>
  )
}

export default Success