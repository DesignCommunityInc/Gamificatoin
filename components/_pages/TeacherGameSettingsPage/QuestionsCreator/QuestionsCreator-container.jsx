/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import Button from '../../../Button';
import CheckBox from '../../../Checkbox';

const propTypes = {
  saveQuestion: PropTypes.func.isRequired,
  filterList: PropTypes.shape({}).isRequired,
  toggleQuestionCreatorVisibility: PropTypes.func.isRequired,
};
const defaultTypes = {
};

class QuestionCreator extends React.Component {
  constructor() {
    super();
    this.handleWrite = this.handleWrite.bind(this);
    this.increaseAnswerCount = this.increaseAnswerCount.bind(this);
    this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
    this.initialState = {
      answer: '',
      answerCount: 0,
      check: [],
      question: '',
    };
    this.state = {
      direction: '104',
      type: '75',
      subject: '1',
      class: '1',
      range: '1',
      sendToExpert: true,
      ...this.initialState,
    };
  }

  componentDidUpdate(previousProps, previousState) {
    const { type } = this.state;
    if (previousState.type !== type) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ...this.initialState });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  switchTitle(title) {
    switch (title) {
      case 'class': return 'Класс';
      case 'direction': return 'Направление';
      case 'range': return 'Сложность';
      case 'subject': return 'Предмет';
      case 'type': return 'Тип';
      default: return 'Поле фильтрации';
    }
  }

  increaseAnswerCount() {
    const { answerCount, answer } = this.state;
    this.setState({
      answerCount: answerCount + 1,
      answer: Array.isArray(answer) ? [...answer, ''] : [''],
    });
  }

  handleSelectAnswer(type, idx, value = null) {
    const { check } = this.state;
    const index = check.indexOf(idx);
    switch (type) {
      case '76':
        this.setState({ check: [idx] });
        break;
      case '77':
        this.setState({
          check: index !== -1
            ? [...check.slice(0, index),
              ...check.slice(index + 1)]
            : [...check, idx],
        });
        break;
      case '78':
        check[idx] = value;
        this.setState({ check });
        break;
      default: break;
    }
  }

  handleWrite(event, type, idx = null) {
    const { answer } = this.state;
    switch (type) {
      case '75':
        this.setState({ answer: event.target.value });
        break;
      case '76':
        answer[idx] = event.target.value;
        this.setState({ answer });
        break;
      default: break;
    }
  }

  render() {
    const {
      saveQuestion,
      toggleQuestionCreatorVisibility,
      filterList,
    } = this.props;
    const {
      class: currentClass,
      type,
      direction,
      subject,
      range,
      question,
      answer,
      sendToExpert,
      answerCount,
      check,
    } = this.state;
    return (
      <>
        <div
          className="Editor-Background"
          onClick={toggleQuestionCreatorVisibility}
          role="button"
          tabIndex="0"
          onKeyDown={() => {}}
        />
        <div className="Question-Creator">
          <div className="Creator__filters">
            {Object.keys(filterList).map(filter => (
              <div
                key={uid()}
                className="Creator__filter"
              >
                <div className="Creator__title">
                  {this.switchTitle(filter)}
                </div>
                <select
                  className="Creator__filter__container"
                  onChange={e => this.setState({ [filter]: e.target.value })}
                  value={{ ...this.state }[filter]}
                >
                  {filterList[filter].map(({ id, name }) => (
                    <option
                      key={uid()}
                      value={id}
                    >
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <label
              htmlFor="checker"
              className="Creator__check"
            >
              <CheckBox
                id="checker"
                type="checkbox"
                defaultChecked
                onClick={() => { this.setState({ sendToExpert: !sendToExpert }); }}
              />
              Отправить вопрос на проверку экспертом
            </label>
            <div className="Question-Creator__save-button">
              <Button
                title="Сохранить"
                className="button button-main button-main-violet"
                onClick={() => saveQuestion({
                  type,
                  subject,
                  direction: [direction],
                  currentClass,
                  range,
                  check_expert: sendToExpert,
                  question,
                  answer,
                  check: check.length > 0 ? check : null,
                })}
              />
            </div>
          </div>
          <div className="Creator__body">
            <div className="Creator__content">
              <div className="Creator__content__title">
                Заполните поля для создания вопроса
              </div>
              <div className="Creator__content__block">
                <h4>Вопрос</h4>
                <textarea
                  className="Creator__content__textbox"
                  placeholder="Ваш вопрос здесь"
                  onBlur={e => this.setState({ question: e.target.value })}
                />
              </div>
              {type === '75' && (
                <div className="Creator__content__block">
                  <h4>Примерный ответ</h4>
                  <textarea
                    className="Creator__content__textbox Creator__content__textbox--short"
                    placeholder="Введите примерный ответ"
                    onBlur={e => this.setState({ answer: e.target.value })}
                  />
                </div>
              )}
              {type === '76' && (
                <div className="Creator__content__block">
                  <h4>Добавьте ответы</h4>
                  <Button
                    className="button button-main button-main-light button-main-light-colorful"
                    onClick={this.increaseAnswerCount}
                    title="+"
                  />
                  {[...Array(answerCount)].map((_, idx) => (
                    <div key={uid()} className="Creator__content__option">
                      <label>
                        <CheckBox
                          id="select"
                          type="radio"
                          onClick={() => this.handleSelectAnswer(type, idx)}
                          defaultChecked={check.indexOf(idx) !== -1}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Введите вариант ответа"
                        onBlur={(e) => {
                          answer[idx] = e.target.value;
                          this.setState({ answer });
                        }}
                        defaultValue={answer[idx]}
                      />
                    </div>
                  ))}
                </div>
              )}
              {type === '77' && (
                <div className="Creator__content__block">
                  <h4>Добавьте ответы</h4>
                  <Button
                    className="button button-main button-main-light button-main-light-colorful"
                    onClick={this.increaseAnswerCount}
                    title="+"
                  />
                  {[...Array(answerCount)].map((_, idx) => (
                    <div key={uid()} className="Creator__content__option">
                      <label>
                        <CheckBox
                          id={`${idx}`}
                          type="checkbox"
                          onClick={() => this.handleSelectAnswer(type, idx)}
                          defaultChecked={check.indexOf(idx) !== -1}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Введите вариант ответа"
                        onBlur={(e) => {
                          answer[idx] = e.target.value;
                          this.setState({ answer });
                        }}
                        defaultValue={answer[idx]}
                      />
                    </div>
                  ))}
                </div>
              )}
              {type === '78' && (
                <div className="Creator__content__block">
                  <h4>Добавьте ответы</h4>
                  <Button
                    className="button button-main button-main-light button-main-light-colorful"
                    onClick={this.increaseAnswerCount}
                    title="+"
                  />
                  {[...Array(answerCount)].map((_, idx) => (
                    <div key={uid()} className="Creator__content__match">
                      <input
                        type="text"
                        placeholder="Введите вариант ответа"
                        onBlur={(e) => {
                          answer[idx] = e.target.value;
                          this.setState({ answer });
                        }}
                        defaultValue={answer[idx]}
                      />
                      <input
                        type="text"
                        placeholder="Введите соответствие"
                        onBlur={e => this.handleSelectAnswer(type, idx, e.target.value)}
                        defaultValue={check[idx]}
                      />
                    </div>
                  ))}
                </div>
              )}
              {type === '79' && (
                <div className="Creator__content__block">
                  <h4>Добавьте ответы</h4>
                  <Button
                    className="button button-main button-main-light button-main-light-colorful"
                    onClick={this.increaseAnswerCount}
                    title="+"
                  />
                  {[...Array(answerCount)].map((_, idx) => (
                    <div key={uid()} className="Creator__content__match">
                      <div className="Creator__content__number">{idx + 1}</div>
                      <input
                        type="text"
                        placeholder="Введите вариант ответа"
                        onBlur={(e) => {
                          answer[idx] = e.target.value;
                          this.setState({ answer });
                        }}
                        defaultValue={answer[idx]}
                      />
                    </div>
                  ))}
                </div>
              )}
              {type === '80' && (
                <div className="Creator__content__block">
                  <h4>Добавьте ответы</h4>
                  <Button
                    className="button button-main button-main-light button-main-light-colorful"
                    onClick={this.increaseAnswerCount}
                    title="+"
                  />
                  {[...Array(answerCount)].map((_, idx) => (
                    <textarea
                      key={uid()}
                      className="Creator__content__textbox Creator__content__textbox--short"
                      placeholder="Введите примерный ответ"
                      onBlur={(e) => {
                        answer[idx] = e.target.value;
                        this.setState({ answer });
                      }}
                      defaultValue={answer[idx]}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}


QuestionCreator.propTypes = propTypes;
QuestionCreator.defaultTypes = defaultTypes;

export default QuestionCreator;
