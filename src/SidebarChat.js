import { Avatar } from '@mui/material';
import  { React, useEffect, useState } from 'react';
import './sidebarChat.css';
import { Link } from 'react-router-dom';
import { collection, setDoc } from "firebase/firestore";
import db from './firebase';
import { useParams } from 'react-router-dom'; 


const SidebarChat  = ({id, name, addNewChat}) => {
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        if (roomName) {
            // do some clever detabase stuff...
            const messageRef = collection(db, "rooms");
            setDoc(collection(messageRef), {
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
                    <p>Last message...</p>
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