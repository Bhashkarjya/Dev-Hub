import React from "react";
import Axios from "axios";
import Searchbar from './SearchBar';
import styled from "styled-components";
import VerdictChart from "./Charts/VerdictChart";
import LanguageChart from "./Charts/LanguageChart";
import Levels from "./Charts/Levels";
import Tags from "./Charts/Tags";
import ProblemRating from "./Charts/ProblemRating";

class HomeCP extends React.Component{
    state={
        username:"",
        data:[],
        user_data:[],
        error: false
    }

    addSearch = (username) =>{
        const url= "https://codeforces.com/api/user.status?handle="+username;
        Axios.get(url).then(res=>{
            this.setState({
                data: res.data.result,
                username:username
            })
        })
        .catch(error=>{
            this.setState({
                error: true
            })
            console.log(this.state.error);
        });
        Axios.get("https://codeforces.com/api/user.rating?handle="+username).then(
            res=>{
                this.setState({
                    user_data: res.data.result
                })
            }
        )
        console.log(this.state.data);
        console.log(this.state.username);
    };

    render(){
        return (
            <HomeCPContainer>
                <TitleHeader>
                    <h1>Codeforces Analytics</h1>
                </TitleHeader>
                <Searchbar addSearch = {this.addSearch} />
                {this.state.error &&
                    <div>
                        Wrong Username
                    </div>
                }
                {this.state.data.length==0 &&
                    <BeforeSearch>
                        <h2>Welcome to the Competitive Programming World</h2>
                        <br></br>
                        <p>Get to know your submissions and a get a full analyis of your Codeforces profile.
                            The React-google-charts have been used to pictorially represent the submissions and
                            the language of your choice. A pie-chart representing the types of problems solved from 
                            different topics is also shown. <br></br><strong>Just enter your Codeforces handle to
                                get a full analysis of your profile.
                            </strong>
                        </p>
                    </BeforeSearch>
                }
                <div class="row container">
                    <VerdictChart data={this.state.data} user={this.state.username} />
                </div>
                <div class="row container">
                    <LanguageChart data={this.state.data} user={this.state.username}/>
                </div>
                <div className="row container">
                    <div >
                        <Tags data={this.state.data} user={this.state.username}/>
                    </div>
                </div>
                <div className="row container">
                    <Levels data={this.state.data} user={this.state.username}/>
                </div>
                <div className="row container">
                    <ProblemRating data={this.state.data} user={this.state.username}/>
                </div>
            </HomeCPContainer>
        )
    }
}

export default HomeCP;

const HomeCPContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`;

const BeforeSearch = styled.div`
    flex: 0.4;
    align-items: center;
    margin: 200px 200px;
    /* width: 50%; */
    >h2{
        text-align: center;
    }

    >p{
        text-align:center;
    }
`;

const TitleHeader = styled.div`
    text-align: center;
    margin-top: 10px;
`;
