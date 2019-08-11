import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../containers/HeaderContainer';
import Settings from '../Settings';
import Info from './Info';
import Classmates from '../Classmates';
import Rules from './Rules';
import Utils from '../../utils/Utils';
import Timer from '../Timer';
import Alert from '../Alert';

const propTypes = {
  match: PropTypes.shape({}).isRequired,
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
  }

  componentDidMount() {
    Utils.scrollTo(document.documentElement, 0, 0);

    const {
      match: {
        params: { id },
      } = {},
      fetchGamePreview,
    } = this.props;
    fetchGamePreview(id);
  }

  handleStart() {
    // const { start } = this.state;
    if (this.alert) {
      this.alert.showAlert();
    }
    // if (start) {
    // }
    // this.setState({ start: true });
  }

  handleStartSubmit() {
    const { location: { pathname }, history } = this.props;
    history.push(`${pathname}/play`);
  }

  render() {
    const { preview } = this.props;
    return (
      <main className="page">
        <Settings />
        <Header />
        <Timer />
        {/* if helpers are available, render alert there => alert = helper */}
        <Alert 
          ref={(ref) => {
            this.alert = ref;
          }} 
          onClick={this.handleStartSubmit}
        />
        <Info image={preview.img}/>
        <section className="Container">
          <Classmates />
          <Rules />
        </section>
        <section className="Container">
          <span
            onClick={this.handleStart}
            className="button button-action">
            Играть
          </span>
        </section>
      </main>
    )
  }
}

GamePreview.propTypes = propTypes;
// export default withRouter(props => <GameInside {...props} />) 
export default GamePreview;
