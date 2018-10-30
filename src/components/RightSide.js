import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Fa
} from 'mdbreact';

class RightSide extends Component {

  render(){
    return(
      <Card>
        <CardBody>
          <Fa icon='times' onClick={() => this.props.changeBoolSelected(false)} />
          
        </CardBody>
      </Card>
    )
  }

}

export default RightSide;
