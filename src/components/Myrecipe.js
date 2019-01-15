import React, { Component } from 'react';


class Myrecipe extends Component {


  render() {
    return (
      <div className="recipe-container">
        <div className="item-list_container">
          <h4>{this.props.label}</h4>
          <img src={this.props.image} alt=''/>
          <button  onClick={() => this.props.recipeDetailCallback()}>Recipe Details </button>
          <button onClick={() => this.props.deleteRecipeCallback()
            }>Delete Recipe</button>

          </div>
        </div>
      )
    }

  }

  export default Myrecipe;
