/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../../../Checkbox';

const propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  direction: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.objectOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  question: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // subject: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class QuestionListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }

  render() {
    const {
      id,
      direction,
      question,
      type,
      // subject,
      onSelect,
      selected,
    } = this.props;
    const { active } = this.state;
    return (
      <div className="Editor__question">
        <label
          className="Editor__question__checkbox"
          htmlFor={id}
        >
          <CheckBox
            type="checkbox"
            id={id}
            classOption="large"
            defaultChecked={selected}
            onClick={onSelect}
            name={id}
          />
        </label>
        <div
          className="Editor__question__body"
          onClick={() => this.setState({ active: !active })} // question id
          role="button"
          onKeyDown={() => {}}
          tabIndex="0"
        >
          <span>{`Вопрос №${id}`}</span>
          <span>{direction[0]}</span>
          <span>{type}</span>
          <span className={`Editor__question__arrow ${active ? 'Editor__question__arrow--active' : ''}`} />
        </div>
        <div
          className={`Editor__question__description ${active ? 'Editor__question__description--active' : ''}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: question }}
        />
      </div>
    );
  }
}

QuestionListItem.propTypes = propTypes;

export default QuestionListItem;
