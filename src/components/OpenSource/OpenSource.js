import React, { Component } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Form from './Form';
import SortedList from './SortedList';
import ProfileDetails from './ProfileDetails';
import LanguageList from './LanguageList';
import RepoStats from './RepoStats';

class OpenSource extends Component {
  constructor() {
    super();
    this.state = {
      gitun: 'No username',
      infoclean : '',
      info: null,
      formData: {
        username: '',
      },
      repitems: null,
      staritems: null,
      replanguagecount: {},
      keywords: null,
      itemstest: [
        {id: 1, name: 'Hello World', content: 'Welcome to learning React!'},
        {id: 2, name: 'Installation', content: 'You can install React from npm.'},
        {id: 3, name: 'Hello World', content: 'Welcome to learning React!'},
        {id: 4, name: 'Installation', content: 'You can install React from npm.'},
        {id: 5, name: 'Hello World', content: 'Welcome to learning React!'},
        {id: 6, name: 'Installation', content: 'You can install React from npm.'}
      ]

    }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleFormChange= this.handleFormChange.bind(this);
  }

  handleUserFormSubmit(event) {
    event.preventDefault();
    axios.get('https://api.github.com/users/'+this.state.formData.username)
    .then(response => this.setState({
      gitun: response.data.login,
      infoclean: response.data,
      info : JSON.stringify(response.data, undefined, 2)
    })).catch((err) => { console.log(err); });


    axios.get('https://api.github.com/users/'+this.state.formData.username+'/repos')
    .then(response => {

      this.setState({
        replanguagecount: null
      })

      var itemsWithFalseForks = response.data.filter(item => item.fork === false)

      var sortedItems = itemsWithFalseForks.sort((b,a) => {
        if((a.watchers_count +  a.forks_count) < (b.forks_count + b.watchers_count)){
          return -1
        }else if ((a.watchers_count +  a.forks_count) > (b.forks_count + b.watchers_count)){
          return 1
        }else {
          return 0
        }
      })

      let totalforks = 0;
      let totalwatchers = 0;
      let dictrlc = Object.assign({}, this.state.replanguagecount);
      for (var i = 0; i < itemsWithFalseForks.length; i++) {
          dictrlc[itemsWithFalseForks[i]['language']] = -~ dictrlc[itemsWithFalseForks[i]['language']]
          totalforks = totalforks + itemsWithFalseForks[i]['forks_count']
          totalwatchers = totalwatchers + itemsWithFalseForks[i]['watchers_count']
      }

      let dictrlcclean = [];
      let iterarray = Object.entries(dictrlc)
      for (var n = 0; n < iterarray.length; n++) {
        dictrlcclean.push(
          Object.assign({},
          {lang: iterarray[n][0], count: iterarray[n][1]}))
      }

      var dictrlccleansorted = dictrlcclean.sort((b,a) => {
        if (a.count < b.count) {
          return -1
        }else if (a.count > b.count){
          return 1
        }else {
          return 0
        }
      })

      this.setState({
        repitems: sortedItems.slice(0,10),
        replanguagecount: dictrlccleansorted,
        totalforks: totalforks,
        totalwatchers: totalwatchers
      })

    }).catch((err) => { console.log(err); })

    axios.get('https://api.github.com/users/'+this.state.formData.username+'/starred')
    .then(response => {

      var itemsWithFalseForks = response.data.filter(item => item.fork === false)

      var sortedItems = itemsWithFalseForks.sort((b,a) => {
        if((a.watchers_count +  a.forks_count) < (b.forks_count + b.watchers_count)){
          return -1
        }else if ((a.watchers_count +  a.forks_count) > (b.forks_count + b.watchers_count)){
          return 1
        }else {
          return 0
        }
      })

      var documents = []
      for (var i = 0; i < response.data.length; i++) {
          var descr = response.data[i]['description']
          if (descr != null) {
            var newtext = descr.match(/[^.!?]+[.!?]+/g)
            if (newtext != null) {
              documents = documents.concat(newtext)
            }
          }
      }
    //   var result = lda(documents, 3, 3);
    //   var keywords = new Set()
    //   for (var k = 0; k < 3; k++) {
    //     for (var j = 0; j < 3; j++) {
    //       keywords = keywords.add(result[k][j]['term']);
    //     }
    //   }

      this.setState({
        staritems: sortedItems.slice(0,10),
        // keywords: Array.from(keywords)
      })
    }).catch((err) => { console.log(err); })

  };

  handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };


  render() {
    return (
      <OpenSourceContainer>
        <TitleHeader>
          <h1>GitHub Analytics</h1>
        </TitleHeader>
        <Form
          formData={this.state.formData}
          handleUserFormSubmit={this.handleUserFormSubmit}
          handleFormChange={this.handleFormChange}
        />
        <hr></hr>
        {
          this.state.info != null ? 
          <div>
            <TitleHeader>
              <h4>Profile Details</h4>
            </TitleHeader>
            <br></br>
            <ProfileDetails infoclean={this.state.infoclean}/>
            <Grid>
              <Item1>
                <TitleHeader>
                  <h4>Personal Repositories Summary</h4>
                </TitleHeader>
                <RepoStats totalforks={this.state.totalforks}
                totalwatchers={this.state.totalwatchers}/>
                <p><b>Used Languages</b></p>
                <LanguageList
                  langslist={this.state.replanguagecount}/>
              </Item1>
              <Item2>
                <TitleHeader>
                  <br></br>
                  <h4>Personal Top 10 Repositories</h4>
                </TitleHeader>
              <br></br>
                <SortedList repitems={this.state.repitems}/>
              </Item2>
            </Grid>
          </div>
          : <AlternateContainer>
              This feature provides you with a full analytics of a Github profile.
              The preferred language for development, the repositories created by the developer,
              the forks and the starred repositories and the frequency of your commits are all shown 
              in this section. Brace yourself to learn about your and others Github Analytics.
              <br></br><strong>Enter your Github username to begin the journey.</strong>
            </AlternateContainer>
        }
      </OpenSourceContainer>
    );
  }
}

export default OpenSource;

const OpenSourceContainer = styled.div`
    flex: 1;
    margin-top: 60px;
    margin-left: 100px;
    overflow-y:scroll;

    @media screen and (max-width: 600px){
      margin-left: 20px;
    }
`;

const TitleHeader = styled.div`
    text-align: center;
    margin-top: 10px;
`;

const AlternateContainer = styled.div`
    text-align: center;
    font-family: "Lucida Console", "Courier New", monospace;
    margin: 100px 200px;
`;

const Grid = styled.div`
  display:grid;
  grid-template: 1.6em 1.6em 1.6em / 1fr 1fr 1fr;
  grid-gap: 5px;
`;

const Item1 = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  text-align: center;
`;
const Item2 = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
`;

