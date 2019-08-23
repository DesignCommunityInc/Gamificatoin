import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Preloader from '../Preloader';

const propTypes = {
  data: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  rate: PropTypes.number.isRequired,
  isRateLoading: PropTypes.bool.isRequired,
  fetchUserRate: PropTypes.func.isRequired,
};
const defaultProps = {
};

class Rate extends React.Component {
  componentDidMount() {
    const { fetchUserRate } = this.props;
    fetchUserRate('class');
  }

  render() {
    const {
      isLoading,
      data: {
        name,
        last_name: lastName,
        second_name: secondName,
        photo,
        class_letter: letter,
        class_number: number,
      } = {},
      rate,
      isRateLoading,
      fetchUserRate,
    } = this.props;
    return (
      <section className="Rate">
        <div className="Container__title">Рейтинг</div>
        {!isLoading ? (
          <div className="Rate__container">
            <div className="Rate__container__tags__wrapper">
              <Button
                title="В школе"
                className="tag"
                onClick={() => fetchUserRate('class')}
              />
              <Button
                title={`${number}А — ${number}Я`}
                className="tag"
                onClick={() => fetchUserRate('class')}
              />
              <Button
                title={`${number}${letter}`}
                className="tag"
                onClick={() => fetchUserRate('class')}
              />
            </div>
            <span />
            <div className="Rate__container__current">
              {isRateLoading && <Preloader className="Rate__container__current__position" isActive={isRateLoading} />}
              {!isRateLoading && <span className="Rate__container__current__position">{rate}</span>}
              <span className="Rate__container__current__image" style={{ backgroundImage: `url('${photo}')` }} />
              <div className="Rate__container__current__info">
                <h2>{name}</h2>
                <h4>{`${lastName} ${secondName}`}</h4>
              </div>
            </div>
          </div>
        ) : (
          <div className="Rate__container">
            <div className="Rate__container__tags__wrapper">
              <Button
                title="В школе"
                className="tag"
                onClick={() => fetchUserRate('school')}
              />
              <Button
                title="Параллель"
                className="tag"
                onClick={() => fetchUserRate('parallel')}
              />
              <Button
                title="Класс"
                className="tag"
                onClick={() => fetchUserRate('class')}
              />
            </div>
            <span />
            <div className="Rate__container__current">
              <Preloader className="Rate__container__current__position" />
              <span className="Rate__container__current__image" />
              <div className="Rate__container__current__info">
                <h2> </h2>
                <h4> </h4>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}


Rate.propTypes = propTypes;
Rate.defaultProps = defaultProps;

export default Rate;
