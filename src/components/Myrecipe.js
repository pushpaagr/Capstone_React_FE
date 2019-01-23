import React, { Component } from 'react';
import { Card, CardImg, CardBody,
  CardTitle, Button } from 'reactstrap';
  import "./Myrecipe.css";

  import { Link } from "react-router-dom";
  import PropTypes from 'prop-types';



  class Myrecipe extends Component {


    render() {
      return (
        <div className="single-recipe">
            <Card className="Card-Card">
              <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.label}</CardTitle>

                <Button  onClick={() => this.props.recipeDetailCallback()}
                  className="item__button">
                  <Link to="/Capstone_React_FE/details/">Recipe Details</Link></Button>

                  <Button onClick={() => this.props.deleteRecipeCallback()
                    }className="item__button">
                    <Link to="/Capstone_React_FE/myaccount/">Delete Recipe</Link></Button>
                  </CardBody>
                </Card>
            </div>
          )
        }

      }

      Card.propTypes = {
        // Pass in a Component to override default element
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        inverse: PropTypes.bool,
        color: PropTypes.string,
        body: PropTypes.bool,
        className: PropTypes.string
      };


      export default Myrecipe;
