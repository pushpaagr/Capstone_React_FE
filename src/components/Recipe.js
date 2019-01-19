import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Recipe.css";
// import axios from 'axios';
import { Card, CardImg, CardBody,
  CardTitle, Button } from 'reactstrap';
  import Calendar from 'react-calendar';

  // onClick={this.props.addRecipeActionCallback}

  class Recipe extends Component {

    state = {
      date: new Date(),
      calendarvisible: false,
    }

    onChange = date => {
      this.setState({
        date,
        calendarvisible: false
      })

      console.log(date);


      const newdate = new Date(date);
      const year=newdate.getFullYear();
      const month=newdate.getMonth()+1 //getMonth is zero based;
      const day=newdate.getDate();
      const formatted=year+"-"+month+"-"+day;

      console.log(formatted);


      this.props.addRecipeActionCallback()

      // do something with google calendar + date
    }

    toggleCalendar = () => {
      // console.log("in toggle");
      this.setState({
        calendarvisible: !(this.state.calendarvisible),
      })
    }

    renderAddButton() {
      // console.log(this.state.calendarvisible);
      if (!this.props.user) return null

      return (
        <div>
          <Button onClick={this.toggleCalendar}
            className="item__button"
            >
            Add
          </Button>
          {this.state.calendarvisible && <Calendar
            onChange={this.onChange}
            value={this.state.date}
            />}
          </div>
        )
      }

      render () {
        return(
          <div className="single-recipe">
            <Card>
              <CardImg top width="100%" src={this.props.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.label}</CardTitle>

                {this.renderAddButton()}

                <Button
                  onClick={() => this.props.recipeDetailCallback()}
                  className="item__button"
                  >
                  Recipe Details
                </Button>
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
