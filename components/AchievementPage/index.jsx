import React from 'react';
import Header from "../../containers/HeaderContainer";
import SpecialAchievements from "./SpecialAchievements";
import Settings from '../../containers/SettingsContainer';
import Achievements from "./Achievements";
import Utils from "../../utils/Utils";

export default class AchievementsPage extends React.Component {
 
  componentDidMount() {
    Utils.scrollTo(document.documentElement, 0, 0);
  }
  render() {
    return (
      <main className="page"> 
        <Settings />
        <Header />
        <SpecialAchievements />
        <Achievements />
      </main>
    )
  }
}