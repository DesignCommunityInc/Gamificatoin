import React from 'react';
import { PropTypes } from 'prop-types';
import uid from 'uid';
import Header from '../../Header';
import Settings from '../../Settings';
import Type from './Type';
import Textarea from '../../Textarea';
import Button from '../../Button';
import Utils from '../../../utils/Utils';

const propTypes = {
  // isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
  userData: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  createGame: PropTypes.func.isRequired,
  generateGame: PropTypes.func.isRequired,
};

class TeacherCreatingPage extends React.Component {
  constructor() {
    super();
    this.moveForward = this.moveForward.bind(this);
    this.createGameRequest = this.createGameRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClassSelect = this.handleClassSelect.bind(this);
    this.handleGameTypeSelect = this.handleGameTypeSelect.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollVisibility = this.scrollVisibility.bind(this);
    this.state = {
      activeClass: null,
      activeGameType: null,
      activeType: null,
      gameName: null,
      gameDescription: 'Описание',
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      timeToGoM: null,
      timeToGoH: null,
      range: 1,
      questionCount: 10,
    };
  }

  scrollVisibility() {
    if (this.wrapper.offsetWidth <= this.classesContainer.offsetWidth && this.forward) {
      this.forward.classList.add('hidden');
    }
  }

  handleScroll() {
    const container = this.classesContainer;
    const limit = container.scrollWidth - container.clientWidth;
    switch (Math.floor(container.scrollLeft)) {
      case limit: this.forward.classList.add('hidden');
        break;
      case 0: this.backward.classList.add('hidden');
        break;
      default:
        this.backward.classList.remove('hidden');
        this.forward.classList.remove('hidden');
        break;
    }
  }

  moveForward() {
    Utils.forward(this.classesContainer, -350);
  }

  moveBack() {
    Utils.backward(this.classesContainer, 350);
  }

  handleClassSelect(idx) {
    const { activeClass } = this.state;
    this.setState({ activeClass: idx === activeClass ? null : idx });
  }

