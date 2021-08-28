import React, { useEffect } from "react";
import "./App.css";

import { db } from "./firebase/firebase.config";
import Chat from "./firebase/types/chat";

function App() {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<Chat[] | []>([]);

  useEffect(() => {
    return db.chat.onSnapshot((data) => {
      setMessages([]);
      const messages = data.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setMessages(messages);
    });
  }, []);

  const addMessage = () => {
    if (message) {
      db.chat.add({
        senderId: "1234",
        senderName: "Anonimo",
        message: message,
        timestamp: new Date().getMilliseconds(),
      });
      setMessage("");
    }
  };

  return (
    <div className="App">
      {messages.map((message) => (
        <p>{message.message}</p>
      ))}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={addMessage}>Send Me</button>
    </div>
  );
}

export default App;
