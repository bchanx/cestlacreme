import React from 'react';
import { Bold, Note } from './Common';

var OrderSummary = React.createClass({
  getDefaultProps: function() {
    return {
      selected: null,
      pricing: null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    let totalSelected = Object.keys(nextProps.selected)
      .map(type => nextProps.selected[type].value)
      .reduce((a, b) => a + b);
    this.setState({
      totalSelected: totalSelected
    });
  },

  getInitialState: function() {
    return {
      totalSelected: 0
    };
  },

  render: function() {
    let items = Object.keys(this.props.selected);
    return (
      <div className="order-summary">
        <div className="order-icon">
          <span className="ion-spoon"></span>
        </div>
        <div className="order-title">
          <Bold>{!this.state.totalSelected ? <span className="warning">You currently have no items selected.</span> : 'You have currently selected:'}</Bold>
        </div>
        {this.state.totalSelected ?
          <div>
            {(() => {
              return items.filter(itm => {
                return this.props.selected[itm].value;
              }).map(itm => {
                return (
                  <div key={itm} className="order-item">
                    {this.props.selected[itm].name} x {this.props.selected[itm].value}
                    <span className="order-price">${(this.props.selected[itm].value * this.props.pricing.price).toFixed(2)}</span>
                  </div>
                );
              });
            })()}
            <div className="order-total">
              {this.state.totalSelected < this.props.pricing.minimum ? <div className="order-warning"><Note><Bold>*Minimum $20.00 required*</Bold></Note></div> : null}
              <Bold>
                Total: ${(this.state.totalSelected * this.props.pricing.price).toFixed(2)}
              </Bold>
            </div>
          </div> : null}
      </div>
    );
  }
});

export default OrderSummary;
