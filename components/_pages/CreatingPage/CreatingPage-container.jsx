import React from 'react';
import { PropTypes } from 'prop-types';
import uid from 'uid';
import Header from '../../Header';
import Settings from '../../Settings';
import Type from './Type';
import Textarea from '../../Textarea';
import Button from '../../Button';
import UserAdd from './UserAdd';
import List from './List';
import createGame, { generateGame, generateTeacherGame } from './CreatingPage-action';

const propTypes = {
  // isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  classmates: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]).isRequired,
  userData: PropTypes.shape({}).isRequired,
  filterList: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

class CreatingPage extends React.Component {
  constructor() {
    super();
    this.createGameRequest = this.createGameRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClassSelect = this.handleClassSelect.bind(this);
    this.handleGameTypeSelect = this.handleGameTypeSelect.bind(this);
    this.handleTypeSelect = this.handleTypeSelect.bind(this);
    this.handleRangeSelect = this.handleRangeSelect.bind(this);
    this.handleUserSelect = this.handleUserSelect.bind(this);
    this.handleSubjectSelect = this.handleSubjectSelect.bind(this);
    this.state = {
      activeClass: 1,
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
      activeSubject: null,
      activeDirection: null,
      activeRange: 0,
      activeUsers: [],
      questionCount: 10,
    };
  }

  handleClassSelect(idx) {
    const { activeClass } = this.state;
    this.setState({ activeClass: idx === activeClass ? 1 : idx });
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

  handleRangeSelect(idx) {
    const { activeRange } = this.state;
    this.setState({ activeRange: idx === activeRange ? 0 : idx });
  }

  handleSubjectSelect(idx) {
    const { activeSubject } = this.state;
    this.setState({ activeSubject: idx === activeSubject ? null : idx });
  }

  handleDirectionSelect(idx) {
    const { activeDirection } = this.state;
    this.setState({ activeDirection: idx === activeDirection ? null : idx });
  }

  handleUserSelect(user) {
    const { activeUsers } = this.state;
    console.log(user);
    const { userData: { roles } = {} } = this.props;
    if (Object.keys(roles)[0] === '5') {
      this.setState({ activeUsers: [user] });
      return;
    }
    const index = activeUsers.indexOf(user);
    if (index === -1) {
      this.setState({ activeUsers: [...activeUsers, user] });
    } else {
      this.setState({
        activeUsers: [
          ...activeUsers.slice(0, index),
          ...activeUsers.slice(index + 1),
        ],
      });
    }
  }

  createGameRequest() {
    const {
      history,
      userData: { roles } = {},
      match: {
        params: { mode },
      } = {},
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
      activeRange,
      questionCount,
      activeUsers,
      activeSubject,
    } = this.state;
    if (role === '6') {
      if (mode === 'generate') {
        generateTeacherGame({
          name: gameName,
          description: gameDescription,
          randomize: 0,
          type: activeGameType,
          time: `${timeToGoH}:${timeToGoM}`,
          publicity: activeType,
          class: activeClass,
          question_public: activeType,
          question_class: activeClass,
          question_range: activeRange,
          question_count: questionCount,
          question_subject: activeSubject,
        }, history);
      } else {
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
      }
    } else if (role === '5') {
      if (mode === 'versus') {
        console.log('Режим 1 на 1 еще не доработан');
      } else {
        generateGame({
          name: gameName,
          description: gameDescription,
          question_class: activeClass,
          question_range: activeRange,
          question_count: questionCount,
          question_subject: activeSubject,
        }, history);
      }
    }
  }

  render() {
    const {
      userData: {
        roles,
      } = {},
      classmates,
      filterList: {
        range,
        subject,
        direction,
      } = {},
      match: {
        params: { mode },
      } = {},
    } = this.props;
    let role = null;
    if (roles) {
      [role] = Object.keys(roles || {});
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
      activeSubject,
      activeRange,
      activeUsers,
      activeDirection,
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
          <List
            title="Класс"
          >
            {[...Array(11)].map((_, idx) => (
              <Button
                key={uid()}
                onClick={() => this.handleClassSelect(idx + 1)}
                title={`${idx + 1}`}
                className={`Options__class ${activeClass === idx + 1 ? 'Options__class--active' : ''}`}
              />
            ))}
          </List>
          {role && role === '6' ? (
            <>
              <div className="Options__side Options__side__left">
                {mode === 'generate' && (
                  <>
                    <List
                      title="Сложность"
                    >
                      {range && range.map(rng => (
                        <Button
                          key={uid()}
                          onClick={() => this.handleRangeSelect(rng.id)}
                          title={rng.name}
                          className={`Options__class Options__class--large ${activeRange === rng.id ? 'Options__class--active' : ''}`}
                        />
                      ))}
                    </List>
                    <List
                      title="УУД"
                    >
                      {direction && direction.map(drc => (
                        <Button
                          key={uid()}
                          onClick={() => this.handleDirectionSelect(drc.id)}
                          title={drc.name}
                          className={`Options__class Options__class--large ${activeDirection === drc.id ? 'Options__class--active' : ''}`}
                        />
                      ))}
                    </List>
                    <List
                      title="Предмет"
                    >
                      {subject && subject.map(sbj => (
                        <Button
                          key={uid()}
                          onClick={() => this.handleSubjectSelect(sbj.id)}
                          title={sbj.name}
                          className={`Options__class Options__class--large ${activeSubject === sbj.id ? 'Options__class--active' : ''}`}
                        />
                      ))}
                    </List>
                  </>
                )}
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
                {mode === 'generate' && (
                  <div className="Options__row">
                    <div className="Options__row__title">Количество вопросов</div>
                    <div className="Options__row__input">
                      <input name="questionCount" min="1" defaultValue={questionCount} onChange={this.handleChange} type="number" placeholder="Количество вопросов" />
                    </div>
                  </div>
                )}
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
            <>
              <div className="Options__side Options__side__left">
                <List
                  title="Сложность"
                >
                  {range && range.map(rng => (
                    <Button
                      key={uid()}
                      onClick={() => this.handleRangeSelect(rng.id)}
                      title={rng.name}
                      className={`Options__class Options__class--large ${activeRange === rng.id ? 'Options__class--active' : ''}`}
                    />
                  ))}
                </List>
                <List
                  title="Предмет"
                >
                  {subject && subject.map(sbj => (
                    <Button
                      key={uid()}
                      onClick={() => this.handleSubjectSelect(sbj.id)}
                      title={sbj.name}
                      className={`Options__class Options__class--large ${activeSubject === sbj.id ? 'Options__class--active' : ''}`}
                    />
                  ))}
                </List>
              </div>
              <div className="Options__side Options__side__right">
                <div className="Options__row">
                  <div className="Options__row__title">Количество вопросов</div>
                  <div className="Options__row__input">
                    <input name="questionCount" min="1" defaultValue={questionCount} onChange={this.handleChange} type="number" placeholder="Количество вопросов" />
                  </div>
                </div>
                {mode === 'versus' && (
                  <>
                    <div className="Options__row">
                      <div className="Options__row__title">Участники</div>
                      <UserAdd
                        users={classmates}
                        onClick={this.handleUserSelect}
                        active={activeUsers}
                      />
                    </div>
                  </>
                )}
                <input type="submit" onClick={this.createGameRequest} value="Создать" />
              </div>
            </>
          )}
        </section>
      </main>
    );
  }
}


CreatingPage.propTypes = propTypes;

export default CreatingPage;
