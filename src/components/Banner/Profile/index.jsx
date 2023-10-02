import React from "react";

import { AiOutlineInstagram,AiOutlineGithub } from "react-icons/ai";
import { GiEarthAmerica } from "react-icons/gi";
import { FaLinkedinIn } from "react-icons/fa";

import myImage from "../../../../assets/images/myImage.png";

import {StyleContainer,Texts,Social,Profile} from "./style"
const ProfileComponent = () => {
  return (
    <StyleContainer>
      <Texts>
        <h4>
          Hi...!<span className="green"> I am</span>
        </h4>
        <h1 className="green">Haseeb ur Rehman</h1>
        <h3>Software Engineer</h3>
        <p>I have a lot of exciting experience for you</p>
        <button>Lets talk</button>
        <Social>
          <p>Check out my</p>
          <div className="social-icons">
            <span>
              <a href="#">
                <AiOutlineInstagram />
              </a>
            </span>
            <span>
              <a href="#">
                <GiEarthAmerica />
              </a>
            </span>
            <span>
              <a href="https://www.linkedin.com/in/haseeb-ur-rehman-siddique-b92542173">
                <FaLinkedinIn />
              </a>
            </span>
            <span>
              <a href="https://github.com/haseeb-coder">
                <AiOutlineGithub />
              </a>
            </span>
          </div>
        </Social>
      </Texts>
      <Profile>
        <img src={myImage} alt="" />
      </Profile>
    </StyleContainer>
  );
};

export default ProfileComponent;
