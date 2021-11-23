import styled from "styled-components"

interface InputProps { 
    large?: boolean,
}

export const FormContainer = styled.section`
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 2%;
    background-color: var(--white);
`

export const Input = styled.input`
    width: ${(props: InputProps) => props.large ? "70%" : "20%"};
    padding: 5px 7px;
    border: none;
    border-bottom: 1.5px solid var(--dark-grey);
    outline: none;
    margin-bottom: 3%;
    &::placeholder {
        color: var(--dark-grey);
    }
    &:last-of-type {
        margin-bottom: 5%;
    }
    &:first-of-type {
        margin-top: 5%;
    }
    &:focus, &:active{
        border-bottom: 1.5px solid var(--dark-blue);           
        outline: none;
    }
`

export const Label = styled.label`
    position: relative;
    width: 70%;
    height:50px;
    margin-bottom: 10%;
    padding-left: 70px;
    color: var(--dark-grey);
    line-height: 3.5;
    cursor: pointer;
`
export const Plus = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: var(--dark-grey);
    color: var(--white);
    font-size: 1.5rem;
`