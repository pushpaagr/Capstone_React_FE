import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Recipe.css";
import axios from 'axios';



class Recipe extends Component {


  render () {
    return(
      <div className="item-list_container">
        <ul className="recipe-items">
          <li>{this.props.label}</li>
          <li><img src={this.props.image} alt=''/></li>
          <li>
            {this.props.user ?
              <button
                onClick={() => this.props.addRecipeActionCallback()}
                className="item__button">Add to Calendar</button> :
                <p></p> }
                </li>

                <li><button  onClick={() => this.props.recipeDetailCallback()}>Recipe Details </button></li>
              </ul>
            </div>
          )
        }

      }
      Recipe.propTypes = {
        label: PropTypes.string

      };


      export default Recipe;
