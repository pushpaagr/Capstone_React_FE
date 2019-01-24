import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import './Details.css';
  import { linkify } from 'react-linkify'


  class Details extends Component {


    render() {
      console.log(this.props.detailRecipe);
      if (this.props.detailRecipe) {
        const ingredients = this.props.detailRecipe.ingredients.map((item, i) => {
          return (
            `${item.text},`
          )
        })


        const healthLabels = this.props.detailRecipe.healthLabels.map((item, i) => {
          return (
            `${item},`
          )
        })



        return (
          <div className="col-12 detail-recipe">
            <Card>
              <CardImg top width="100%" src={this.props.detailRecipe.image} />
          </Card>
          <Card>
            <CardBody>
              <CardTitle className="cardTitle">{this.props.detailRecipe.label}</CardTitle>
              <CardSubtitle className="cardIngredients">Ingredients:</CardSubtitle>
              <CardText  className="ingredientsText">{ingredients ? ingredients : "None"}</CardText>
              <CardSubtitle className="healthlabel">HealthLabel:</CardSubtitle>
              <CardText className="healthlabelText">{healthLabels}</CardText>
              <CardSubtitle className="recipeUrl">URL: <a href={this.props.detailRecipe.url} target="_blank">{this.props.detailRecipe.label}</a>
            </CardSubtitle>
          </CardBody>
          </Card>
        </div>
      )
    } else {
      return <div></div>;
      }
    }
  }

  export default Details;
