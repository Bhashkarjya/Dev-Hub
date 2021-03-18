import React from 'react';
import Moment from "react-moment";
import styled from "styled-components";
const imgStye = {
  borderRadius: "50%",
  width: "250px",
  height: "250px"
};


const ProfileDetails = (props) => {
    return (
        <Grid>
          <Item1>
            <div>
              {props.infoclean.avatar_url ?
                <img src={props.infoclean.avatar_url}
                     alt="Profile"
                     style={imgStye}/> : null }
            </div>
            <Button>
              {props.infoclean.html_url ? <button><a className="btn btn-info" href={props.infoclean.html_url} target="_blank">View on GitHub</a></button> : null }
            </Button>
          </Item1>
          <Item2>
            <div>
              {props.infoclean.name ? <div><p><b>Name: </b> {props.infoclean.name}</p></div> : null }
            </div>
            <div>
              {props.infoclean.created_at ? <div><p><b>Joined: </b>{
                <Moment from={new Date()}>{props.infoclean.created_at}</Moment>}</p></div> : null }
            </div>
            <div>
              {props.infoclean.bio ? <div><p><b>Bio:  </b>{props.infoclean.bio}</p></div> : null }
            </div>
            <div>
              {props.infoclean.blog ? <div><p><b>Blog: </b><a href={
                 props.infoclean.blog.search("http") !== -1 ? props.infoclean.blog
                : "http://" +  props.infoclean.blog } target="_blank">{props.infoclean.blog}</a></p></div> : null }
            </div>
            <div>
              {props.infoclean.location ? <div><p><b>Location: </b>{props.infoclean.location}</p></div> : null }
            </div>
            <div>
              {props.infoclean.company ? <div><p><b>Company: </b>{props.infoclean.company}</p></div> : null }
            </div>
            <Grid1>
              <Item3>
                <div>
                  {props.infoclean.public_repos ? <div><p><b>Repos:</b></p><p>{props.infoclean.public_repos}</p></div> : null }
                </div>
              </Item3>
              <Item4>
                <div>
                  {props.infoclean.followers ? <div><p><b>Followers: </b></p><p>{props.infoclean.followers}</p></div> : null }
                </div>
              </Item4>
              <Item5>
                <div>
                  {props.infoclean.following ? <div><p><b>Following: </b></p><p>{props.infoclean.following}</p></div> : null }
                </div>
              </Item5>
            </Grid1>
            <div>
                {props.infoclean.login ? 
                <div>
                  { 
                    <img src={"http://ghchart.rshah.org/"+props.infoclean.login} 
                         alt="Github chart" 
                         style={{ maxWidth: '100%', maxHeight: '100%'}}
                    />
                  }
                  </div> : null }
            </div>
          </Item2>
        </Grid>
    )

  };

export default ProfileDetails;

const Grid = styled.div`
  display:grid;
  grid-template: 1.6em 1.6em 1.6em 1.6em 1.6em 1.6em/ 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px; 
  margin-bottom: 100px;
  //need to make changes for the mobile UI
`;

const Item1 = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  text-align: center;
`;

const Item2 = styled.div`
  grid-column-start:3;
  grid-column-end: 7;
`;

const Item3 = styled.div`
  grid-column-start:1;
  grid-column-end: 2;
  text-align: center;
`;
const Item4 = styled.div`
  grid-column-start:2;
  grid-column-end: 3;
  text-align: center;
`;
const Item5 = styled.div`
  grid-column-start:3;
  grid-column-end: 4;
  text-align: center;
`;

const Grid1 = styled.div`
  display: grid;
  grid-template: 1.6em 1.6em 1.6em / 1fr 1fr 1fr;
`;

const Button = styled.div`
  >button{
    transition-duration: 0.4s;
    background-color: #034f84;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    :hover{
      box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
  }
  >button >a{
    text-decoration: none;
    color: white;
    font-size: 16px;
  }
`;