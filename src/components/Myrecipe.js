import React, { Component } from 'react';
import { Card, CardImg, CardBody,
  CardTitle, Button } from 'reactstrap';
  import "./Myrecipe.css";

  import 'bootstrap/dist/css/bootstrap.css';

  import { Link } from "react-router-dom";
  import PropTypes from 'prop-types';



  class Myrecipe extends Component {


    render() {
      return (
        <div className="col-12 col-md-6 col-lg-4 single-recipe">
          <Card>
            <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
            <CardBody>
              <CardTitle>{this.props.label}</CardTitle>
                <button  onClick={() => this.props.recipeDetailCallback()}
                  className="btn btn-primary detailbutton">
                  <Link to="/details/">Recipe Details</Link></button>

                  <button onClick={() => this.props.deleteRecipeCallback()
                  }className="btn btn-primary detailbutton">
                    <Link to="/myaccount/">Delete Recipe</Link></button>
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
