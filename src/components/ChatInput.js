import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Button} from "@material-ui/core";
import firebase from "firebase";
import {useDispatch} from "react-redux";
import {db,auth} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import {increaseCount} from "../features/appSlice";

function ChatInput({channelName, channelId, chatRef}) {
    const [input,setInput] = useState("");
    const [user] = useAuthState(auth);
    const sendMessage = (e) => {
        e.preventDefault(); //Prevents refreshing

        if(!channelId){
            return false;
        }

        db.collection("rooms").doc(channelId).collection("messages").add({
            message: input,
            // count: count,
            timestamep: firebase.firestore.Timestamp.fromDate(new Date()),
            user: user.displayName,
            userImage: user.photoURL
        });

        chatRef.current.scrollIntoView({
            behavior: "smooth",
        });
        setInput("");
        // incrementCount(count+1);
    };

    return (
        <ChatInputContainer>
            <form>
                <input 
                value={input}
                onChange={(e) => setInput(e.target.value)} 
                placeholder={`Message #${channelName}`}/>
                <Button type="submit" onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;
const ChatInputContainer = styled.div`
    
    border-radius: 20px;
    > form{
        position: relative;
        display: flex;
        justify-content: center;
    }

    >form >input{
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    >form >button {
        display: none !important;
    }
`;
