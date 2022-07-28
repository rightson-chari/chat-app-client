import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/gif.gif";
import axios from "axios";
const Contacts = ({ user, setCurrentChat }) => {
  const [contacts, setContacts] = useState([]);
  const [currentSelected, setCurrentSelected] = useState();
  const fetchUsers = () => {
    axios.get(`/auth/${user._id}`).then((res) => setContacts(res.data));
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    setCurrentChat(contact);
  };

  return (
    <Container>
      <div className="header">
        <img src={logo} alt="" />
        <span>SNAPPY</span>
      </div>
      <div className="contacts">
        {contacts.map((item, index) => (
          <div key={item._id}>
            <div
              key={item._id}
              onClick={() => changeCurrentChat(index, item)}
              className={
                index === currentSelected ? "contact selected" : "contact"
              }
            >
              <img src={item.avatarImage} alt="" />
              <span>{item.username}</span>
            </div>
            <div className="line"></div>
          </div>
        ))}
      </div>
      <div className="current-user">
        <img src={user.avatarImage} alt="" />
        <span>{user.username}</span>
      </div>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  height: 90vh;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 3rem;
    }
    span {
      font-size: 1rem;
      margin-top: 0.3rem;
      font-weight: bold;
    }
  }
  .current-user {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding-left: 1rem;
    background-color: #0d0d30;
    img {
      height: 3rem;
    }
    span {
      font-size: 1rem;
    }
  }
  .contacts {
    overflow: auto;
    display: flex;
    flex-direction: column;
    .line {
      background-color: white;
      width: 100%;
      padding: 0.5px;
      opacity: 0.5;
    }
    .contact {
      display: flex;
      padding: 0.5rem 0;
      cursor: pointer;
      align-items: center;
      transition: 0.5s ease-in;
      padding-left: 1rem;
      img {
        height: 3rem;
      }
    }
    .selected {
      background-color: #9186f3;
    }
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #ffffff39;
        border-radius: 1rem;
      }
    }
  }
`;

export default Contacts;
