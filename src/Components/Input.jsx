import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
const Input = ({ handleMsg }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [msg, setMessage] = useState("");
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("chat-user")));
  }, []);
  const handleChange = (e, emoji) => {
    setMessage(msg + emoji.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg) {
      handleMsg(msg);
      setMessage("");
    }
  };
  return (
    <Container>
      <div className="emoji" onClick={() => setOpen(!open)}>
        <BsEmojiSmileFill />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
      {open && <Picker onEmojiClick={handleChange} />}
    </Container>
  );
};
const Container = styled.div`
  background-color: #080420;
  display: grid;
  grid-template-columns: 10% 90%;
  padding: 0.4rem;
  position: relative;
  place-content: center;
  .emoji {
    svg {
      color: yellow;
      font-size: 1.5rem;
    }
  }
  form {
    display: grid;
    grid-template-columns: 80% 20%;
    button {
      border-radius: 1rem;
      background-color: #9a86f3;
      cursor: pointer;
      svg {
        font-size: 1.4rem;
        color: white;
      }
    }
    input {
      width: 100%;
      padding: 0.4rem;
      border-radius: 1rem;
      outline: none;
      border: none;
    }
  }
  .emoji-picker-react {
    position: absolute;
    top: -330px;
    left: 50px;
    border: 1px solid black;
    background-color: #080420;
    box-shadow: none;

    .emoji-search {
      background-color: #080420;
    }
    .emoji-scroll-wrapper {
      &::-webkit-scrollbar {
        background-color: #080420;
        &-thumb {
          background-color: #9186f3;
          border-radius: 1rem;
          height: 3rem;
        }
      }
    }
    .emoji-group::before {
      background-color: #080420;
    }
    nav {
      button {
        filter: contrast(0);
      }
    }
  }
`;

export default Input;
