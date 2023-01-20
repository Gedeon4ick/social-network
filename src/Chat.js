import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./chat.css"
import { useParams } from 'react-router-dom'; 
import db from './firebase';
import {  doc, onSnapshot, collection, setDoc, orderBy, query, getDocs } from "firebase/firestore";
import { useStateValue } from './StateProvider';


const Chat = () => {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    
    const [{user}, dispatch] = useStateValue();

    
    useEffect(() => {
        if (roomId) {
            onSnapshot(doc(db, "rooms", roomId), (doc) => {
                setRoomName(doc.data().name)
            });
            const messageRef = collection(db, "rooms", roomId, "messages");
            const q = query(messageRef, orderBy("timestamp", "asc"));
    
            onSnapshot(q, (querySnapshot) => {
                setMessages(querySnapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        
        const messageRef = collection(db, "rooms", roomId, "messages");

        setDoc(doc(messageRef), {
            message: input,
            name: user.displayName,
            timestamp: new Date()
        })
     
        setInput("")
    }

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p key={message.timestamp.nanoseconds} className={`chat__message ${ message.name === user.displayName && 'chat__reciever'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
                
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Send a message"/>
                <button onClick={sendMessage } type="submit" >Send a message</button>
                </form>
                <MicOutlinedIcon /> 
            </div>
        </div>
    );
};

export default Chat;