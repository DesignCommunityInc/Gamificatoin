import React from 'react';
import Header from '../../containers/HeaderContainer';
import Settings from '../../containers/SettingsContainer';
import Info from './Info';
import Classmates from '../Classmates';
import Rules from './Rules';
import StartButton from '../Buttons/StartButton';
import Utils from "../../utils/Utils";

export default class GameInside extends React.Component {
  componentDidMount() {
    const { match: { params: { id } }} = this.props;
    this.props.fetchGamePreview(id);
    Utils.scrollTo(document.documentElement, 0, 0);
  }
  render() {
    const { preview, location: { pathname } } = this.props;
    return (
      <main className="page">
        <Settings />
        <Header />
        <Info image={preview.img}/>
        <section className="Container">
          <Classmates />
          <Rules />
        </section>
        <section className="Container">
          <StartButton 
            title="Играть"
            link={`${pathname}/play`}
          />
        </section>
      </main>
    )
  }
}