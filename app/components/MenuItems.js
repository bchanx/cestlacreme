import React from 'react';
import { Break, SetIntervalMixin } from './Common';
import Select from 'react-select';
import Selection from './Selection';

var MenuItems = React.createClass({
  mixins: [SetIntervalMixin],

  componentDidMount: function() {
    this.setInterval(() => {
      if (!this.state.imageHovered) {
        let newImageType = this.props.imageTypes[(this.props.imageTypes.indexOf(this.state.imageType) + 1) % this.props.imageTypes.length];
        this.setState({
          imageType: newImageType
        });
      }
    }, 5000);
  },

  getInitialState: function() {
    return {
      imageType: this.props.imageTypes[0],
      imageHovered: false
    };
  },

  getDefaultProps: function() {
    return {
      contraints: null,
      selected: null,
      onSelectionChange: null,
      imageTypes: ['ingredients', 'torched', 'spoon']
    };
  },

  handleSelectChange: function(name) {
    return function(val) {
      this.props.onSelectionChange(name, val);
    }.bind(this);
  },

  handleMouseOver: function() {
    this.setState({
      imageHovered: true
    });
  },

  handleMouseLeave: function() {
    this.setState({
      imageHovered: false
    });
  },

  render: function() {
    return (
      <div className="selection">
        <Selection
          type="vanilla"
          name="Vanilla"
          constraints={this.props.constraints}
          selected={this.props.selected}
          imageType={this.state.imageType}
          imageTypes={this.props.imageTypes}
          onChange={this.handleSelectChange('vanilla')}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        />
        <Break/>
        <Selection
          type="matcha"
          name="Matcha"
          constraints={this.props.constraints}
          selected={this.props.selected}
          imageType={this.state.imageType}
          imageTypes={this.props.imageTypes}
          onChange={this.handleSelectChange('matcha')}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        />
        <Break/>
        <Selection
          type="earlgrey"
          name="Earl Grey"
          constraints={this.props.constraints}
          selected={this.props.selected}
          imageType={this.state.imageType}
          imageTypes={this.props.imageTypes}
          onChange={this.handleSelectChange('earlgrey')}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        />
      </div>
    );
  }
});

export default MenuItems;
