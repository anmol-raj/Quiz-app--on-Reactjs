import React, { Component } from "react";
import { QuizData } from "./QuizData";
import { Button, ButtonToolbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import AudioPlayer from "./AudioPlayer";
import "./style.css";
import ModalHeader from "react-bootstrap/ModalHeader";

export class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAnswer: null,
      currentIndex: 0,
      options: [],
      quizEnd: false,
      score: 0,
      disabled: true,
      show: false,
    };
  }

  loadQuiz = () => {
    const { currentIndex } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    });
  };

  nextQuestionHandler = () => {
    const { userAnswer, answer, score } = this.state;

    if (userAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentIndex: this.state.currentIndex + 1,
      userAnswer: null,
    });
  };

  componentDidMount() {
    this.loadQuiz();
  }

  checkAnswer = (answer) => {
    this.setState({
      userAnswer: answer,
      disabled: false,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    const { currentIndex } = this.state;
    if (this.state.currentIndex != prevState.currentIndex) {
      this.setState(() => {
        return {
          question: QuizData[currentIndex].question,
          options: QuizData[currentIndex].options,
          answer: QuizData[currentIndex].answer,
        };
      });
    }
  }
  finishHandler = () => {
    if (this.state.currentIndex === QuizData.length - 1) {
      this.setState({
        quizEnd: true,
      });
    }
  };
  handleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state;

    if (quizEnd) {
      return (
        <div className="card">
          <h1
            style={{
              paddingBottom: 50,
              background: "#f9f9f9",
              borderRadius: " 8px 8px 0 0",
              height: "45px",
              color: "#424242",
            }}
          >
            Game Over. Final score is {this.state.score} points
          </h1>
          <p style={{ marginTop: 10, paddingTop: 5 }}>
            The correct Answers for the quiz are
          </p>
          <ul>
            {QuizData.map((item, index) => (
              <li className="options space" key={index}>
                {item.answer}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="head">
          <h1>Welcome to Legal Student Quiz..</h1>
        </div>
        <div className="question">{`Question ${currentIndex + 1} of ${
          QuizData.length
        }`}</div>
        <h2>{question}</h2>

        {options.map((option) => (
          <p
            key={option.id}
            className={`options ${userAnswer === option ? "selected" : null} `}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}

        {currentIndex < QuizData.length - 1 && (
          <button
            style={{
              margin: "auto",
              borderRadius: 5,
              marginTop: 20,
              marginBottom: 20,
            }}
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next Question
          </button>
        )}
        {currentIndex === QuizData.length - 1 && (
          <button
            style={{
              margin: "auto",
              borderRadius: 5,
              marginTop: 20,
              marginBottom: 20,
            }}
            onClick={this.finishHandler}
            disabled={this.state.disabled}
          >
            Finish
          </button>
        )}
        <ButtonToolbar>
          <Button
            variant="link"
            className="audiobtn"
            onClick={() => this.handleModal()}
          >
            Open Audio
          </Button>
          <Modal show={this.state.show} onHide={() => this.handleModal()}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Audio Player
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AudioPlayer />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.handleModal()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Quiz;
