import React from 'react';
// import { withRouter } from 'react-router-dom';
import Header from '../../containers/HeaderContainer';
import Settings from '../Settings';
import Info from './Info';
import Classmates from '../Classmates';
import Rules from './Rules';
import Utils from "../../utils/Utils";
import Alert from '../Alert';

class GameInside extends React.Component {
  constructor() {
    super();
    this.handleStart = this.handleStart.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
    this.state = {
      start: false,
    }
  }
  componentDidMount() {
    Utils.scrollTo(document.documentElement, 0, 0);

    const { match: { params: { id } }} = this.props;
    this.props.fetchGamePreview(id);
  }
  handleStart() {
    if(this.alert) {
      this.alert.showAlert();
    }
    if(this.state.start) {
    }
    this.setState({ start: true });
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

// export default withRouter(props => <GameInside {...props} />) 
export default GameInside ;