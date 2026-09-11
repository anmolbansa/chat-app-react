import { useState ,useRef,useEffect} from 'react'

import io from "socket.io-client";



const socket = io.connect("http://localhost:3000");



function App() {

 const inputref = useRef(null);

 const[sub,setsub] = useState(true);

 const [display,setdisplay] = useState();

 useEffect(()=>{

    function broadcast(data){

      const li = document.createElement("li");

      const senderurl = data.id === socket.id?"you":`User (${data.id.substring(0, 5)})`;



      li.innerText = `${senderurl}:${data.text}`;

      if(inputref.current){
        li.style.display = "block";
        li.style.textAlign = data.id === socket.id?"right":"left";
        li.style.margin = "5px";
        li.style.color = data.id === socket.id?"blue":"black";
       
  
        inputref.current.appendChild(li);

       

      }

    }
    socket.on("broadcastMessage",broadcast);
  },[]);
  

  function handleclick(){
if (!display.trim()) return;
    socket.emit("sendmessage",display);
    setdisplay("");
    setsub((prev)=>!prev);

  

   

  }

  return (

    <>

      <input type = "text" id = "input" onChange = {(e)=>{setdisplay(e.target.value)}}/>

      <button id = "submit" onClick={handleclick}>click</button>

      <p id = "display">{display}</p>

      <ul id = "message_list" ref = {inputref}>message box:</ul>

    </>

  )

}



                                             
export default App 

