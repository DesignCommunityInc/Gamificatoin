/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import uid from 'uid';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

const propTypes = {
  sort: PropTypes.string.isRequired,
  desc: PropTypes.bool.isRequired,
  sortAction: PropTypes.func.isRequired,
  sortFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterAction: PropTypes.func.isRequired,
  filterFields: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  apply: PropTypes.func.isRequired,
  descToggler: PropTypes.func.isRequired,
};

const defaultProps = {
  // sort: null,
};

const Filter = ({
  sort,
  desc,
  descToggler,
  sortAction,
  sortFields,
  filter,
  filterAction,
  filterFields,
  apply,
}) => (
  <section className="Filter">
    <div className="Filter__container">
      <span className="button button-main button-main-violet">Фильтр</span>
      <div className="Filter__body">
        <div className="Filter__header">
          <span
            className="button button-main button-main-violet button-iconless"
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
            className="button button-main button-main-violet button-iconless"
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
            name="radiobutton"
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
        className={`button button-icon button-icon-sort ${!desc ? 'sort-desc' : ''}`}
        button-sort=""
        onClick={descToggler}
        role="button"
        tabIndex="0"
        onKeyDown={() => {}}
      />
    </div>
  </section>
);

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;

export default Filter;
