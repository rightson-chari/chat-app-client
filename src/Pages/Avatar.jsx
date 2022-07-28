import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Buffer } from "buffer";
import { toast, ToastContainer } from "react-toastify";
import loader from "../assets/loader.gif";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled from "styled-components";

const Avatar = () => {
  //   const api = "https://api.multiavatar.com/";
  const api = "https://avatars.dicebear.com/api/adventurer/";
  const navigate = useNavigate();
  const [avatar, setAvatars] = useState([]);
  const [urlNum, setUrlNum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const setProfile = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-user"));

      let image = urlNum.find((one) => one.index === selectedAvatar);

      const { data } = await axios.patch(`/auth/${user._id}`, {
        image: image.url,
      });
      if (data.isAvatarImageSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.avatarImage;
        localStorage.removeItem("chat-user");
        localStorage.setItem("chat-user", JSON.stringify(user));
        navigate("/chat");
      }
    }
  };

  useEffect(() => {
    const data = [];
    const urlArray = [];

    for (let i = 0; i < 4; i++) {
      let fullUrl = `${api}${Math.round(Math.random() * 1000)}.svg`;

      // axios.get(fullUrl).then((res) => {
      // const buffer = new Buffer(res.data);
      data.push(fullUrl);
      urlArray.push({ url: fullUrl, index: i });
      setUrlNum(urlArray);
      setAvatars(data);
      setIsLoading(false);
      // });
    }
  }, []);
  console.log(avatar);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avator as you profile picture</h1>
          </div>
          <div className="avatars">
            {avatar.map((ava, index) => {
              return (
                <div
                  onClick={() => {
                    setSelectedAvatar(index);
                  }}
                  key={index}
                  className={
                    selectedAvatar === index ? "avatar selected" : "avatar"
                  }
                >
                  <img src={ava} alt="" />' '
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfile}>
            SELECT AVATAR
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #131324;
  gap: 3rem;
  height: 100vh;
  width: 100vw;
  button {
    background: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.4rem;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    &:hover {
      background: #4e0eff;
    }
  }
  .loader {
    max-width: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4 rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      cursor: pointer;

      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
`;
export default Avatar;
