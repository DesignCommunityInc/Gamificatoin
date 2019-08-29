import React from 'react'
import PropTypes from 'prop-types';

const propTypes = {
  questions_count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  description: '',
  questions_count: '',
  time: '',
};

const Rules = ({
  description,
  questions_count,
  time,
}) => (
  <section className="Games-Preview__rule">
    <div className="Container__title">Правила игры</div>
    <div className="Games-Preview__rule__container">
      <div className="Games-Preview__rule-field">Закрытая игра</div>
      {questions_count && <div className="Games-Preview__rule-field">{`плиток: ${questions_count}`}</div>}
      {time && <div className="Games-Preview__rule-field">{`время на прохождение: ${time}`}</div>}
      <div className="Games-Preview__rule-title">Описание</div>
      {description && <div className="Games-Preview__rule-description">{description}</div>}
      <div className="Games-Preview__rule-title">Правила</div>
      <div className="Games-Preview__rule-description">
        Для начала игры необходимо выброть стартовую категорию.
        <br />
        <br />
        Для ответа на вопрос с выбором ответа
        требуется перетащить плитку с ответом в область выбора ответа.
        <div className="Games-Preview__rule-description__image" />
        <br />
        <br />
        Для ответа на вопрос с соответствием или последовательностью
        требуется перетащить плитку с ответом на место другого ответа.
      </div>
    </div>
  </section>
);


Rules.propTypes = propTypes;
Rules.defaultProps = defaultProps;

export default Rules;
