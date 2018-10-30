import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from 'mdbreact';
import Filter from './Filter';

class DisplayCandies extends Component {

  render(){
    const { numPage, candies } = this.props;

    return(
      <Card>
        <CardHeader><h1 className='text-center'>Candydex</h1></CardHeader>

        <CardBody>
          <Filter />
          <hr />
          {
            candies.length !== 0 &&
            candies.products.map((candy, key) =>
              <div key={key} onClick={() => this.props.handleCandySelect(candy)}>{candy.product_name}</div>
            )
          }
        </CardBody>

        <CardFooter className='d-flex justify-content-between align-items-center'>
          {
            numPage > 1 &&
            <Button onClick={() => this.props.changePage(-1)}>
              {"<"}
            </Button>
          }

          <div>{`Page: ${numPage}`}</div>

          {
            numPage < Math.ceil(candies.count/candies.page_size) &&
            <Button onClick={() => this.props.changePage(+1)}>
              {">"}
            </Button>
          }

        </CardFooter>
      </Card>
    )
  }

}

export default DisplayCandies;
