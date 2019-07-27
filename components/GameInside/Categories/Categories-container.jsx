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
    this.categories = [];
    this.handleClick = this.handleClick.bind(this);
    this.componentCleanUp = this.componentCleanUp.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.categories.shift().classList.add('Categories__unit--animate');
      if(!this.categories.length) {
        clearInterval(this.interval)
        this.categoriesContainer.classList.add('Categories--animate');
      };
    }, 300);
  }
  // componentDidUpdate() {
  //   if(this.categories.length === 0 || this.props.isCategoryChosen) return false;
  //   this.interval = setInterval(() => {
  //     this.categories.shift().classList.add('Categories__unit--animate');
  //     if(!this.categories.length) {
  //       clearInterval(this.interval)
  //       this.categoriesContainer.classList.add('Categories--animate');
  //     };
  //   }, 300);
  // }
  componentWillUnmount() {
    // this.componentCleanUp();
    clearInterval(this.interval);
  }
  // componentCleanUp() {
  // }
  handleClick(e) {
    const target = e.target;
    const category = target.getAttribute("id");
    this.choosingContainer.innerHTML = category;
    this.choosingContainer.classList.add('choosing__category-active');
    setTimeout(() => { this.props.chooseCategory({ id: category }) }, 2000);
  }
  render() {
    const { categoriesList, isCategoryChosen } = this.props;
    return (
      <section className={isCategoryChosen 
        ? "Game Game-fullscreen unvisible" 
        : "Game Game-fullscreen"}>
        <div 
          className="choosing__category"
          ref={(container) => {
            this.choosingContainer = container;
          }}
        />
        <div className="Categories"
          ref={(ref) => {
            this.categoriesContainer = ref;
          }}>
          {categoriesList.map((category, idx) => 
            <div 
              key={idx}
              id={category}
              className="Categories__unit"
              onClick={this.handleClick}
              ref={(ref) => {
                this.categories.push(ref);
              }}>
              {category}
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