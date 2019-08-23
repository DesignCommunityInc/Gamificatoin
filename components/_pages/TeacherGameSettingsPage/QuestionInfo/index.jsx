import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }

  viewQuestionText() {
    const { active } = this.state;
    this.setState({ active: !active });
  }

  render() {
    const {
      // text,
      // counter,
      // title,
      // specUUD,
      // specType,
      // image,
      isLoading,
    } = this.props;
    if (isLoading) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className="Question__info">
        <div className="Question__info__title">
          <p>Вопрос №211</p>
        </div>
      </div>
    );
  }
}


Info.propTypes = propTypes;
// Info.defaultTypes = defaultTypes;

export default Info;
