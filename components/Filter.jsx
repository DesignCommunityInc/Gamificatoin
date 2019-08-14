/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import uid from 'uid';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

const propTypes = {
  sort: PropTypes.shape({}).isRequired,
  sortAction: PropTypes.func.isRequired,
  sortFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterAction: PropTypes.func.isRequired,
  filterFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  apply: PropTypes.func.isRequired,
};

// const defaultProps = {
// }

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      asc: true,
    };
  }

  render() {
    const {
      // sort,
      sortAction,
      sortFields,
      filter,
      filterAction,
      filterFields,
      apply,
    } = this.props;
    const { asc } = this.state;
    return (
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
                htmlFor={flt}
                className="Filter__field"
                onClick={() => filterAction(flt, filter)}
                name={flt}
              >
                <span className="Filter__field-name">{flt}</span>
                <span className="Filter__field-value">
                  <Checkbox
                    id={flt}
                    type="checkbox"
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
              <span className="button button-main button-main-violet button-iconless">Применить</span>
            </div>
            {sortFields.map(srt => (
              <label
                key={uid()}
                htmlFor={srt}
                className="Filter__field"
                onClick={() => sortAction(srt, asc)}
                name={srt}
              >
                <span className="Filter__field-name">{srt}</span>
                <span className="Filter__field-value">
                  <Checkbox
                    id={srt}
                    type="radio"
                  />
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="Filter__container Sort">
          <span
            className={`button button-icon button-icon-sort ${asc ? '' : 'sort-desc'}`}
            button-sort=""
            onClick={() => { this.setState({ asc: !asc }); }}
            role="button"
            tabIndex="0"
            onKeyDown={() => {}}
          />
        </div>
      </section>
    );
  }
}


Filter.propTypes = propTypes;
// Filter.defaultTypes = defaultTypes;

export default Filter;
