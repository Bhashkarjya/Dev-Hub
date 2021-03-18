import React from 'react';
import { Row} from 'react-bootstrap';
import styled from "styled-components";

const Form = (props) => {
  return (
    <FormContainer>
    <form onSubmit={(event) => props.handleUserFormSubmit(event)}>
        Username:<span>   </span>
        <label>
          <input
            className="form-control"
            name="username"
            type="text"
            placeholder="Github Username"
            required
            value={props.formData.username}
            onChange={props.handleFormChange}
          />
        </label>
        <span>   </span>
        <input
            type="submit"
            value="Submit"
            className="btn btn-primary"
        />

    </form>
    </FormContainer>
  )};

export default Form;

const FormContainer = styled.div`
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
`; 