import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="webscape.webdevs@gmail.com">
        <Button>Contact: webscape.webdevs@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
