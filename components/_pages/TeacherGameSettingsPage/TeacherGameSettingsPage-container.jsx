import React from 'react';
import { PropTypes } from 'prop-types';
import uid from 'uid';
import Header from '../../Header';
import Settings from '../../Settings';
import Question from './Question';
import Textarea from '../../Textarea';
import Participant from './Participant';
import Detail from './Detail';
import QuestionEditor from './QuestionsEditor';
import QuestionsCreator from './QuestionsCreator';
import Button from '../../Button';
import UserAdd from './UserAdd';
import { invite } from './TeacherGameSettingsPage-actions';

const propTypes = {
  fetchTeacherGamePreview: PropTypes.func.isRequired,
  // isLoading: PropTypes.bool.isRequired,
  users: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  questionListVisibility: PropTypes.bool.isRequired,
  toggleQuestionListVisibility: PropTypes.func.isRequired,
  questionCreatorVisibility: PropTypes.bool.isRequired,
  toggleQuestionCreatorVisibility: PropTypes.func.isRequired,
  getInvites: PropTypes.func.isRequired,
};

class TeacherGameSettingsPage extends React.Component {
  constructor() {
    super();
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
    this.state = {
      activeIndex: null,
      viewDetails: false,
    };
  }

  componentDidMount() {
    const {
      fetchTeacherGamePreview,
      match: {
        params: { id },
      } = {},
      getInvites,
    } = this.props;
    getInvites(id);
    fetchTeacherGamePreview(id);
  }

  inviteUser(userId) {
    const { fetchTeacherGamePreview, match: { params: { id } } = {}, getInvites } = this.props;
    invite(id, [userId]).then(() => {
      fetchTeacherGamePreview(id);
      getInvites(id);
    });
  }

  handleTabSelect(idx) {
    const { activeIndex } = this.state;
    this.setState({ activeIndex: activeIndex === idx ? null : idx });
  }

  viewDetails() {
    const { viewDetails } = this.state;
    this.setState({ viewDetails: !viewDetails });
  }

  render() {
    const {
      // isLoading,
      data: {
        name,
        image,
        description,
        questions,
        type,
        difficulty,
        time,
        finish_date,
        start_date,
        participants: {
          completed,
          not_played,
        } = {},
      } = {},
      match: {
        params: { id },
      } = {},
      users,
      questionCreatorVisibility,
      toggleQuestionCreatorVisibility,
      questionListVisibility,
      toggleQuestionListVisibility,
      fetchTeacherGamePreview,
    } = this.props;
    const {
      activeIndex,
      viewDetails,
    } = this.state;

    const completedLenght = completed ? completed.length : 0;
    const notPlayedLenght = not_played ? not_played.length : 0;

    return (
      <main className="page">
        {questionListVisibility && (
          <QuestionEditor
            game_id={id}
            fetchTeacherGamePreview={fetchTeacherGamePreview}
          />
        )}
        {questionCreatorVisibility && (
          <QuestionsCreator />
        )}
        <Header title="Редактирование" />
        <Settings />
        <section className="Games Container">
          <div className="Games__information__wrapper">
            <div
              style={{ backgroundImage: `url('${image}')` }}
              className="game__image"
            />
            <form action="">
              <input type="text" defaultValue={name} placeholder="Введите название игры" />
              <div
                className="button view__details__button"
                onClick={this.viewDetails}
                role="button"
                onKeyDown={() => {}}
                tabIndex="0"
              >
                <span />
                <span />
                <span />
              </div>
              <div className="Game__information__details__wrapper">
                <div className={`Game__information__details ${viewDetails ? 'Game__information__details--active' : ''}`}>
                  <Detail
                    title="Время [чч:мм]"
                    value={time}
                  />
                  <Detail
                    title="Даты проведения"
                    value={`${start_date} - ${finish_date}`}
                  />
                  <Detail
                    title="Класс"
                    value={difficulty}
                  />
                  <Detail
                    title="Тип"
                    value={type}
                  />
                </div>
                <Textarea
                  title="описание игры"
                  value={description}
                />
              </div>
            </form>
          </div>
        </section>
        <section className="Questions Container">
          <div className="Container__title">Вопросы игры</div>
          <div className="Buttons__wrapper">
            <Button
              onClick={toggleQuestionCreatorVisibility}
              className="button"
              title="Создать вопрос"
            />
            <Button
              onClick={toggleQuestionListVisibility}
              className="button"
              title="Добавить вопрос из банка"
            />
          </div>
          <div className="Questions__wrapper">
            {questions && questions.map((question, idx) => (
              <Question
                key={uid()}
                {...question}
                counter={idx + 1}
                idx={idx}
                active={idx === activeIndex ? 'question--viewed' : ''}
                onClick={this.handleTabSelect}
              />
            ))}
          </div>
        </section>
        <section className="Participants Container">
          <div className="Container__title">
            Участники
            <p className="Container__title__counter">
              {completedLenght + notPlayedLenght}
            </p>
          </div>
          <div className="Participants__wrapper">
            <div className="Participants__info">
              <div className="info">
                <p type="completed" className="info__counter">{completedLenght}</p>
                <p type="completed" className="info__desc">Прошли</p>
                <p type="notPlayed" className="info__counter">{notPlayedLenght}</p>
                <p type="notPlayed" className="info__desc">Не приступали</p>
              </div>
            </div>
            <div className="Participants">
              <UserAdd
                users={users}
                onClick={this.inviteUser}
              />
              {completed && completed.map(participant => (
                <Participant
                  key={uid()}
                  {...participant}
                  type="complete"
                />
              ))}
              {not_played && not_played.map(participant => (
                <Participant
                  key={uid()}
                  {...participant}
                  type="notStartde"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }
}


TeacherGameSettingsPage.propTypes = propTypes;

export default TeacherGameSettingsPage;
