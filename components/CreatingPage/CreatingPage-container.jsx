import React from 'react'
// import { PropTypes } from "prop-types";
import Header from '../../containers/HeaderContainer';
import Settings from '../Settings';
import Utils from '../../utils/Utils';
import { Link } from 'react-router-dom';


class CreatingPage extends React.Component {
  // constructor() {
  //   super();
  // }
  componentDidMount() {
    Utils.scrollTo(document.documentElement, 0, 0);
  }
  render() {
    const mode = this.props.match.params.mode;
    const { isLoading, data } = this.props;
   return (
    <main className="page">
     <p>{mode}</p>
    </main>
   )
  }
}


// CreatingPage.propTypes = propTypes;
// CreatingPage.defaultTypes = defaultTypes;

export default CreatingPage;
