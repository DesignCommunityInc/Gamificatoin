import React from 'react'
import Checkbox from './Checkbox';
// import { PropTypes } from "prop-types";

const propTypes = {
  
}
const defaultTypes = {
  
}

class Filter extends React.Component {
  constructor() {
    super();

    this.sortAchievements = this.sortAchievements.bind(this);
    this.filterAchievements = this.filterAchievements.bind(this);
    this.filterList = [];
    this.sortField = null;
  }

  sortAchievements(e) {
    e.stopPropagation();
    e.preventDefault();
    let target = e.currentTarget;
    let input = target.querySelector('input');
    let sort = target.getAttribute('name');
    input.checked = !input.checked;
    // sortField = input
  }
  filterAchievements(e) {
    e.stopPropagation();
    e.preventDefault();
    let target = e.currentTarget;
    let input = target.querySelector('input');
    let filter = target.getAttribute('name');
    let filterList = this.filterList;

    input.checked = !input.checked;
    if(filterList.indexOf(filter) === -1)
      filterList.push(filter);
    else
      filterList.splice(filterList.indexOf(filter), 1);

  }
  render() {
    return (
      <section className="Filter">
        <div className="Filter__container">
          <span className="button button-main button-main-violet">Фильтр</span>
          <div className="Filter__body">
            <div className="Filter__header">
              <span className="button button-main button-main-violet button-iconless">Применить</span>
            </div>
            {[...Array(4)].map((_, idx) => 
              <label
                key={`Filter-achievements-${idx}`}
                htmlFor={`Filter-achievements-${idx}-input`}
                className="Filter__field"
                onClick={this.filterAchievements}
                name={`filter-${idx}`}
              >
                <span className="Filter__field-name">Lorem ipsum</span>
                <span className="Filter__field-value">
                  <Checkbox 
                    input={`Filter-achievements-${idx}-input`} 
                    type='checkbox'
                  />
                </span>
              </label>
            )}
          </div>
        </div>
        <div className="Filter__container Sort">
          <span className="button button-main button-main-violet">Сортировка</span>
          <div className="Filter__body">
            <div className="Filter__header">
              <span className="button button-main button-main-violet button-iconless">Применить</span>
            </div>
            <form onSubmit={(e)=>{e.preventDefault()}}>
            {[...Array(4)].map((_, idx) => 
              <label
                key={`Sort-achievements-${idx}`}
                htmlFor={`Sort-achievements-${idx}-input`}
                className="Filter__field"
                onClick={this.sortAchievements}
                name={`sort-${idx}`}
              >
                <span className="Filter__field-name">Lorem ipsum</span>
                <span className="Filter__field-value">
                  <Checkbox 
                    input={`Sort-achievements-${idx}-input`}
                    type='radio'
                  />
                </span>
              </label>
            )}
          </form>
          </div>
        </div>
        <div className="Filter__container Sort">
          <span 
            className="button button-icon button-icon-sort" 
            button-sort=""
            onClick={(e) => {e.target.classList.toggle('sort-desc')}}
          ></span>
        </div>
      </section>
    )
  }
}


Filter.propTypes = propTypes;
Filter.defaultTypes = defaultTypes;

export default Filter;