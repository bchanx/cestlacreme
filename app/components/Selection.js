import React from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import Carousel from './Carousel';

var Selection = React.createClass({

  getDefaultProps: function() {
    return {
      type: null, // earlgrey
      images: null,
      selected: null,
      pricing: null,
      onChange: null
    };
  },

  getOptions: function() {
    let othersSelected = Object.keys(this.props.selected).filter(s => s !== this.props.type)
      .map(s => this.props.selected[s].value)
      .reduce((a, b) => a + b);
    let options = [];
    for (let i = 0; i <= this.props.pricing.maximum - othersSelected; i++) {
      options.push({
        value: i,
        label: String(i)
      });
    }
    return options;
  },

  render: function() {
    return (
      <div>
        <div className="menu-images">
          <Carousel images={this.props.images}/>
        </div>
        <div className="menu-options">
          <div className="menu-caption">{this.props.selected[this.props.type].name}</div>
          <Select
            name={this.props.type + '-select'}
            searchable={false}
            clearable={false}
            value={this.props.selected[this.props.type].value}
            options={this.getOptions()}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
});

export default Selection;
