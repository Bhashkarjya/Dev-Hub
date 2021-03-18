import React from 'react';
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {enterRoom} from "../features/appSlice";
import {db} from "../firebase";

function SideBarOption({Icon, title, addChannelOption, id }) {

    const dispatch = useDispatch();
    const addChannel = () => {
        const channelName = prompt("Enter the channel name:");
        if(channelName){
            db.collection("rooms").add({
                name: channelName,
            });
        }
    };

    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom({
                roomId: id,
            }))
        }
    };

    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon fontSize="small" style={{padding: 10,color:"white"}}/>}
            {Icon ? (<h3>{title}</h3>):
                (
                    <SideBarOptionChannel>
                        <span>#</span> {title}
                    </SideBarOptionChannel>
                )
            }
        </SidebarOptionContainer>
    )
}

export default SideBarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    padding-left: 2px;
    align-items: center;
    cursor: pointer;

    :hover{
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;
        font-family: "Lucida Console", "Courier New", monospace;
        color: white;
        text-decoration:none;
    }

    > h3> span {
        padding: 15px;

    }
`;

const SideBarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
    >span {
        text-decoration: none;
    }
`;
