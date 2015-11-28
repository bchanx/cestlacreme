import React from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import { Carousel } from './Common';

var Selection = React.createClass({

  getDefaultProps: function() {
    return {
      type: null, // earlgrey
      name: null, // Earl Grey,
      images: null,
      selected: null,
      constraints: null,
      onChange: null
    };
  },

  getOptions: function() {
    let othersSelected = Object.keys(this.props.selected).   filter(s => s !== this.props.type)
      .map(s => this.props.selected[s])
      .reduce((a, b) => a + b);
    let options = [];
    for (let i = 0; i <= this.props.constraints.maximum - othersSelected; i++) {
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
          <div className="menu-caption">{this.props.name}</div>
          <Select
            name="vanilla-select"
            searchable={false}
            clearable={false}
            value={this.props.selected[this.props.type]}
            options={this.getOptions()}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
});

export default Selection;
