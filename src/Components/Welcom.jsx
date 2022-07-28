import React from "react";
import styled from "styled-components";
import welcome from "../assets/robot.gif";
const Welcom = ({ user }) => {
  return (
    <Container>
      <img src={welcome} alt="" />
      <p>
        Welcome <span>{user.username}</span>
      </p>
      <div className="select">Select conversation to start chatting</div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    height: 20rem;
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 2rem;
    font-weight: bold;
    span {
      color: #4e00ff;
    }
  }
  .select {
    margin-top: 1rem;
  }
`;

export default Welcom;
