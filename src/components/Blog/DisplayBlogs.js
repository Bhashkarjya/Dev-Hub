import React from 'react'
import styled from "styled-components";

function DisplayBlogs({message, user, userImage}) {
    return (
        <BlogContainer>
            <img src={userImage} alt=""/>
            <BlogInfo>
                <h4>
                    {user}
                </h4>
                <p>{message}</p>
            </BlogInfo>
        </BlogContainer>
    )
}

export default DisplayBlogs

const BlogContainer = styled.div`
    display:flex;
    align-items: center;
    padding: 20px;

    > img {
        height: 50px;
        border-radius: 8px;
    }
`;

const BlogInfo = styled.div`
    padding-left: 10px;
    > h4 >span{
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 10px;
    }
`;