import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../../containers/HeaderContainer';
import Settings from '../Settings';
import Gamelist from '../Gamelist';
import Question from './Question';
import Textarea from '../Textarea';
import Participant from './Participant';

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
    this.state = {
      activeIndex: null
    }
  }
  
  componentDidMount() {
    const { fetchTeacherGamePreview } = this.props;
    const id = this.props.match.params.id;
    fetchTeacherGamePreview(id);
  }

  handleTabSelect(idx) {
    console.log(this.state);
    if(this.state.activeIndex === idx){
      idx = null;
    }
    this.setState({activeIndex: idx});
 }

  render() {
    let counter = 1;
    const {
      isLoading,
      data: {
        name,
        image,
        description,
        questions = [],
        participants = [],
      } = [],
      location: {
        pathname,
      } = {},
    } = this.props;
    console.log(questions);
    return (
      <main className="page">
        <Header />
        {/* <Settings /> */}
        <section className="Games Container">
          <Link to="/" className="Container__title Container__title-backward">Редактирование игры</Link>
          <div className="Game__inforamtion__wrapper">
            <div style={{backgroundImage: `url(${image})`}} className="game__image"></div>
            <form action="">
              <input type="text" defaultValue={name} placeholder="Введите название игры"/>
              <Textarea 
                title = 'описание игры'
                value = {description}
              />
            </form>
          </div>          
        </section>
        <section className="Games Container">
          <div className="Container__title">Участники <p className="Container__title__counter">2</p></div>
          <div className="Participants__wrapper">
            <div className="Participants_info">
              <div className="info">
                <p className="info__counter">4</p>
                <p className="info__desc">Прошли</p>
              </div>
            </div>
            <div className="Participants">
              <Participant 
                name = 'Имя'
                secondname = 'Фамилия' 
                middlename = 'Отчество' 
              />
            </div>
          </div>
        </section>
        <section className="Games Container">
        <div className="Container__title">Вопросы игры</div>
          <div className="Buttons__wrapper">
            <span role="button" className="button">Добавить вопрос</span>
          </div>
          <div className="Questions__wrapper">
            {questions.map((question, idx) => (
              <Question 
                title={`Вопрос №${question.id}`}
                counter={idx+1}
                id = {idx}
                specType={question.type}
                specUUD={question.direction[0]}
                text={question.question}
                subject={question.subject}
                answers={question.answer}
                active={idx === this.state.activeIndex ? 'question--viewed' : ''} 
                onClick={this.handleTabSelect}
              />
            ))}     
          </div>
        </section>
      </main>
    );
  }
}


TeacherGameSettingsPage.propTypes = propTypes;

export default TeacherGameSettingsPage;
