import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Settings from '../Settings';
import Gamelist from '../Gamelist';
import Question from './Question';
import Textarea from '../Textarea';
import Participant from './Participant';
import Detail from './Detail';

const propTypes = {
  fetchTeacherGamePreview: PropTypes.func.isRequired,
  // isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

class TeacherGameSettingsPage extends React.Component {
  constructor() {
    super();
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
    this.state = {
      activeIndex: null,
      viewDetails: false
    }
  }
  
  componentDidMount() {
    const { fetchTeacherGamePreview } = this.props;
    const id = this.props.match.params.id;
    fetchTeacherGamePreview(id);
  }

  handleTabSelect(idx) {
    const { activeIndex } = this.state;
    if (activeIndex === idx) {
      idx = null;
    }
    this.setState({activeIndex: idx});
 }

 viewDetails() {
    const { viewDetails } = this.state;
    this.setState({viewDetails: !viewDetails});
 }

  render() {
    let counter = 1;
    const {
      isLoading,
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
          not_played
        } = {},
      },
      location: {
        pathname,
      } = {},
    } = this.props;

    const completedLenght = completed ? completed.length : 0;
    const notPlayedLenght = not_played ? not_played.length : 0;

    const { viewDetails } = this.state;

    const viewDetailClass = viewDetails ? 'Game__information__details--active' : '';

    return (
      <main className="page">
        <Header 
          title="Редактирование"
        />
        <Settings />
        <section className="Games Container">
          <div className="Game__inforamtion__wrapper">
            <div style={{backgroundImage: `url(${image})`}} className="game__image"></div>
            <form action="">
              <input type="text" defaultValue={name} placeholder="Введите название игры"/>
              <div className="button view__details__button" onClick={this.viewDetails}>
                  <span/>
                  <span/>
                  <span/>
              </div>
              <div className="Game__information__details__wrapper">
                  <div className={`Game__information__details ${viewDetailClass}`}>
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
                    value={description && description}
                />
              </div>
            </form>
          </div>          
        </section>
        <section className="Questions Container">
        <div className="Container__title">Вопросы игры</div>
          <div className="Buttons__wrapper">
            <span role="button" className="button">Создать вопрос</span>
            <span role="button" className="button">Добавить вопрос из банка</span>
          </div>
          <div className="Questions__wrapper">
            {questions.map((question, idx) => (
              <Question
                {...question}
                counter={idx+1}
                idx = {idx}
                active={idx === this.state.activeIndex ? 'question--viewed' : ''} 
                onClick={this.handleTabSelect}
              />
            ))}     
          </div>
        </section>
        <section className="Participants Container">
          <div className="Container__title">Участники <p className="Container__title__counter">{ completedLenght + notPlayedLenght }</p></div>
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
            {completed && completed.map((participant, idx) => (
              <Participant 
                {...participant}
                type="complete"
              />
            ))}    
            {not_played && not_played.map((participant, idx) => (
              <Participant 
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
