import React from 'react'
import { PropTypes } from "prop-types";

const propTypes = {
  // request: PropTypes.object.isRequired,
};
const defaultTypes = {
    // request: {},
};


class Category extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    const target = e.target;
    const category = target.getAttribute("id");
    this.choosingContainer.innerHTML = category;
    this.choosingContainer.classList.add('choosing__category-active');
    setTimeout(() => {this.props.chooseCategory({ id: category })}, 2000);
  }
  render() {
    const { categories, isLoading, isCategoryChosen } = this.props;
    if(isLoading) return (
      <div>Loading...</div>
    );
    return(
      <section className={isCategoryChosen 
        ? "Game Container Game-fullscreen unvisible" 
        : "Game Game-fullscreen Container"}
      >
        <div className="background" />
        <div 
          className="choosing__category"
          ref={(container) => {
            this.choosingContainer = container;
          }}
        />
        <div className="Categories">
          {categories.map((category, idx) => 
            <div 
              key={idx}
              id={category.title}
              className="Categories__unit"
              onClick={this.handleClick}
            >
              {category.title}
            </div>
          )}
        </div>
      </section>
    )
  }
}


Category.propTypes = propTypes;
Category.defaultTypes = defaultTypes;

export default Category;