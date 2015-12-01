import React from 'react';
import Select from 'react-select';
import { Break } from './Common';
import Selection from './Selection';

var MenuItems = React.createClass({

  getDefaultProps: function() {
    return {
      product: null,
      selection: null,
      onSelectionChange: null,
      disabled: false
    };
  },

  handleSelectChange: function(name) {
    return function(val) {
      this.props.onSelectionChange(name, val);
    }.bind(this);
  },

  getImages: function(type) {
    return ['ingredients', 'torched', 'spoon'].map(suffix => {
      return '/images/' + type + '/' + type + '-' + suffix + '-low.jpg';
    });
  },

  render: function() {
    return (
      <div className="selection">
        {(() => {
          return Object.keys(this.props.selection).map(type => {
            return (
              <div key={type}>
                <Selection
                  type={type}
                  product={this.props.product}
                  selection={this.props.selection}
                  disabled={this.props.disabled}
                  onChange={this.handleSelectChange(type)}
                  images={this.getImages(type)}
                />
                <Break/>
              </div>
            );
          });
        })()}
      </div>
    );
  }
});

export default MenuItems;
