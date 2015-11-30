import React from 'react';
import Select from 'react-select';
import { Break } from './Common';
import Selection from './Selection';

var MenuItems = React.createClass({

  getDefaultProps: function() {
    return {
      pricing: null,
      selected: null,
      onSelectionChange: null
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
          return Object.keys(this.props.selected).map(type => {
            return (
              <div key={type}>
                <Selection
                  type={type}
                  pricing={this.props.pricing}
                  selected={this.props.selected}
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
