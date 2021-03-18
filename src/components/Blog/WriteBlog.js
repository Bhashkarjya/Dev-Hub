import React,{useState} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {db,auth} from "../../firebase";
import {Button} from "@material-ui/core";
import styled from "styled-components";

function WriteBlog() {
    const [input,setInput] = useState("");
    const [user] = useAuthState(auth);
    
    const sendPost = e =>{
        e.preventDefault();

        db.collection("posts").add({
            user: user.displayName,
            userImage: user.photoURL,
            writeUp: input
        });
        setInput("");    
    }

    return (
        <WriteBlogContainer>
            <form>
                <input
                    value={input}
                    onChange={e=>setInput(e.target.value)}
                    placeholder="Write your blog"
                />
                <Button type="submit" onClick={sendPost}>
                    POST
                </Button>
            </form>
        </WriteBlogContainer>
    )
}

export default WriteBlog

const WriteBlogContainer = styled.div`
    
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
