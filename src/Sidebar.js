import { Chat, DonutLargeOutlined, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {  query, onSnapshot,collection } from "firebase/firestore";
import './sidebar.css'
import SidebarChat from './SidebarChat';
import db from "./firebase";
import { useStateValue } from "./StateProvider";

const Sidebar = () => {
    const [{ user }, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);
        useEffect(() => {
            const q = query(collection(db, "rooms"))
            onSnapshot(q, (querySnapshot) => {
                setRooms(querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        data: doc.data() 
                    }
                }))
            });
 
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user.photoURL}/>
                <p>{user?.displayName}</p>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeOutlined/>
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text"/>   
                </div>
               </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;