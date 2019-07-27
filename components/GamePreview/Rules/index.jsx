import React from 'react'
// import { PropTypes } from "prop-types";
import { Link } from 'react-router-dom';

const Rules = ({ description, type, questions, time }) => {
  return (
    <section className="Games-Preview__rule">
      <Link to="/games/:id/rules" className="Container__title Container__title-forward">Правила игры</Link> 
      <div className="Games-Preview__rule__container">
        <div className="Games-Preview__rule-field">Закрытая игра</div>
        <div className="Games-Preview__rule-field">{questions} плитка</div>
        <div className="Games-Preview__rule-field">{time} минут</div>
        <div className="Games-Preview__rule-title">Правила</div>
        <div className="Games-Preview__rule-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ut aliquam aliquid aspernatur? Enim quae inventore commodi asperiores. Explicabo hic provident autem impedit eligendi blanditiis placeat voluptatum commodi? 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad ut aliquam aliquid aspernatur? Enim quae inventore commodi asperiores. Explicabo hic provident autem impedit eligendi blanditiis placeat voluptatum commodi? 
        </div>
      </div>
    </section>
  )
}


// Rules.propTypes = propTypes;
// Rules.defaultTypes = defaultTypes;

export default Rules;