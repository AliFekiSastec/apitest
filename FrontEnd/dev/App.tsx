import React, { useEffect , useState, SetStateAction} from 'react';

import { Widget, addResponseMessage,renderCustomComponent, setQuickButtons, toggleMsgLoader, addLinkSnippet } from '../index';
import { connect, sendMsg } from './api';
import './App.scss'
const search = require('../assets/search.svg') as string;
const sastec = require('../assets/sastec.png') as string;

//import logo from "../../../../../../assets/sastec.png"

function App() {
  let initial: Array<string>=[]
  
  const [chatHistory, setChatHistory] = useState(initial);
  const [userID, setUserID] = useState("");


  useEffect(() => {
    connect((msg) => {
      console.log("New Message");
      var msg = JSON.parse(msg.data); 
      if (userID.length===0) {
        setUserID(msg.ID)
      }
      let newhistory:  Array<string>
      newhistory =[...chatHistory].concat(msg)
      setChatHistory(newhistory)
      if(msg.ID != userID){  
        addResponseMessage(msg.body);
      }
      console.log("historystate :" ,chatHistory);
    });
  }, [userID]);
  useEffect(() => {
  renderCustomComponent(Image,null)
}, []);






  const Image =()=> {
    return (
      <div id="Welcome-to-sastec" >
        <div id="Welcome-to-sastec-text"> 
          Hi there. Welcome to Sastec Support Chat.
          <img src={search} id="image-search"></img>
          <div>
          <input 
            id="Welcome-to-sastec-input"
            placeholder="Recherchez sur notre aide"></input></div>
        </div>   
      </div>

    )
  }

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    sendMsg(newMessage);
  };
  
  const getCustomLauncher = (handleToggle) => <button onClick={handleToggle}></button>
  
  return (
    <div className="App">
      <Widget 
      profileAvatar={sastec}
      title="Des questions? Discutons!"
      subtitle="Réponse sous 1 heure"
      handleNewUserMessage={handleNewUserMessage}
      
     //launcher={handleToggle => getCustomLauncher(handleToggle)}
      />
    </div>
  );
}

export default App;
