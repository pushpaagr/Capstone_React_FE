import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Recipe.css";
import axios from 'axios';
import { Card, CardImg, CardBody,
  CardTitle, Button } from 'reactstrap';


  class Recipe extends Component {


    render () {
      return(
        <div className="single-recipe">
            <Card>
              <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.label}</CardTitle>
                {this.props.user ?
                  <Button
                    onClick={() => this.props.addRecipeActionCallback()}
                    className="item__button">Add</Button> :
                    <p></p> }
                      <Button  onClick={() => this.props.recipeDetailCallback()}
                        className="item__button">Recipe Details </Button>
                    </CardBody>
                  </Card>
              </div>
            )
          }

        }
        Recipe.propTypes = {
          label: PropTypes.string

        };


        export default Recipe;
