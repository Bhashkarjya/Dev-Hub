import React from "react";
import styled from "styled-components";
import WriteBlog from "../Blog/WriteBlog";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollection} from "react-firebase-hooks/firestore";
import {db,auth} from "../../firebase";
import {Link} from "react-router-dom";
import DisplayBlogs from "./DisplayBlogs.js";

function Blog(){

    const [BlogMessages] = useCollection(db.collection("posts"));
    return (
        <BlogContainer>
            <h1>Welcome to the Blog Section</h1>
            <WriteBlog />
            <BlogPosts>
            {
                BlogMessages?.docs.map(doc=>{
                    const {user,userImage,writeUp} = doc.data();
                    return (
                        <DisplayBlogs
                        key={doc.id}
                        message={writeUp}
                        user={user}
                        userImage={userImage}
                        />
                    )
                })
            }
            </BlogPosts>
        </BlogContainer>
    )
}

const BlogPosts = styled.div``;

export default Blog;

const BlogContainer = styled.div`
    flex: 0.7;
    margin: 80px 100px;
`;
