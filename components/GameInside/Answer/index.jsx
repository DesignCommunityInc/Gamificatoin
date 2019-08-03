import React from 'react'
import { PropTypes } from "prop-types";
import * as types from "../../../constants/QuestionTypes";

class Answer extends React.Component {
  constructor() {
    super();
    this.answers = [];
    this.answered = false;
    
  }

  componentDidMount() {

  }

  render() {
    const { matches, type, onClick } = this.props;
    return (
      <div className="Answer__drag__container">
        {matches ? matches.map((match, idx) =>
          <div 
            key={idx}
            className="Answer__drag Answer__drag--inline"
            data-attr='Положить ответ сюда'
            data-attr-before={match}
            onClick={onClick}
            onContextMenu={onClick}
          />
        ) : (
          <div 
            className="Answer__drag"
            data-attr='Положить ответ сюда'
            onClick={onClick}
            onContextMenu={onClick}
          />
        )}
      </div>
    )
  }
}

export default Answer;