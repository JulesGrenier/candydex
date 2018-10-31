import React, { Component } from 'react';
import './styles/app.scss';
import {
  Container,
  Row,
  Col,
} from 'mdbreact';

import DisplayCandies from './components/DisplayCandies';
import RightSide from './components/RightSide';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      numPage: 1,
      fetchFilter: 'https://ssl-api.openfoodfacts.org/category/candies/',
      candies: [],
      selectedCandy: [],
      boolSelected: false,
      showMyCandies: false
    }
    this.changePage = this.changePage.bind(this);
    this.changeBoolSelected = this.changeBoolSelected.bind(this);
    this.changeSelectedCandy = this.changeSelectedCandy.bind(this);
    this.handleCandySelect = this.handleCandySelect.bind(this);
    this.showMyCandies = this.showMyCandies.bind(this);
    this.changeFetchFilter = this.changeFetchFilter.bind(this);

  }

  componentDidMount(){
    const { numPage, fetchFilter} = this.state;
    fetch(`${fetchFilter}${numPage}.json`)
    .then(results => results.json())
    .then(candies => this.setState(
      {
        candies: candies
      }
    ))
  }

  changePage(i) {
    const { numPage, fetchFilter} = this.state;
    const numPageTemp = numPage + i
    fetch(`${fetchFilter}${numPageTemp}.json`)
    .then(results => results.json())
    .then(candies => this.setState(
      {
        numPage: numPageTemp,
        candies: candies
      }
    ))
  }

  changeFetchFilter(baseUrl) {
    const { numPage } = this.state;
    fetch(`${baseUrl}${numPage}.json`)
      .then(results => results.json())
      .then(candies => this.setState(
        {
          candies: candies,
          fetchFilter: baseUrl,
          numPage: 1
        }
      )
    )
  }


  changeBoolSelected(bool) {
      this.setState({
        boolSelected: bool
      })
  }

  changeSelectedCandy(candy) {
    this.setState({
      selectedCandy: candy
    })
  }

  handleCandySelect(candy){
    this.changeBoolSelected(true);
    this.changeSelectedCandy(candy);
  }

  showMyCandies() {
    this.setState({
      showMyCandies: !this.state.showMyCandies,
      boolSelected: false
    })
  }

  render() {
    const { numPage, candies, boolSelected, selectedCandy, showMyCandies} = this.state;
    const candiesFromStorage = JSON.parse(localStorage.getItem('my_candies'));
    const candiesToShow = showMyCandies ? candiesFromStorage : candies;
    //this.updateFetch()
    return (
      <Container fluid id="App">
        <Row>
          <Col md='6' lg='4' id='left-side' className='z-depth-2'>
            <DisplayCandies
            numPage={numPage}
            candies={candiesToShow}
            changePage={this.changePage}
            handleCandySelect={this.handleCandySelect}
            showMyCandies={this.showMyCandies}
            boolShowMyCandies={this.state.showMyCandies}
            changeFetchFilter={this.changeFetchFilter}
          />
          </Col>
          {
            boolSelected &&
            <Col md='6' lg='8' id='right-side'>
              <RightSide
                selectedCandy={selectedCandy}
                changeBoolSelected={this.changeBoolSelected}
                boolShowMyCandies={this.state.showMyCandies}
                />
            </Col>
          }
        </Row>
      </Container>
    );
  }
}

export default App;
