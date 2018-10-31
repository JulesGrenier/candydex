import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Fa
} from 'mdbreact';
import Filter from './Filter';

class DisplayCandies extends Component {

  render(){
    const { numPage, candies, boolShowMyCandies } = this.props;
    const btnText = boolShowMyCandies ? 'À Collecter' : 'Mes Bonbons';
    const boolTest = boolShowMyCandies ? localStorage.getItem('my_candies') : candies.length !== 0;
    const localIdArr = JSON.parse(localStorage.getItem('candies_id'));


    return(
      <Card>
        <CardHeader><h1 className='text-center'>Spookydex</h1></CardHeader>

        <CardBody>
          <h4 className='text-center my-3'>{boolShowMyCandies ? 'Mes bonbons' : 'Bonbons a collecter'}</h4>
          <div className="actions d-flex justify-content-center">
            <Filter />
            <Button onClick={this.props.showMyCandies} color='elegant'>{btnText}</Button>
          </div>
          <hr />
          {
            boolTest &&
            candies.products.map((candy, key) => {
              return (
                localStorage.getItem('my_candies') && localIdArr.includes(candy._id)
                ? <div>
                    <span className='candy' key={key} onClick={() => this.props.handleCandySelect(candy)}>{candy.product_name}</span>
                    <span><Fa icon='blind'/></span>
                  </div>
                : <div className='candy' key={key} onClick={() => this.props.handleCandySelect(candy)}>{candy.product_name}</div>
              )
            })
          }
        </CardBody>

        {
          !boolShowMyCandies &&
          <CardFooter className='d-flex justify-content-between align-items-center'>
          {
            numPage > 1 &&
            <Button color='red' onClick={() => this.props.changePage(-1)}>
              {"<"}
            </Button>
          }

          <div>{`Page: ${numPage}`}</div>

          {
            numPage < Math.ceil(candies.count/candies.page_size) &&
            <Button color='red' onClick={() => this.props.changePage(+1)}>
              {">"}
            </Button>
          }

          </CardFooter>
        }
      </Card>
    )
  }

}

export default DisplayCandies;
