import styled from "styled-components";

interface InputProps {
  large?: boolean;
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
`;

export const Input = styled.input`
  width: ${(props: InputProps) => (props.large ? "70%" : "20%")};
  padding: 5px 7px;
  border: none;
  border-bottom: 1.5px solid var(--dark-grey);
  outline: none;
  margin-bottom: 3%;
  margin-right: ${(props: InputProps) => (props.large ? "0%" : "3%")};
  &::placeholder {
    color: var(--dark-grey);
  }
  &:last-of-type {
    margin-bottom: ${(props: InputProps) => (props.large ? "5%" : "3%")};
    margin-right: ${(props: InputProps) => (props.large ? "0%" : "0%")};
  }
  &:first-of-type {
    ${(props: InputProps) => (props.large ? "5%" : "0%")};
  }
  &:focus,
  &:active {
    border-bottom: 1.5px solid var(--dark-blue);
    outline: none;
  }
`;
export const Label = styled.label`
  position: relative;
  width: 70%;
  height: 50px;
  margin-bottom: 10%;
  padding-left: 70px;
  color: var(--dark-grey);
  line-height: 3.5;
  cursor: pointer;
`;
export const InputRow = styled.section`
  display: flex;
  flex-flow: row;
  justify-content: center;
  position: relative;
  width: 100%;
  padding-left: 5%;
`;