  handleGameTypeSelect(idx) {
    const { activeGameType } = this.state;
    this.setState({ activeGameType: idx === activeGameType ? null : idx });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleTypeSelect(idx) {
    const { activeType } = this.state;
    this.setState({ activeType: idx === activeType ? null : idx });
  }

  handleSelect(e) {
    this.setState({ range: e.target.value });
  }

  createGameRequest() {
    const {
      history,
      createGame,
      userData: { roles } = {},
      generateGame,
    } = this.props;
    const role = Object.keys(roles || {})[0];
    const {
      activeType,
      activeGameType,
      activeClass,
      gameName,
      gameDescription,
      timeToGoH,
      timeToGoM,
      startDate,
      startTime,
      endDate,
      endTime,
      range,
      questionCount,
    } = this.state;
    if (role === '6') {
      createGame({
        name: gameName,
        description: gameDescription,
        publicity: activeType,
        randomize: 0,
        type: activeGameType,
        class: activeClass,
        time: `${timeToGoH}:${timeToGoM}`,
        start_date: `${startDate} ${startTime}`,
        finish_date: `${endDate} ${endTime}`,
      }, history);
    } else if (role === '5') {
      generateGame({
        name: gameName,
        description: gameDescription,
        question_class: activeClass,
        question_range: range,
        question_count: questionCount,
        question_subject: null,
      }, history);
    }
  }

  render() {
    const {
      userData: {
        roles,
      },
    } = this.props;
    let role = null;
    if (roles) {
      role = Object.keys(roles || {})[0];
    }
    const timeRegEx = '^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$';
    const {
      startDate,
      startTime,
      activeType,
      activeClass,
      activeGameType,
      endDate,
      endTime,
      timeToGoH,
      timeToGoM,
      gameName,
      questionCount,
      range,
    } = this.state;
    return (
      <main className="page">
        <Header title="Создание игры" />
        <Settings />
        <section className="Information Container">
          <div className="Information__wrapper">
            <div className="Information__game__image" />
            <form>
              <input name="gameName" defaultValue={gameName} onChange={this.handleChange} type="text" placeholder="название" />
              <Textarea
                title="описание игры"
                value=""
              />
            </form>
          </div>
        </section>
        <section className="Options Container">
          <div className="Container__title">Настройки</div>
          <div className="Options__inside__wrapper">
            <div className="Options__inside__wrapper__title">Класс</div>
            <span
              className="Games__scroller Games__scroller--indents"
              type="backward"
              onClick={this.moveBack}
              tabIndex="0"
              role="button"
              onKeyDown={() => {}}
              ref={(button) => {
                this.backward = button;
              }}
            />
            <span
              className="Games__scroller Games__scroller--indents"
              type="forward"
              onClick={this.moveForward}
              tabIndex="0"
              role="button"
              onKeyDown={() => {}}
              ref={(button) => {
                this.forward = button;
              }}
            />
            <div
              className="Games__container Games__container-scroll Classes__container"
              ref={(container) => {
                this.classesContainer = container;
              }}
              onScroll={this.handleScroll}
            >
              <div
                className="Games__container__wrapper Inside__container__wrapper Games__container__wrapper__last"
                ref={(wrapper) => {
                  this.wrapper = wrapper;
                }}
              >
                {[...Array(11)].map((_, idx) => (
                  <Button
                    key={uid()}
                    onClick={() => this.handleClassSelect(idx + 1)}
                    title={`${idx + 1}`}
                    className={`Options__class ${activeClass === idx + 1 ? 'Options__class--active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
          {role && role === '6' ? (
            <>
              <div className="Options__side Options__side__left">
                <Type
                  onClick={this.handleTypeSelect}
                  list={['Открытый', 'Приватный']}
                  title="Публичность"
                  currentItem={activeType}
                />
                <Type
                  onClick={this.handleGameTypeSelect}
                  list={['Онлайн', 'Оффлайн']}
                  title="Тип игры"
                  currentItem={activeGameType}
                />
              </div>
              <div className="Options__side Options__side__right">
                <div className="Options__row">
                  <div className="Options__row__title">Дата начала</div>
                  <div className="Options__row__input">
                    <input name="startDate" defaultValue={startDate} onChange={this.handleChange} type="text" placeholder="ДД.ММ.ГГГГ" />
                    <input name="startTime" defaultValue={startTime} onChange={this.handleChange} type="text" placeholder="ЧЧ:ММ" />
                  </div>
                </div>
                <div className="Options__row">
                  <div className="Options__row__title">Дата оконачния</div>
                  <div className="Options__row__input">
                    <input name="endDate" defaultValue={endDate} onChange={this.handleChange} type="text" placeholder="ДД.ММ.ГГГГ" />
                    <input name="endTime" defaultValue={endTime} onChange={this.handleChange} type="text" placeholder="ЧЧ:ММ" />
                  </div>
                </div>
                <div className="Options__row">
                  <div className="Options__row__title">Время на прохождение</div>
                  <div className="Options__row__input">
                    <input
                      name="timeToGoH"
                      defaultValue={timeToGoH}
                      onChange={this.handleChange}
                      type="text"
                      pattern={timeRegEx}
                      placeholder="Часы"
                    />
                    :
                    <input
                      name="timeToGoM"
                      defaultValue={timeToGoM}
                      onChange={this.handleChange}
                      type="text"
                      pattern={timeRegEx}
                      placeholder="Минуты"
                    />
                  </div>
                </div>
                <input type="submit" onClick={this.createGameRequest} value="Создать" />
              </div>
            </>
          ) : (
            <div className="Options__side Options__side__right">
              <div className="Options__row">
                <div className="Options__row__title">Количество вопросов</div>
                <div className="Options__row__input">
                  <input name="questionCount" min="1" defaultValue={questionCount} onChange={this.handleChange} type="number" placeholder="Количество вопросов" />
                </div>
              </div>
              <div className="Options__row">
                <div className="Options__row__title">Сложность</div>
                <div className="Options__row__input">
                  <select
                    name="difficulty"
                    className="Options__row__select"
                    onChange={this.handleSelect}
                    value={range}
                  >
                    <option value="1">Легкий</option>
                    <option value="2">Средний</option>
                    <option value="3">Тяжелый</option>
                  </select>
                </div>
              </div>
              <input type="submit" onClick={this.createGameRequest} value="Создать" />
            </div>
          )}
        </section>
      </main>
    );
  }
}


TeacherCreatingPage.propTypes = propTypes;

export default TeacherCreatingPage;
