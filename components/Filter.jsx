/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import uid from 'uid';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import filterIcon from '../styles/assets/question_filter.png';

const propTypes = {
  inline: PropTypes.bool,
  sort: PropTypes.string,
  desc: PropTypes.bool,
  sortAction: PropTypes.func,
  sortFields: PropTypes.arrayOf(PropTypes.shape({})),
  filter: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({}),
  ]).isRequired,
  filterAction: PropTypes.func.isRequired,
  filterFields: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]).isRequired,
  apply: PropTypes.func.isRequired,
  descToggler: PropTypes.func,
};

const defaultProps = {
  inline: false,
  sortFields: [],
  sortAction: () => {},
  desc: false,
  sort: '',
  descToggler: () => {},
};
function switchTitle(title) {
  switch (title) {
    case 'class': return 'Класс';
    case 'direction': return 'Направление';
    case 'range': return 'Сложность';
    case 'subject': return 'Предмет';
    case 'type': return 'Тип';
    default: return 'Поле фильтрации';
  }
}

const Filter = ({
  inline,
  sort,
  desc,
  descToggler,
  sortAction,
  sortFields,
  filter,
  filterAction,
  filterFields,
  apply,
}) => (!inline ? (
  <section className="Filter">
    <div className="Filter__container">
      <span className="button button-main button-main-violet">Фильтр</span>
      <div className="Filter__body">
        <div className="Filter__header">
          <span
            className="button button-main button-main-violet button"
            onClick={apply}
            onKeyDown={() => {}}
            tabIndex="0"
            role="button"
          >
            Применить
          </span>
        </div>
        {filterFields.map(flt => (
          <label
            key={uid()}
            htmlFor={Object.keys(flt)[0]}
            className="Filter__field"
          >
            <span className="Filter__field-name">{Object.values(flt)[0]}</span>
            <span className="Filter__field-value">
              <Checkbox
                id={Object.keys(flt)[0]}
                type="checkbox"
                onClick={() => filterAction(Object.keys(flt)[0], filter)}
                defaultChecked={filter.indexOf(Object.keys(flt)[0]) !== -1}
              />
            </span>
          </label>
        ))}
      </div>
    </div>
    <div className="Filter__container Sort">
      <span className="button button-main button-main-violet">Сортировка</span>
      <div className="Filter__body">
        <div className="Filter__header">
          <span
            className="button button-main button-main-violet button"
            onClick={() => apply()}
            onKeyDown={() => {}}
            tabIndex="0"
            role="button"
          >
            Применить
          </span>
        </div>
        {sortFields.map(srt => (
          <label
            key={uid()}
            htmlFor={Object.keys(srt)[0]}
            className="Filter__field"
          >
            <span className="Filter__field-name">{Object.values(srt)[0]}</span>
            <span className="Filter__field-value">
              <Checkbox
                id={Object.keys(srt)[0]}
                type="radio"
                onClick={() => sortAction(Object.keys(srt)[0])}
                defaultChecked={sort === Object.keys(srt)[0]}
              />
            </span>
          </label>
        ))}
      </div>
    </div>
    <div className="Filter__container Sort">
      <span
        className={`button button-ico button-ico-sort ${!desc ? 'sort-desc' : ''}`}
        button-sort=""
        onClick={descToggler}
        role="button"
        tabIndex="0"
        onKeyDown={() => {}}
      />
    </div>
  </section>
) : (
  <section className="Filter Filter--inline">
    <div className="Filter__header Filter__header--inline" style={{ backgroundImage: `url('${filterIcon}')` }} />
    <div className="Filter__container Filter__container--inline">
      <div className="Filter__body Filter__body--inline">
        {Object.keys(filterFields).map(field => (
          <div key={uid()}>
            <div>{switchTitle(field)}</div>
            {filterFields[field].map(value => (
              <label
                key={uid()}
                htmlFor={`${value.id}-${value.name}`}
                className="Filter__field"
                name={field}
              >
                <span className="Filter__field-value Filter__field-value--inline">
                  <Checkbox
                    id={`${value.id}-${value.name}`}
                    type="radio"
                    name={field}
                    onClick={() => filterAction(field, value.id, filter)}
                    defaultChecked={filter[field] === value.id}
                  />
                </span>
                <span className="Filter__field-name Filter__field-name--inline">{value.name}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
    <div className="Filter__footer">
      <span
        className="button button-main button-main-violet button"
        onClick={apply}
        onKeyDown={() => {}}
        tabIndex="0"
        role="button"
      >
        Применить
      </span>
    </div>
  </section>
));

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;

export default Filter;
