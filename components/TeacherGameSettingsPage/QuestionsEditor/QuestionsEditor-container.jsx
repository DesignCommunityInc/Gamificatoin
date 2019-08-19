/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import uid from 'uid';
import QuestionListItem from './QuestionListItem';
import Filter from '../../Filter';
import './QuestionEditor.scss';

const propTypes = {
  game_id: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  selectedQuestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterList: PropTypes.shape({}).isRequired,
  filter: PropTypes.shape({}).isRequired,
  fetchQuestionList: PropTypes.func.isRequired,
  fetchFilterList: PropTypes.func.isRequired,
  addQuestionToList: PropTypes.func.isRequired,
  removeQuestionFromList: PropTypes.func.isRequired,
  filterAction: PropTypes.func.isRequired,
  saveQuestions: PropTypes.func.isRequired,
  toggleQuestionListVisibility: PropTypes.func.isRequired,
};
const defaultTypes = {
};

class QuestionEditor extends React.Component {
  constructor() {
    super();
    this.selectQuestion = this.selectQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchFilterList, game_id } = this.props;
    fetchFilterList();
    this.fetch({ page: 1, game_id });
  }

  fetch({ page }) {
    const { fetchQuestionList, filter, game_id } = this.props;
    fetchQuestionList({ game_id, page, filters: filter });
  }

  selectQuestion(questionId) {
    const {
      addQuestionToList,
      removeQuestionFromList,
      selectedQuestions,
    } = this.props;
    const index = selectedQuestions.indexOf(questionId);
    if (index === -1) addQuestionToList(questionId);
    else removeQuestionFromList(index);
  }

  pagination() {
    const {
      currentPage,
      data: {
        pages_total: totalPages,
      } = {},
    } = this.props;
    const viewedPages = 5;
    // viewedPages = viewedPages - currentPage >= 0 ? viewedPages : 0;
    const startPage = currentPage + viewedPages >= totalPages
      ? totalPages - viewedPages
      : currentPage;
    return (
      <div className="pagging">
        <span
          type="backward"
          key={uid()}
          onClick={() => this.fetch({ page: currentPage - 1 })}
          onKeyDown={() => {}}
          tabIndex="0"
          role="button"
        >
          ❰
        </span>
        <div className="pagging__container">
          {[...Array(viewedPages)].map((_, idx) => (
            <span
              key={uid()}
              className={`${startPage + idx === currentPage ? 'active-page' : ''}`}
              onClick={() => this.fetch({ page: startPage + idx })}
              onKeyDown={() => {}}
              tabIndex="0"
              role="button"
            >
              {startPage + idx}
            </span>
          ))}
          <span>—</span>
          <span
            onClick={() => this.fetch({ page: totalPages })}
            onKeyDown={() => {}}
            tabIndex="0"
            role="button"
          >
            {totalPages}
          </span>
        </div>
        <span
          type="forward"
          key={uid()}
          onClick={() => this.fetch({
            page: currentPage + 1 > totalPages
              ? totalPages
              : currentPage + 1,
          })}
          onKeyDown={() => {}}
          tabIndex="0"
          role="button"
        >
          ❱
        </span>
      </div>
    );
  }

  render() {
    const {
      data: {
        questions,
      } = {},
      // isLoading,
      filter,
      filterList,
      filterAction,
      selectedQuestions,
      currentPage,
      saveQuestions,
      toggleQuestionListVisibility,
    } = this.props;
    return (
      <>
        <div
          className="Editor-Background"
          onClick={toggleQuestionListVisibility}
          role="button"
          tabIndex="0"
          onKeyDown={() => {}}
        />
        <div className="Question-Editor">
          <div className="Question-Editor__main">
            <div className="Editor__header">
              <span className="Editor__title">Банк вопросов</span>
              <input className="Editor__search" placeholder="Найти" />
            </div>
            <div className="Editor__container">
              <div className="Editor__titles">
                <span />
                <span>Название</span>
                <span>УУД</span>
                <span>Тип</span>
                <span />
              </div>
              <div className="Editor__body">
                {questions.map(question => (
                  <QuestionListItem
                    key={uid()}
                    {...question}
                    onSelect={() => this.selectQuestion(question.id)}
                    selected={selectedQuestions.indexOf(question.id) !== -1}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            <Filter
              inline
              filter={filter}
              filterAction={filterAction}
              filterFields={filterList}
              apply={() => this.fetch({ page: currentPage })}
            />
          </div>
          <div className="Question-Editor__footer">
            <div
              className="button button-main button-iconless save-button"
              onClick={() => saveQuestions({ id: 12, questions: selectedQuestions })}
              role="button"
              tabIndex="0"
              onKeyDown={() => {}}
            >
              Сохранить
            </div>
            {this.pagination()}
          </div>
        </div>
      </>
    );
  }
}


QuestionEditor.propTypes = propTypes;
QuestionEditor.defaultTypes = defaultTypes;

export default QuestionEditor;
