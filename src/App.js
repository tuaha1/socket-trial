import { useEffect, useState } from "react";
import io from "socket.io-client"

const socket = io("https://socket-trial-server.onrender.com")

function App() {

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      setMessageList(prevData => [...prevData, data]);
    })
  }, [])

  const handleClick = () => {
    socket.emit("send message", message);
    setMessage('');
  }

  return (
    <div>
      <center>
        <h1>Send message</h1>
        <input value={message} onChange={(e) => { setMessage(e.target.value); }} placeholder="enter message" />
        <button onClick={handleClick}>submit</button>
        {messageList.map((element, index) => {
          return <li key={index}>{element}</li>
        })}
      </center>
    </div>
  );
}

export default App;
