import styled from "styled-components"

interface InputProps { 
    large?: boolean,
}

export const FormContainer = styled.section`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 2%;
    margin: 2%;
    background-color: var(--dark-green);
`

export const Input = styled.input`
    width: ${(props: InputProps) => props.large ? "35%" : "20%"};
    padding: 5px 7px;
    border-radius: 5px;
    border: 1.5px solid var(--dark-grey);
    margin-bottom: 1%;
`

export const Button = styled.button`
    padding: 10px 20px;
    background-color: var(--dark-purple);
    color: var(--white);
    border: none; 
`


