import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../Header';
import Settings from '../Settings';
import Type from './Type';
import GameType from './GameType';
import Class from './Class';
import Textarea from '../Textarea';
import Utils from '../../utils/Utils';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

class TeacherCreatingPage extends React.Component {
  constructor(){
    super();
    this.moveForward = this.moveForward.bind(this);
    this.classesLoop = this.classesLoop.bind(this);
    this.createGameRequest = this.createGameRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClassSelect = this.handleClassSelect.bind(this);
    this.handleGameTypeSelect = this.handleGameTypeSelect.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollVisibility = this.scrollVisibility.bind(this);
    this.state = {
        activeClass: null,
        activeGameType: null,
        activeType: null,
        gameName: null,
        gameDescription: null,
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        timeToGoM: null,
        timeToGoH: null
      }
  }

  componentDidMount() {
    const { fetchTeacherGames } = this.props;
    // fetchTeacherGames();
  }

  

  scrollVisibility() {
    if (this.wrapper.offsetWidth <= this.gamesContainer.offsetWidth && this.forward) {
      this.forward.classList.add('hidden');
    }
  }

  handleScroll() {
    const container = this.gamesContainer;
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
    Utils.forward(this.gamesContainer, -350);
  }

  moveBack() {
    Utils.backward(this.gamesContainer, 350);
  }
  
  classesLoop() {
    let classes = [];
    const { activeClass } = this.state;
    for (let i = 1; i <= 11; i++) {
        const active = i === parseInt(activeClass) ? "Options__class--active" : "";
        classes.push(<Class onClick={this.handleClassSelect} name={i} id={i} active={active} />)
      }
      return classes
  }

  handleClassSelect(idx) {
    const { activeClass } = this.state;
    console.log(activeClass);
    if (activeClass === idx) {
      idx = null;
    }
    this.setState({activeClass: idx});
 }

 handleGameTypeSelect(idx) {
    const { activeGameType } = this.state;
    console.log(activeGameType);
    if (activeGameType === idx) {
      idx = null;
    }
    this.setState({activeGameType: idx});
 }

 handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

 handleTypeSelect(idx) {
    const { activeType } = this.state;
    if (activeType === idx) {
      idx = null;
    }
    this.setState({activeType: idx});
 }

 createGameRequest() {
    const { activeType, activeGameType, activeClass, gameName, gameDescription, timeToGoH, timeToGoM, startDate, startTime, endDate, endTime } = this.state;
    const fields = {
        name: gameName,
        description: gameDescription,
        publicity: activeType,
        randomize: 0,
        type:  activeGameType,
        class: activeClass,
        time: timeToGoH + ":" + timeToGoM,
        start_date: startDate + " " + startTime,
        finish_date: endDate + " " + endTime,
    }
    console.log(fields);
 }

  render() {
    const {
      isLoading,
      data: {
      } = {},
      location: {
        pathname,
      } = {},
        timeRegEx = "^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$"
    } = this.props;

    // console.log(started);
    
    return (
      <main className="page">
        <Header 
          title="Создание игры"
        />
        <Settings />
        <section className="Information Container">
          <div className="Information__wrapper">
            <div className="Information__game__image"/>
            <form >
              <input name="gameName" defaultValue={this.state.gameName} onChange={this.handleChange} type="text" placeholder="название"/>
              <Textarea
                title="описание игры"
                value=""
              />
            </form>
          </div>
        </section>
        <section className="Options Container">
          <div className="Container__title">Настройки</div>
          <div className="Options__side Options__side__left">
            <div className="Options__type__wrapper">
                <Type
                    name="Приватный"
                    id="0"
                    active={parseInt(this.state.activeType) === 0 ? "Options__type--active" : ""}
                    onClick={this.handleTypeSelect}
                    />
                <Type
                    name="Открытый"
                    id="1"
                    active={parseInt(this.state.activeType) === 1 ? "Options__type--active" : ""}
                    onClick={this.handleTypeSelect}
                />
            </div>
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
                    {this.classesLoop()}
                </div>
                </div>
            </div>
            <div className="Options__inside__wrapper">
                <div className="Options__inside__wrapper__title">Тип игры</div>
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
                className="Games__container Games__container-scroll"
                ref={(container) => {
                    this.gamesContainer = container;
                }}
                onScroll={this.handleScroll}
                >
                <div
                    className="Games__container__wrapper Inside__container__wrapper Games__container__wrapper__last"
                    ref={(wrapper) => {
                    this.wrapper = wrapper;
                    }}
                >
                    <GameType 
                        name = "Онлайн"
                        id="1"
                        onClick={this.handleGameTypeSelect}
                        active={parseInt(this.state.activeGameType) === 0 ? "Options__game__type--active" : ""}
                    />
                    <GameType 
                        name = "Оффлайн"
                        id="0"
                        onClick={this.handleGameTypeSelect}
                        active={parseInt(this.state.activeGameType) === 1 ? "Options__game__type--active" : ""}
                    />
                </div>
                </div>
            </div>
          </div>
          <div className="Options__side Options__side__right">
              <div className="Options__row">
                  <div className="Options__row__title">Дата начала</div>
                  <div className="Options__row__input">
                      <input name="startDate" defaultValue={this.state.startDate} onChange={this.handleChange} type="text" placeholder="ДД.ММ.ГГГГ"/>
                      <input name="startTime" defaultValue={this.state.startTime} onChange={this.handleChange} type="text" placeholder="ЧЧ:ММ"/>
                  </div>
              </div>
              <div className="Options__row">
                  <div className="Options__row__title">Дата оконачния</div>
                  <div className="Options__row__input">
                      <input name="endDate" defaultValue={this.state.endDate} onChange={this.handleChange} type="text" placeholder="ДД.ММ.ГГГГ"/>
                      <input name="endTime" defaultValue={this.state.endTime} onChange={this.handleChange} type="text" placeholder="ЧЧ:ММ"/>
                  </div>
              </div>
              <div className="Options__row">
                  <div className="Options__row__title">Время на прохождение</div>
                  <div className="Options__row__input">
                      <input name="timeToGoH" defaultValue={this.state.timeToGoH} onChange={this.handleChange} type="text" pattern={timeRegEx} placeholder="Часы"/>
                      :
                      <input name="timeToGoM" defaultValue={this.state.timeToGoM} onChange={this.handleChange} type="text" pattern={timeRegEx} placeholder="Минуты"/>
                  </div>
              </div>
              <input type="submit" onClick={this.createGameRequest} value="Создать"/>
          </div>
        </section>
      </main>
    );
  }
}


TeacherCreatingPage.propTypes = propTypes;

export default TeacherCreatingPage;
