import { Avatar } from '@mui/material';
import  { React, useEffect, useState } from 'react';
import './sidebarChat.css';
import { Link } from 'react-router-dom';
import { collection, getDoc, setDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import db from './firebase';
import { useParams } from 'react-router-dom'; 


const SidebarChat  = ({id, name, addNewChat}) => {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("")
    const {roomId} = useParams();

    useEffect(() => {
        if(id) {
            const lastMessage = collection(db, "rooms", id, "messages");
            const q = query(lastMessage, orderBy("timestamp", "desc"));
            onSnapshot(q, (querySnapshot) => {
                setMessages(querySnapshot.docs.map((doc) => doc.data()))
            })
            // const messageRef = getDoc(q).then(res => onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data()))));
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        if (roomName) {
            // do some clever detabase stuff...
            const messageRef = collection(db, "rooms");
            setDoc(doc(messageRef), {
                name: roomName
            })
        }

    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
       <div className="sidebarChat" onClick={createChat}>
            <h2>Add new Chat</h2>
       </div> 
    );
};

export default SidebarChat ;