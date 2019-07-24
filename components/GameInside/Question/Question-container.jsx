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
    const title = "Что было первым?";
    const questions = [
      "ложка", 'курица', 'яйцо', 'собака' ,
    ];
    const count = 15;
    const total = 30;
    const progress = count / total * 100;
    return (
      <section className="Question">
        <div className="Question__container">
          <div className="Question__count">
            <b>{`Вопрос № ${count}`}</b>{` из ${total}`}
          </div>
          <div className="Question__progress">
            <div className="Question__progress__bar" style={{ width: `${progress}%`}}/>
          </div>
          <div className="Question__image__container">
            <img src="https://foodallergycanada.ca/wp-content/uploads/egg-2.jpg" alt="mountains" className="Question__image" />
          </div>
          <div className="Question__title">{title}</div>
        </div>
        <div className="Question__list">
          {questions.map((question, idx) => 
            <div className="Question__answer" key={idx}>
              <p>{question}</p>
            </div>
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