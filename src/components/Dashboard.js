import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase.js';
import axios from 'axios';
import Home from './Home';
import Recipes from './Recipes';
import Myrecipes from './Myrecipes';
import Details from './Details';
import './Dashboard.css';

import { Navbar,FormGroup, FormControl, Button, ButtonToolbar } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class Dashboard extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line

    this.state = {
      message: "",
      result: [],
      query: "",
      user: null,
      detailRecipe: "",
      seedetail: false,
      searchrecipe: false,
      myrecipe: false,
      showhome: false,
      indatabase: false,
      myaccountrecipedetail: false,
    }
  }


  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({
      query: '',
      result: [],
      searchrecipe: true,
      myaccountrecipedetail: false,
    });
    this.searchRecipes();
  }
  handleChange = (event) => {
    this.setState({query: event.target.value});
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.setState({message: `Welcome Back ${this.state.user.displayName}`})
      }
    });
  }

  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user: user,

      });
    });
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null,
        myaccountrecipedetail: false,
        message: "",
        result: [],
        query: "",
        detailRecipe: "",
        seedetail: false,
        searchrecipe: false,
        myrecipe: false,
        showhome: false,
        indatabase: false,
      });
      console.log(this.state.message);
    });
  }

  searchRecipes = () => {
    const searchterm = this.state.query
    const url = `http://localhost:8080/search?ingredients=${this.state.query}`

    this.setState({
      result: [],
      showhome: false,
      query: "",
      detailRecipe: "",
      seedetail: false,
      myrecipe: false,
    });


    axios.get(url)
    .then((response) => {
      this.setState({
        result: response.data.hits,
        message: `Loading search for ${searchterm}`,
        searchrecipe: true,
      });
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    })

  };


  addRecipe = (recipe) => {
    let id = recipe.uri
    id = encodeURIComponent(id);
    let url = `http://localhost:8080/addrecipe?id=${id}&useruid=${this.state.user.uid}`

    axios.post(url)
    .then((response) => {
      this.setState({
        message: `Successfully added ${recipe.label}`,
        showhome: false,
        indatabase: true,
      })
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    });

  };




  deleteRecipe = (recipe) => {

    let url = `http://localhost:8080/recipe?documentid=${recipe.documentid}`

    axios.delete(url)
    .then((response) => {
      this.setState({
        message: `Successfully delted ${recipe.label}`,
        result: [],
      })
    })
    .catch((error) => {
      this.setState({
        error: error,
      });
    });

  }




  myrecipes = () => {

    const url = `http://localhost:8080/myrecipes?useruid=${this.state.user.uid}`
    axios.get(url)
    .then((response) => {
      this.setState({
        result: response.data,
        myrecipe: true,
        seedetail: false,
        searchrecipe: false,
        showhome: false,
        myaccountrecipedetail: true,
      })
    })
    .catch((error) => {
      this.setState({
        error
      });
    })
  }

  recipeDetail = (recipe) => {
    this.setState({
      detailRecipe: recipe,
      seedetail: true,
      result: [],
      showhome: false,
      myrecipe: false,

    })
  }

  showhome = () => {
    this.setState({
      showhome: true,
      message: "",
      result: [],
      query: "",
      detailRecipe: "",
      seedetail: false,
      searchrecipe: false,
      myrecipe: false,
    })
  }

  render() {
    return(
      <Router>
        <div>
          <div className="div-outer-nav">
            <Navbar className="navbar-navbar">
              <ButtonToolbar className="navbar-buttons">
                <div>
                  <form onSubmit={this.onFormSubmit}>
                    <label>
                      Search Recipes:
                      <input type="text" value={this.state.query} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                  </form>
                </div>
                <div>
                  {this.state.user ?
                    <Button onClick={this.logout}>Log Out</Button>
                    :
                    <Button onClick={this.login}>Log In</Button>
                  }
                </div>
                <div>
                  {this.state.user ?
                    <Button onClick={this.myrecipes}><Link to="/myaccount/" className="dashboard-link">My Account
                    </Link></Button>
                    :
                    <p></p>
                  }
                </div>
                <div>
                  <Button onClick={this.showhome}><Link to="/">Home
                  </Link></Button>
              </div>
              </ButtonToolbar>
            </Navbar>






            <div>
              <p className={"status-bar__text"}>{this.state.message}</p>
            </div>

            {this.state.showhome ?   <Route path="/" exact component={Home} />: null}



            {this.state.searchrecipe ? <Recipes
              recipeList={this.state.result}
              useruid={this.state.user ? this.state.user.uid : null}
              recipeDetailCallback={(recipe) => this.recipeDetail(recipe)}
              user={this.state.user}
              addRecipeActionCallback={(recipe) => this.addRecipe(recipe)}
              /> : null}


              {this.state.myrecipe ?   <Route path="/myaccount/" render={() => <Myrecipes
                myrecipes={this.state.result}
                deleteRecipeCallback={(recipe) => this.deleteRecipe(recipe)}
                recipeDetailCallback={(recipe) => this.recipeDetail(recipe)}
                />} /> : null }

                {this.state.seedetail ? <Details detailRecipe={this.state.detailRecipe}
                user={this.state.user}
                myrecipe={this.state.myrecipe}
                indatabase={this.state.indatabase}
                myaccountrecipedetail={this.state.myaccountrecipedetail}
                addRecipeActionCallback={(recipe) => this.addRecipe(recipe)}
                /> : null}
              </div>
            </div>
          </Router>
        )
      }


    }

    export default Dashboard;
