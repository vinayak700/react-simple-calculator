import styled from "styled-components";

const Button = styled.button`
  width: 25%;
  padding: 15px;
  height: 80px;
  font-size: 1.5em;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.75);

  &:hover {
    background-color: #eee;
  }
  &:focus {
    background-color: #eee;
    outline: none;
  }
  &:active {
    background-color: #ddd;
  }
`;
const CalculatorWrapper = styled.div`
  width: 330px;
  margin: 50px auto;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.1);
`;

const Display = styled.div`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 1.5em;
  text-align: right;
  min-height: 10vh;
  height: auto;
  color: white;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
`;

export { Button, Display, CalculatorWrapper };
