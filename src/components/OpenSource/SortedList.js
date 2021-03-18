import React from 'react';
import Moment from 'react-moment';
import { Row, Col } from 'react-bootstrap';
import styled from "styled-components";

const SortedList = (props) => {
  if (props.repitems) {
    return (
        <div>
          {props.repitems.map((repitem, index) =>
              <div key={repitem.id}>
                  <Grid>
                    
                      <Item1>
                        <h5>
                          <a href={repitem.html_url} target="_blank">{index + 1}) {repitem.name}</a>
                          
                        </h5>
                      </Item1>
                      <Item2>
                        Started <Moment from={new Date()}>{repitem.created_at}</Moment>
                        <hr></hr>
                      </Item2>
                      
                    
                      <Item3>
                        <b>Description: </b>{repitem.description}
                      </Item3>
                      <Item4>
                        <b>Language: </b>{repitem.language}<b>  Watchers: </b>{repitem.watchers_count}<b>  Forks: </b>{repitem.forks_count}
                      </Item4>
                    
                  </Grid>
              </div>
          )}
        </div>
      )
  } else { return null;}
  };

export default SortedList;

const Grid = styled.div`
  display:grid;
  grid-template: 1.6em 1.6em 1.6em / 1fr 1fr 1fr;
  grid-template: repeat(3, 1.6em) / repeat(3, 1fr);
  grid-gap: 10px;
  margin-bottom:15px;
  border-style: dotted dashed solid double;
  background-color: #C7EFCF;

  :hover{
    background-color: #B7F0AD;
  }
`;

const Item1 = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start:1;
  grid-row-end:2;
`;
const Item2 = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start:1;
  grid-row-end:2;
  text-align: right;
`;

const Item3 = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start:2;
  grid-row-end:3;
`;

const Item4 = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start:3;
  grid-row-end:4;
`;
