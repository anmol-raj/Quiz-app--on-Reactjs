import React, { Component } from "react";
import { QuizData } from "./QuizData";
import "./style.css";

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

  render() {
    const { question, options, currentIndex, userAnswer, quizEnd } = this.state;

    if (quizEnd) {
      return (
        <div className="card">
          <h1
            style={{
              paddingBottom: 0,
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
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
          >
            Next Question
          </button>
        )}
        {currentIndex === QuizData.length - 1 && (
          <button onClick={this.finishHandler} disabled={this.state.disabled}>
            Finish
          </button>
        )}
      </div>
    );
  }
}

export default Quiz;
