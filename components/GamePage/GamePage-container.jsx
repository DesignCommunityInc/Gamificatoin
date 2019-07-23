import React from 'react'
// import { PropTypes } from "prop-types";
import Header from '../../containers/HeaderContainer';
import Settings from '../Settings';
import Gamelist from '../Gamelist';
import Mode from './Mode';
import Utils from '../../utils/Utils';
import { Link } from 'react-router-dom';


class GamePage extends React.Component {
  // constructor() {
  //   super();
  // }
  componentDidMount() {
    this.props.fetchGameList();
  }
  render() {
    const { isLoading, data } = this.props;
    const { invites, recommendation, completed } = data;
   return (
    <main className="page">
      <Header />
      <Settings />
      
      <section className="Games Container">
      <Link to="/" className="Container__title Container__title-backward">Мои игры</Link> 
        <div className="Games__container Games__container-bottom-offset">
          <Mode 
            title="1 на 1" 
            link="1"
          />
          <Mode 
            title="Саморазвития" 
            link="2"
          />
        </div>
      </section>
      {invites.data !== null && 
        <Gamelist 
          title={invites.title}
          list={invites.data}
          isLoading={isLoading}
        />
      }
      {recommendation.data !== null && 
        <Gamelist 
          title={recommendation.title}
          list={recommendation.data}
          isLoading={isLoading}
        />
      }
      {completed.data !== null && 
        <Gamelist 
          title={completed.title}
          list={completed.data}
          isLoading={isLoading}
        />
      }   
    </main>
   )
  }
}


// GamePage.propTypes = propTypes;
// GamePage.defaultTypes = defaultTypes;

export default GamePage;
