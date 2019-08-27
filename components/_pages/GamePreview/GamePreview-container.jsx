import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Header';
import Settings from '../../Settings';
import Info from './Info';
import Classmates from '../../Classmates';
import Rules from './Rules';
import Alert from '../../Alert';
import Button from '../../Button';

const propTypes = {
  location: PropTypes.shape({}).isRequired,
  classmates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  preview: PropTypes.shape({}).isRequired,
  helpers: PropTypes.bool.isRequired,
  isClassmatesLoading: PropTypes.bool.isRequired,
  fetchGamePreview: PropTypes.func.isRequired,
};

class GamePreview extends React.Component {
  constructor() {
    super();
    this.handleStart = this.handleStart.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
    this.alert = React.createRef();
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      } = {},
      fetchGamePreview,
    } = this.props;
    fetchGamePreview(id);
  }

  handleStart() {
    const { current } = this.alert;
    if (current) current.showAlert();
  }

  handleStartSubmit() {
    const {
      location: {
        pathname,
      } = {},
      history: {
        push,
      } = {},
    } = this.props;
    push(`${pathname}/play`);
  }

  render() {
    const {
      preview,
      preview: {
        img,
      } = {},
      classmates,
      // isLoading,
      isClassmatesLoading,
      helpers,
    } = this.props;
    return (
      <main className="page">
        <Settings />
        <Header
          title="Правила игры"
        />
        {/* if helpers are available, render alert there => alert = helper */}
        <Alert
          ref={this.alert}
          onClick={this.handleStartSubmit}
          enable={helpers}
        />
        <Info image="https://blog.schoolspecialty.com/wp-content/uploads/2017/04/How-to-Help-Your-Students-Overcome-Math-Anxiety-1200x624.jpg" />
        <section className="Container">
          <Rules {...preview} />
          <Classmates
            mateList={classmates}
            isLoading={isClassmatesLoading}
          />
        </section>
        <section className="Container">
          <Button
            onClick={this.handleStart}
            className="button button-action"
            title="Играть"
          />
        </section>
      </main>
    );
  }
}

GamePreview.propTypes = propTypes;
export default GamePreview;
