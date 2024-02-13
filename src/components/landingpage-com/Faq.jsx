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
            "Lorem ipsum dolor sit amett consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
        },
        {
          title: "How to create account?",
          text:
            "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
        },
        {
          title: "Do i need to write any code?",
          text:
            "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
        },
        {
            title: "Community Point",
            text:
              "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
          },
          {
            title: "Do i need to write any code?",
            text:
              "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
          },
          {
            title: "Do i need to write any code?",
            text:
              "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
          }

      ];
   
  return (
    <div className="accordion ">
         <h2>Frequently Asked Questions</h2>
    {data.map((el, i) => (
      <AccordionItem title={el.title} CurOpen={CurOpen} OnOpen={setCurOpen}  num={i} key={el.title}>
        text={el.text}
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
      <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
        {/* <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p> */}
        <div className="title-wrap">
        <p className="titles">{title}</p>
        <p className="icon">{isOpen ? <RiArrowDownSLine /> : <MdKeyboardArrowUp />}</p>
        </div>
        {isOpen && <div className="content-box">{children}</div>}
      </div>
    );
  }