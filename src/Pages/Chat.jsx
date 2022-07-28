import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Contacts from "../Components/Contacts";
import { toast, ToastContainer } from "react-toastify";
import Messages from "./Messages";
import Welcom from "../Components/Welcom";

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
const Chat = () => {
  const [user, setUser] = useState();
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState();

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5100");
      socket.current.emit("add", user._id);
    }
  }, [user]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("chat-user")));
  }, []);
  useEffect(() => {
    user && toast.success(`Welcome ${user.username}`, toastOptions);
  }, [user]);
  return (
    <>
      <Container>
        <div className="content">
          {user && <Contacts user={user} setCurrentChat={setCurrentChat} />}

          {currentChat
            ? user && (
                <Messages
                  currentChat={currentChat}
                  user={user}
                  socket={socket}
                />
              )
            : user && <Welcom user={user} />}
        </div>
      </Container>

      {/* <ToastContainer /> */}
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
  .content {
    height: 90vh;
    width: 90vw;
    background-color: #00000076;
    border-radius: 0.3rem;
    display: grid;
    grid-template-columns: 25% 75%;
  }
`;
export default Chat;
