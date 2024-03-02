import React from 'react'
import "./what.scss"
import 'animate.css';
import { motion } from "framer-motion"
import fadeIn from '../../variants';
import { MdIntegrationInstructions } from "react-icons/md";


export default function What() {
  return (
        <div className="animate__animated animate__fadeInUp  what-wrap">
            <h1  className=" hero-text">Are you struggling with?</h1>
            <div  className="box-wrap">
            <div className= "animate__animated animate__slideInLeft  box" >
                <div className="text-wrap">
                <span><MdIntegrationInstructions /></span><h1> integration</h1>
                </div>
                <p>"User can create community in just one button without writing code"</p>
            </div>
            <div className="animate__animated animate__slideInLeft box" >
                <div className="text-wrap">
                <span><MdIntegrationInstructions size={25} /></span><h1> integration</h1>
                </div>
                <p>"User can create community in just one button without writing code"</p>
            </div>
            <div className="animate__animated animate__slideInRight box" >
                <div className="text-wrap">
                <span><MdIntegrationInstructions /></span><h1> integration</h1>
                </div>
                <p>"User can create community in just one button without writing code"</p>
            </div>
            <div className="animate__animated animate__slideInRight box" >
                <div className="text-wrap">
                <span><MdIntegrationInstructions /></span><h1> Accessibilty</h1>
                </div>
                <p>"Its a maze to give all users a peek into the roadmaps."</p>
            </div>
            </div>
        </div>  
    
  )
}
