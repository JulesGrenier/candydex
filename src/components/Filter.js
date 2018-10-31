import React, { Component, Fragment } from 'react';

class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      checked: false
    };
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleCheckboxChange() {
    this.setState({
      checked: !this.state.checked
    })
    if (this.state.checked) {
      this.props.changeFetchFilter(`https://ssl-api.openfoodfacts.org/category/candies/`);
    } else if(this.state.value.length !== 0){
      this.props.changeFetchFilter(`https://ssl-api.openfoodfacts.org/category/candies/brand/${this.state.value}/`)
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.checked) {
      this.props.changeFetchFilter(`https://ssl-api.openfoodfacts.org/category/candies/brand/${this.state.value}/`);
    }
  }

    render() {
        const { changeFetchFilter } = this.props
        const { checked } = this.state
        return (
          <div>
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={this.state.checked}
                onChange={this.toggleCheckboxChange}
                className="mr-2"
              />
              <span>Activé le filtrage</span>
            </div>

            {
              checked &&
              <div>
                <form onSubmit={this.handleSubmit}>
                  <label style={{whiteSpace: "nowrap"}}>
                    <span className="mr-2">Marque :</span>
                    <input type="text" name="name" onChange={this.handleChange}/>
                  </label>
                </form>
              </div>
            }

          </div>
        );
    }
}

export default Filter;

// handleSubmit(event) {
//   event.preventDefault();
//   this.props.changeFetchFilter(`https://ssl-api.openfoodfacts.org/category/candies/brand/${this.state.value}/`);
// }
//
// handleChange(event) {
//   this.setState({value: event.target.value});
//   if (event.target.value.length > 0) {
//     this.setState({checked: true})
//   } else {
//     this.setState({checked: false})
//   }
//
// }
//
// handleCheck(event) {
//   this.setState({checked: !this.state.checked});
//   if (this.state.checked) {
//     this.props.changeFetchFilter(`https://ssl-api.openfoodfacts.org/category/candies/`)
//   } else {
//     this.props.changeFetchFilter(`https://ssl-api.openfoodfacts.org/category/candies/brand/${this.state.value}/`)
//   }
//  }
