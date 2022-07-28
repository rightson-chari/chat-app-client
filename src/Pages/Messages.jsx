import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import Input from "../Components/Input";

import axios from "axios";
const Messages = ({ currentChat, user, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrival, setArrival] = useState(null);
  const scrollRef = useRef();
  const handleMsg = (message) => {
    console.log(message);
    setMessages((prev) => [
      ...prev,
      { message, users: [user._id, currentChat._id], sender: user._id },
    ]);
    const data = {
      message,
      to: currentChat._id,
    };
    socket.current.emit("msg", data);
    axios
      .post("/msgs", {
        message,
        users: [user._id, currentChat._id],
        sender: user._id,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    axios
      .post("/msgs/all", {
        from: user._id,
        to: currentChat._id,
      })
      .then((res) => setMessages(res.data));
  }, [currentChat]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  });

  useEffect(() => {
    socket.current?.on("new", (data) => {
      setArrival(data);
    });
  });
  useEffect(() => {
    arrival && setMessages((prev) => [...prev, arrival]);
  }, [arrival]);
  return (
    <Container>
      <div className="header">
        <div className="user">
          <img src={currentChat.avatarImage} alt="" />
          <span>{currentChat.username}</span>
        </div>
        <button onClick={handleClick}>
          <BiPowerOff />
        </button>
      </div>
      <div className="messages">
        {messages &&
          messages.map((message) => {
            return (
              <div
                key={message._id}
                className={`message ${
                  message.sender === user._id ? "self" : "other"
                }`}
              >
                <span className="data" ref={scrollRef}>
                  {message.message}
                </span>
              </div>
            );
          })}
      </div>
      {currentChat && <Input handleMsg={handleMsg} />}
    </Container>
  );
};
const Container = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  max-height: 100%;
  overflow: hidden;
  .header {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;
    .user {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 3rem;
      }
    }
    button {
      background: #997af0;
      color: white;
      padding: 0.1rem 0.5rem;
      border: none;
      border-radius: 0.4rem;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      transition: 0.5s ease-in-out;
      svg {
        font-size: 1.3rem;
        color: #ebe7ff;
      }
      &:hover {
        background: #4e0eff;
      }
    }
  }
  .messages {
    padding: 1rem 2rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 1rem;
      &-thumb {
        background-color: #4e0eff;
        height: 10px;
        border-radius: 1rem;
      }
    }
    .message {
      padding: 1rem;
      .data {
        padding: 1rem;
        border-radius: 1rem;
      }
    }
    .self {
      align-self: flex-end;
      .data {
        background-color: #4f04ff21;
      }
    }
    .other {
      .data {
        background-color: #9900ff20;
      }
    }
  }
`;
export default Messages;
