import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Fa,
  Badge,
  Collapse
} from 'mdbreact';

import no_img from '../img/no.gif';
import '../styles/candy_details.scss';

class RightSide extends Component {

  constructor(props){
    super(props);
    this.state = {
      collapse: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render(){
    const { selectedCandy } = this.props;
    const {
      product_name,
      image_front_small_url,
      packaging_tags,
      ingredients,
      brands_tags,
      categories_tags,
      allergens_tags,
      quantity
    } = selectedCandy;
    const img = image_front_small_url ? image_front_small_url : no_img;
    const orientation = this.state.collapse ? 'down' : 'right' ;

    return(
      <Card>
        <CardHeader className='d-flex align-items-center justify-content-between'>
          <CardTitle className='mb-0'>{ product_name }</CardTitle>
            <Fa icon='times' onClick={() => this.props.changeBoolSelected(false)} />
        </CardHeader>

        <CardBody>
          <div className="d-flex align-items-start mb-3">
            <img className='mr-3' src={img} alt=""/>
            <div className="d-flex flex-column">
              {
                brands_tags.length !== 0 &&
                <h4 className='mb-3'>Marque(s) : <br />
                  {
                    brands_tags.map((brand, idx) => <Badge color="primary" className='mx-1' key={idx}>{brand}</Badge>)
                  }
                </h4>
              }

              {
                categories_tags.length !== 0 &&
                <p className='mb-3'>Catégories : <br />
                  {
                    categories_tags.map((cat, idx) => <Badge color='success' className='mx-1' key={idx}>{cat}</Badge>)
                  }
                </p>
              }

              {
                quantity &&
                <p>Quantité : <br />
                  {quantity}
                </p>
              }

            </div>
          </div>

          {
            packaging_tags.length !== 0 &&
            <p>Emballage : <br />
              {
                packaging_tags.map((pack, idx) => <Badge color="default" className='mx-1' key={idx}>{pack}</Badge>)
              }
            </p>
          }

          {
            ingredients.length !== 0 &&
            <p>
              <span onClick={this.toggle} style={{cursor: 'pointer'}}>
                Ingrédients <Fa icon={`chevron-${orientation}`} className='align-middle ml-1' />
              </span><br />
              <Collapse isOpen={this.state.collapse}>
                {
                  ingredients.map((ing, idx) => <Badge color="primary" className='mx-1' key={idx}>{ing.text}</Badge>)
                }
              </Collapse>
            </p>
          }

          {
            allergens_tags.length !== 0 &&
            <p>Allergènes : <br />
              {
                allergens_tags.map((all, idx) => <Badge color='danger' className='mx-1' key={idx}>{all}</Badge>)
              }
            </p>
          }

        </CardBody>
      </Card>
    )
  }

}

export default RightSide;
