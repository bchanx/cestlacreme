import React from 'react';
import { Break } from './Common';
import Select from 'react-select';

var Selection = React.createClass({

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

  getOptions: function(name) {
    let othersSelected = Object.keys(this.props.selected).filter(s => s !== name)
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
    let options = [];
    Object.keys(this.props.selected).forEach(type => {
      options[type] = this.getOptions(type);
    });
    return (
      <div className="selection">
        <div>
          Vanilla
          <Select
            name="select-vanilla"
            searchable={false}
            clearable={false}
            value={this.props.selected.vanilla}
            options={options.vanilla}
            onChange={this.handleSelectChange('vanilla')}
          />
        </div>
        <Break/>
        <div>
          Matcha
          <Select
            name="select-matcha"
            searchable={false}
            clearable={false}
            value={this.props.selected.matcha}
            options={options.matcha}
            onChange={this.handleSelectChange('matcha')}
          />
        </div>
        <Break/>
        <div>
          Earl Grey
          <Select
            name="select-earlgrey"
            searchable={false}
            clearable={false}
            value={this.props.selected.earlgrey}
            options={options.earlgrey}
            onChange={this.handleSelectChange('earlgrey')}
          />
        </div>
      </div>
    );
  }
});

export default Selection;
