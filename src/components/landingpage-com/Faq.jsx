import React, { useState } from 'react'
import './faq.scss'
import { MdKeyboardArrowUp} from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";


export default function Faq() {
    const [CurOpen, setCurOpen] = useState(null);
    const data = [
        {
          title: "What is Breakaway community?",
          text:
            "A tokenised content community connected to a Web3 decentralised infrastructure on SPK Network"
        },
        {
          title: "How to create account?",
          text:
            "You only need 5 step to create a community. kindly check out the step on landing page"
        },
        {
          title: "Do i need to write any code?",
          text:
            "You dont need to write code or even be web developer create community, juist follow the 5 step in creating accound then ytou are done. "
        },
        {
            title: "Community Point",
            text:
              "Users would earn points for every action, Points would be accumulated over a period of time."
          },
          {
            title: "Who Can Create Community?",
            text:
              "Any hive user can create community and the is no fee required"
          },
          {
            title: "Fee To Create Community?",
            text:
              "0% fee to create community."
          }

      ];
   
  return (
    <div className="accordion ">
         <h2>Frequently Asked Questions</h2>
    {data.map((el, i) => (
      <AccordionItem title={el.title} CurOpen={CurOpen} OnOpen={setCurOpen}  num={i} key={el.title}>
        {el.text}
        </AccordionItem>   
    ))}
  </div>
  )
}

function AccordionItem({ num, title, CurOpen, OnOpen, children }) {
    const isOpen= num ===CurOpen
    
  
    function handleToggle() {
      // setIsOpen((isOpen) => true);
      OnOpen(isOpen ? null : num)
    }
  
    return (
      <div className={`item  ${isOpen ? "open light-bgt" : ""}`} onClick={handleToggle}>
        {/* <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p> */}
        <div className="title-wrap">
        <p className="titles">{title}</p>
        <p className="icon">{isOpen ? <RiArrowDownSLine /> : <MdKeyboardArrowUp />}</p>
        </div>
        {isOpen && <div className="content-box">{children}</div>}
      </div>
    );
  }