import React from "react";
import styled from "styled-components";

class Searchbar extends React.Component{
    state= {
        search:null,
    };
    handleChange = (e)=>{
        this.setState({
            search:e.target.value
        });
    };
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.addSearch(this.state.search)

    };
    render() {
        return(
            <SearchBarContainer>
                <form onSubmit={this.handleSubmit}>
                    <div >
                        <input type="text" placeholder="Codeforces User Handle" onChange={this.handleChange}/>
                    </div>
                </form>
            </SearchBarContainer>
        )
}

}
export default Searchbar;

const SearchBarContainer = styled.div`
    flex: 0.7;
    text-align: center;
    border-radius: 6px;
    margin: 10px 200px;
    padding: 0px 50px;
    color: gray;
    border: 1px gray solid;

    >form >div >input{
        background-color: none;
        text-align: center;
        font-size: 15px;
        border: none;
        height: 20px;
        min-width: 30vw;
        outline: 0;
        color: black;
    }
`;