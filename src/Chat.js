import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import "./chat.css"
import { useParams } from 'react-router-dom'; 
import db from './firebase';
import {  doc, onSnapshot } from "firebase/firestore";

const Chat = () => {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        if (roomId) {
            onSnapshot(doc(db, "rooms", roomId), (doc) => {
                setRoomName(doc.data().name)
            });
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);
        setInput("")
    }

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at ...</p>
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
                <p className={`chat__message ${true && 'chat__reciever'}`}>
                    <span className="chat__name">Sony Sangha</span>
                    Hey Guys
                    <span className='chat__timestamp'>3:52pm</span>
                </p>
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