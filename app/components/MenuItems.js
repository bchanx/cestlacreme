import React from 'react';
import Select from 'react-select';
import { Break } from './Common';
import Selection from './Selection';

var MenuItems = React.createClass({

  getDefaultProps: function() {
    return {
      contraints: null,
      selected: null,
      onSelectionChange: null
    };
  },

  handleSelectChange: function(name) {
    return function(val) {
      this.props.onSelectionChange(name, val);
    }.bind(this);
  },

  render: function() {
    return (
      <div className="selection">
        <Selection
          type="vanilla"
          name="Vanilla"
          constraints={this.props.constraints}
          selected={this.props.selected}
          onChange={this.handleSelectChange('vanilla')}
          images={[
            '/images/vanilla/vanilla-ingredients-low.jpg',
            '/images/vanilla/vanilla-torched-low.jpg',
            '/images/vanilla/vanilla-spoon-low.jpg'
          ]}
        />
        <Break/>
        <Selection
          type="matcha"
          name="Matcha"
          constraints={this.props.constraints}
          selected={this.props.selected}
          onChange={this.handleSelectChange('matcha')}
          images={[
            '/images/matcha/matcha-ingredients-low.jpg',
            '/images/matcha/matcha-torched-low.jpg',
            '/images/matcha/matcha-spoon-low.jpg'
          ]}
        />
        <Break/>
        <Selection
          type="earlgrey"
          name="Earl Grey"
          constraints={this.props.constraints}
          selected={this.props.selected}
          onChange={this.handleSelectChange('earlgrey')}
          images={[
            '/images/earlgrey/earlgrey-ingredients-low.jpg',
            '/images/earlgrey/earlgrey-torched-low.jpg',
            '/images/earlgrey/earlgrey-spoon-low.jpg'
          ]}
        />
      </div>
    );
  }
});

export default MenuItems;
