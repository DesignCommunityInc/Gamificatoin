import React from 'react'
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};
const defaultTypes = {
    data: {
      name: ""
    }
};

class Rate extends React.Component {
  render() {
    const { isLoading, data } = this.props;
    const { name, last_name, second_name, photo } = data;
    const style = { backgroundImage: `url('${photo}')` };
    return (
      <section className="Rate">
        <Link to="/my/rate" className="Container__title Container__title-forward">Рейтинг</Link>
        <div className="Rate__container">
          <div className="Rate__container__tags__wrapper">
            <span className="tag">В школе</span>
            <span className="tag">4А - 4Я</span>
            <span className="tag">4Б</span>
          </div>
          <div className="Rate__container__current">
            <span className="Rate__container__current__position">1</span>
            <span className="Rate__container__current__image" style={style}/>
            <div className="Rate__container__current__info">
              <h2>{name}</h2>
              <h4>{last_name} {second_name}</h4>
            </div>
          </div>
        </div>
      </section>
    )
  }
}


Rate.propTypes = propTypes;
Rate.defaultTypes = defaultTypes;

export default Rate;