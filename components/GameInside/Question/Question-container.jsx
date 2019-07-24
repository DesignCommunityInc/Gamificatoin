import React from 'react'
import { PropTypes } from "prop-types";

const propTypes = {
  // request: PropTypes.object.isRequired,
};
const defaultTypes = {
    // request: {},
};


class Question extends React.Component {
  render() {
    const { data, isLoading } = this.props;
    const title = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
    const questions = [
      "one", 'two', 'three', 'four',
    ];
    const count = 15;
    const total = 30;
    const progress = count / total * 100;
    return (
      <section className="Question">
        <div className="Question__header">
          <div className="Question__count">
            {`Вопрос ${count} из ${total}`}
          </div>
          <div className="Question__progress">
            <div className="Question__progress__bar" style={{ width: `${progress}%`}}/>
          </div>
        </div>
        <div className="Question__container">
          <div className="Question__title">{title}</div>
          <img src="https://i.ytimg.com/vi/OIlbiU5NKM4/maxresdefault.jpg" alt="mountains" className="Question__image"/>
        </div>
        <div className="Question__list">
          {questions.map((question, idx) => 
            <div className="Question__item" key={idx}>{question}</div>
          )}
        </div>
        <div className="Question__drag" />
      </section>
    );
  }
}


Question.propTypes = propTypes;
Question.defaultTypes = defaultTypes;

export default Question;