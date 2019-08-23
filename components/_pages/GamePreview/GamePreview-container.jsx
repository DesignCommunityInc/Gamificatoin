import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../Header';
import Settings from '../../Settings';
import Info from './Info';
import Classmates from '../../Classmates';
import Rules from './Rules';
import Utils from '../../../utils/Utils';
import Alert from '../../Alert';
import Button from '../../Button';

const propTypes = {
  location: PropTypes.shape({}).isRequired,
  classmates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  preview: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchGamePreview: PropTypes.func.isRequired,
};

class GamePreview extends React.Component {
  constructor() {
    super();
    this.handleStart = this.handleStart.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
    this.state = {
      // start: false,
    };
    this.alert = React.createRef();
  }

  componentDidMount() {
    // Utils.scrollTo(document.documentElement, 0, 0);
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
    if (current) {
      current.showAlert();
    }
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
      preview: {
        img,
      } = {},
      classmates,
      isLoading,
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
        />
        <Info image={img} />
        <section className="Container">
          <Classmates
            mateList={classmates}
            isLoading={isLoading}
          />
          <Rules />
        </section>
        <section className="Container">
          <Button
            onClick={this.handleStart}
            className="button button-action"
            title="Играть"
          />
        </section>
      </main>
    )
  }
}

GamePreview.propTypes = propTypes;
// export default withRouter(props => <GameInside {...props} />) 
export default GamePreview;
