import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ReactAudioPlayer from "react-audio-player";

const AudioPlayer = () => {
  return (
    <div>
      {/*    <p>You can play Audio here</p>    */}
      <ReactAudioPlayer src="Castle_Of_Glass.mp3" autoPlay controls /> 
    </div>
  );
};

export default AudioPlayer;
