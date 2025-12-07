"use client";
import { useState } from "react";
import EscapeRoom from "../components/escaperoom";

export default function Page(){
  const [name,setName] = useState("");
  const [start,setStart] = useState(false);

  return (
    <>
      {!start ? (
        <div style={{textAlign:"center",paddingTop:80,color:"white"}}>
          <h1 style={{fontSize:32,fontWeight:"bold"}}>Enter Name to Start</h1>

          <input 
            style={{padding:10,borderRadius:6,width:200,marginRight:10,color:"black"}}
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <button 
            style={{padding:"10px 20px",background:"red",color:"white",borderRadius:6}}
            onClick={()=> name ? setStart(true) : alert("Insert name first!")}
          >
            Start
          </button>
        </div>
      ) : (
        <EscapeRoom playerName={name}/>
      )}
    </>
  );
}
