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
      filter: '',
      candies: [],
      selectedCandy: [],
      boolSelected: false
    }
    this.changePage = this.changePage.bind(this);
    this.changeBoolSelected = this.changeBoolSelected.bind(this);
    this.changeSelectedCandy = this.changeSelectedCandy.bind(this);
    this.handleCandySelect = this.handleCandySelect.bind(this);
  }

  componentDidMount(){
    const { numPage } = this.state;
    fetch(`https://ssl-api.openfoodfacts.org/category/candies/${numPage}.json`)
    .then(results => results.json())
    .then(candies => this.setState(
      {
        candies: candies
      }
    ))
  }

  changePage(i) {
    const numPageTemp = this.state.numPage + i
    fetch(`https://ssl-api.openfoodfacts.org/category/candies/${numPageTemp}.json`)
    .then(results => results.json())
    .then(candies => this.setState(
      {
        numPage: numPageTemp,
        candies: candies
      }
    ))
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

  render() {
    const { numPage, candies, boolSelected, selectedCandy } = this.state;
    return (
      <Container fluid id="App">
        <Row>
          <Col md='6' lg='4'>
            <DisplayCandies numPage={numPage} candies={candies} changePage={this.changePage} handleCandySelect={this.handleCandySelect} />
          </Col>
          {
            boolSelected &&
            <Col md='4' lg='6'>
              <RightSide selectedCandy={selectedCandy} changeBoolSelected={this.changeBoolSelected} />
            </Col>
          }
        </Row>
      </Container>
    );
  }
}

export default App;
