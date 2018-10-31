import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
  Fa,
  Badge
} from 'mdbreact';

import no_img from '../img/no.gif';
import '../styles/candy_details.scss';

class RightSide extends Component {

  constructor(props){
    super(props);

    this.addToMyList = this.addToMyList.bind(this);
  }

  addToMyList(candy){
    const myCandies = localStorage.getItem('my_candies');
    const myCandiesId = localStorage.getItem('candies_id');
    if(!myCandies){
      localStorage.setItem('my_candies', JSON.stringify({products: [candy]}));
      localStorage.setItem('candies_id', JSON.stringify([candy._id]));
    }
    else if(!myCandiesId.includes(candy._id)){
      const myCandiesParsed = JSON.parse(myCandies);
      const myCandiesIdParsed = JSON.parse(myCandiesId);
      myCandiesParsed.products.push(candy);
      myCandiesIdParsed.push(candy._id);
      localStorage.setItem("my_candies", JSON.stringify(myCandiesParsed));
      localStorage.setItem("candies_id", JSON.stringify(myCandiesIdParsed));
    }
  }



  render(){
    const { selectedCandy, boolShowMyCandies } = this.props;
    const {
      product_name,
      image_front_small_url,
      packaging_tags,
      ingredients,
      brands_tags,
      categories_tags,
      allergens_tags,
      quantity,
      _id
    } = selectedCandy;
    const img = image_front_small_url ? image_front_small_url : no_img;
    let localIdArr = JSON.parse(localStorage.getItem('candies_id'));
    if(!localIdArr) {
      localIdArr = []
    }

    return(
      <Card>
        <CardHeader className='d-flex align-items-center justify-content-between'>
          <CardTitle className='mb-0'>{ product_name }</CardTitle>
            <Fa icon='times' onClick={() => this.props.changeBoolSelected(false)} />
        </CardHeader>

        <CardBody>
          <div className="d-flex align-items-start mb-3">
            <img className='img-thumbnail z-depth-2 mr-3' src={img} alt=""/>
            <div className="d-flex flex-column">
              {
                brands_tags && brands_tags.length !== 0 &&
                <div className='detail-box'>
                  <h5>Marque(s) :</h5>
                  {
                    brands_tags.map((brand, idx) => <Badge className='z-depth-5 mx-1 mb-2 bgBlue' key={idx}>{brand}</Badge>)
                  }
                </div>
              }

              {
                categories_tags && categories_tags.length !== 0 &&
                <div className='detail-box'>
                  <h5>Catégories : </h5>
                  {
                    categories_tags.map((cat, idx) => <Badge className='z-depth-5 mx-1 mb-2 bgBlue' key={idx}>{cat}</Badge>)
                  }
                </div>
              }

              {
                quantity && quantity.length !== 0 &&
                <div className='detail-box'>
                  <h5>Quantité : </h5>
                  <Badge className='z-depth-5 mx-1 mb-2 bgBlue'>{quantity}</Badge>
                </div>
              }

              {
                packaging_tags && packaging_tags.length !== 0 &&
                <div className='detail-box'>
                  <h5>Emballage : </h5>
                  {
                    packaging_tags.map((pack, idx) => <Badge className='z-depth-5 mx-1 mb-2 bgBlue' key={idx}>{pack}</Badge>)
                  }
                </div>
              }

              {
                ingredients && ingredients.length !== 0 &&
                <div className='detail-box'>
                  <h5>
                    Ingrédients :
                  </h5>
                    {
                      ingredients.map((ing, idx) => <Badge className='z-depth-5 mx-1 mb-2 bgBlue' key={idx}>{ing.text}</Badge>)
                    }
                </div>
              }

              {
                allergens_tags && allergens_tags.length !== 0 &&
                <div className='detail-box'>
                  <h5>Allergènes :</h5>
                  {
                    allergens_tags.map((all, idx) => <Badge className='z-depth-5 mx-1 mb-2 bgBlue' key={idx}>{all}</Badge>)
                  }
                </div>
              }

            </div>
          </div>
        </CardBody>
        {
          !boolShowMyCandies &&
          <CardFooter>
            {
              !localIdArr.includes(_id) &&
              <Button color='red' onClick={() => this.addToMyList(selectedCandy)}>
                Collecter
              </Button>
            }
          </CardFooter>
        }

      </Card>
    )
  }

}

export default RightSide;
