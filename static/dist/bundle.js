(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Common = require('./Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var About = _react2.default.createClass({
  displayName: 'About',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'about' },
      _react2.default.createElement(
        'div',
        null,
        'We\'re C\'est la Creme! Started in 2015.'
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(
        'div',
        null,
        'We take pride in supporting local farmers and using the best ingredients British Columbia has to offer. - Avalon dairy - Vanilla - Sugar'
      ),
      _react2.default.createElement(_Common.Break, null)
    );
  }
});

exports.default = About;

},{"./Common":3,"react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Navigation = require('./Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
  displayName: 'App',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(_Navigation2.default, null),
      _react2.default.createElement(
        'div',
        { className: 'content' },
        this.props.children
      )
    );
  }
});

exports.default = App;

},{"./Navigation":8,"react":"react"}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Break = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Break = exports.Break = _react2.default.createClass({
  displayName: "Break",

  render: function render() {
    return _react2.default.createElement("div", { className: "break" });
  }
});

},{"react":"react"}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = _react2.default.createClass({
  displayName: "Footer",

  render: function render() {
    return _react2.default.createElement(
      "div",
      { className: "footer" },
      _react2.default.createElement(
        "span",
        { className: "email" },
        "email: ",
        _react2.default.createElement(
          "a",
          { href: "mailto:cestlacreme@gmail.com" },
          "cestlacreme@gmail.com"
        )
      ),
      _react2.default.createElement(
        "span",
        { className: "site" },
        "site: ",
        _react2.default.createElement(
          "a",
          { href: "http://bchanx.com", target: "_blank" },
          "@bchanx"
        )
      )
    );
  }
});

exports.default = Footer;

},{"react":"react"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Instagram = require('./Instagram');

var _Instagram2 = _interopRequireDefault(_Instagram);

var _Common = require('./Common');

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = _react2.default.createClass({
  displayName: 'Home',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'home' },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          { className: 'bold' },
          'C\'est la Creme'
        ),
        ' is a online creme brulee shop, crafting quality desserts for lucky folks in the Vancouver area. Our goal is to source the freshest local ingredients and deliver an indulgence to your taste buds with every bite.'
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(_Instagram2.default, null),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          { className: 'bold' },
          'How it works:'
        ),
        ' We accept online orders each week between Monday to Thursday. We gather the necessary ingredients on Friday, and make the magic happen on Saturday. Sunday, the happy little brulee\'s will get delivered right to your doorstep.'
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(
        'div',
        null,
        'Interested? Check out our ',
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/menu' },
          'menu'
        ),
        ' and see what\'s available for ordering!'
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(_Footer2.default, null)
    );
  }
});

exports.default = Home;

},{"./Common":3,"./Footer":4,"./Instagram":6,"react":"react","react-router":"react-router"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Instagram = _react2.default.createClass({
  displayName: 'Instagram',

  getInitialState: function getInitialState() {
    return {
      recent: []
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    _superagent2.default.get(window.location.origin + '/instagram/recent').accept('json').end(function (error, response) {
      if (response && response.body) {
        _this.setState({ recent: response.body });
      }
    });
  },
  render: function render() {
    var thumbnails = this.state.recent.map(function (r) {
      return _react2.default.createElement(
        'a',
        { className: 'instagram-link', href: r.link, target: '_blank', key: r.link },
        _react2.default.createElement(
          'div',
          { className: 'instagram-thumbnail' },
          _react2.default.createElement('img', { src: r.image.url })
        )
      );
    });
    return _react2.default.createElement(
      'div',
      { className: 'instagram' },
      thumbnails
    );
  }
});

exports.default = Instagram;

},{"react":"react","superagent":"superagent"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Common = require('./Common');

var _Stripe = require('./Stripe');

var _Stripe2 = _interopRequireDefault(_Stripe);

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONSTRAINTS = {
  price: 5.00,
  minimum: 4,
  maximum: 12
};

var Menu = _react2.default.createClass({
  displayName: 'Menu',

  getInitialState: function getInitialState() {
    return {
      selected: {
        vanilla: 0,
        matcha: 0,
        earlgrey: 0
      }
    };
  },

  onSelectionChange: function onSelectionChange(name, val) {
    console.log("-->> selection changed:", name, val);
    var selected = this.state.selected;
    selected[name] = val.value;
    this.setState(selected);
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'menu' },
      _react2.default.createElement(
        'div',
        null,
        'Our creme brulee\'s are sold at a flat rate of $',
        CONSTRAINTS.price,
        ' each. However due to the nature of our business, we require at least ',
        CONSTRAINTS.minimum,
        ' brulee\'s per order, meaning a ',
        _react2.default.createElement(
          'span',
          { className: 'bold' },
          'minimum $',
          CONSTRAINTS.price * CONSTRAINTS.minimum,
          ' purchase'
        ),
        '.',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        'Flavors can be mixed and matched to your preference.',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        '(For orders of more than a dozen, please ',
        _react2.default.createElement(
          'a',
          { href: 'mailto:cestlacreme@gmail.com' },
          'email us'
        ),
        ' to set up a specialty order)'
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(_Selection2.default, { constraints: CONSTRAINTS, selected: this.state.selected, onSelectionChange: this.onSelectionChange }),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(
        'div',
        null,
        'You have currently selected: ',
        this.state.selected.vanilla,
        ' Vanilla, ',
        this.state.selected.matcha,
        ' Matcha, and ',
        this.state.selected.earlgrey,
        ' Earl Grey.'
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(_Stripe2.default, null)
    );
  }
});

exports.default = Menu;

},{"./Common":3,"./Selection":9,"./Stripe":11,"react":"react"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Social = require('./Social');

var _Social2 = _interopRequireDefault(_Social);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigation = _react2.default.createClass({
  displayName: 'Navigation',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'nav' },
      _react2.default.createElement(
        'div',
        { className: 'nav-brand' },
        _react2.default.createElement(
          _reactRouter.IndexLink,
          { to: '/' },
          _react2.default.createElement('div', { className: 'nav-logo' })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'nav-links' },
        _react2.default.createElement(
          'div',
          { className: 'nav-link' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/menu', activeClassName: 'active' },
            'menu'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'nav-link' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/about', activeClassName: 'active' },
            'about'
          )
        )
      ),
      _react2.default.createElement(_Social2.default, null)
    );
  }
});

exports.default = Navigation;

},{"./Social":10,"react":"react","react-router":"react-router"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Common = require('./Common');

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Selection = _react2.default.createClass({
  displayName: 'Selection',

  getDefaultProps: function getDefaultProps() {
    return {
      contraints: null,
      selected: null,
      onSelectionChange: null
    };
  },

  handleSelectChange: function handleSelectChange(name) {
    return (function (val) {
      this.props.onSelectionChange(name, val);
    }).bind(this);
  },

  getOptions: function getOptions(name) {
    var _this = this;

    var othersSelected = Object.keys(this.props.selected).filter(function (s) {
      return s !== name;
    }).map(function (s) {
      return _this.props.selected[s];
    }).reduce(function (a, b) {
      return a + b;
    });
    var options = [];
    for (var i = 0; i <= this.props.constraints.maximum - othersSelected; i++) {
      options.push({
        value: i,
        label: String(i)
      });
    }
    return options;
  },

  render: function render() {
    var _this2 = this;

    var options = [];
    Object.keys(this.props.selected).forEach(function (type) {
      options[type] = _this2.getOptions(type);
    });
    return _react2.default.createElement(
      'div',
      { className: 'selection' },
      _react2.default.createElement(
        'div',
        null,
        'Vanilla',
        _react2.default.createElement(_reactSelect2.default, {
          name: 'select-vanilla',
          searchable: false,
          clearable: false,
          value: this.props.selected.vanilla,
          options: options.vanilla,
          onChange: this.handleSelectChange('vanilla')
        })
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(
        'div',
        null,
        'Matcha',
        _react2.default.createElement(_reactSelect2.default, {
          name: 'select-matcha',
          searchable: false,
          clearable: false,
          value: this.props.selected.matcha,
          options: options.matcha,
          onChange: this.handleSelectChange('matcha')
        })
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(
        'div',
        null,
        'Earl Grey',
        _react2.default.createElement(_reactSelect2.default, {
          name: 'select-earlgrey',
          searchable: false,
          clearable: false,
          value: this.props.selected.earlgrey,
          options: options.earlgrey,
          onChange: this.handleSelectChange('earlgrey')
        })
      )
    );
  }
});

exports.default = Selection;

},{"./Common":3,"react":"react","react-select":"react-select"}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Social = _react2.default.createClass({
  displayName: "Social",

  render: function render() {
    return _react2.default.createElement(
      "div",
      { className: "nav-social" },
      _react2.default.createElement("a", { href: "https://www.instagram.com/cestlacreme/", target: "_blank", className: "ion-icon ion-social-instagram" }),
      _react2.default.createElement("a", { href: "https://www.facebook.com/cestlacreme", target: "_blank", className: "ion-icon ion-social-facebook" }),
      _react2.default.createElement("a", { href: "https://www.twitter.com/cestlacreme", target: "_blank", className: "ion-icon ion-social-twitter" })
    );
  }
});

exports.default = Social;

},{"react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScriptLoader = require('react-script-loader');

var _reactCreditCard = require('react-credit-card');

var _reactCreditCard2 = _interopRequireDefault(_reactCreditCard);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StripeReact = _react2.default.createClass({
  displayName: 'StripeReact',

  mixins: [_reactScriptLoader.ReactScriptLoaderMixin],

  getScriptURL: function getScriptURL() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function onScriptLoaded() {
    // TODO: prod/test key
    var ready = Stripe && "pk_test_IaT5HSSG1P7dpsq44cKF4Ypr";
    this.setState({
      loading: false,
      loadingError: !ready
    });
    if (ready) {
      Stripe.setPublishableKey("pk_test_IaT5HSSG1P7dpsq44cKF4Ypr");
    }
  },

  onScriptError: function onScriptError() {
    console.log("-->> ERROR!");
    this.setState({
      loading: false,
      loadingError: true
    });
  },

  getDefaultProps: function getDefaultProps() {
    return {
      formParams: [{
        type: 'number',
        placeholder: 'Card number'
      }, {
        type: 'name',
        placeholder: 'Full name'
      }, {
        type: 'expiry',
        placeholder: 'MM/YY'
      }, {
        type: 'cvc',
        placeholder: 'CVC'
      }],
      cardDisclosure: 'We do not store any credit card information on our servers. All payments are securely handled with Stripe. Learn more at stripe.com/about.'
    };
  },

  getInitialState: function getInitialState() {
    return {
      loading: true,
      loadingError: false,
      showPayments: false,
      showSuccess: false,
      submitInProgress: false,
      form: {
        number: '',
        name: '',
        expiry: '',
        cvc: ''
      },
      formStates: {
        focused: 'number',
        numberInvalid: false,
        nameInvalid: false,
        expiryInvalid: false,
        cvcInvalid: false
      }
    };
  },

  togglePayments: function togglePayments() {
    this.setState({
      showPayments: !this.state.showPayments
    });
  },

  onFormChange: function onFormChange(type, event) {
    if (!this.state.submitInProgress) {
      var form = this.state.form;
      form[type] = event.target.value;
      this.setState(form);
    }
  },

  onFocusChange: function onFocusChange(type) {
    if (!this.state.submitInProgress) {
      var formStates = this.state.formStates;
      formStates.focused = type;
      this.setState(formStates);
    }
  },

  validateForm: function validateForm() {
    var formStates = this.state.formStates;
    var error = null;
    ['number', 'expiry', 'cvc', 'name'].forEach(function (type) {
      // Reset form states
      formStates[type + 'Invalid'] = false;
    });
    if (!Stripe.card.validateCardNumber(this.state.form.number)) {
      formStates.numberInvalid = true;
      error = 'Card number is invalid';
    } else if (!this.state.form.name) {
      formStates.nameInvalid = true;
      error = 'Name is invalid';
    } else if (!Stripe.card.validateExpiry(this.state.form.expiry)) {
      formStates.expiryInvalid = true;
      error = 'Expiry is invalid';
    } else if (!Stripe.card.validateCVC(this.state.form.cvc)) {
      formStates.cvcInvalid = true;
      error = 'CVC is invalid';
    }
    // Update formstates
    this.setState(formStates);
    // Returns error if any, otherwise null
    return error;
  },

  onCreateResponse: function onCreateResponse(status, response) {
    var _this = this;

    if (response.error) {
      // Stripe error
      this.setState({
        submitInProgress: false
      });
      console.log("-->> SOMETHING WENT WRONG ...");
    } else {
      // Send form data to server for charge
      _superagent2.default.post(window.location.origin + '/stripe/order').send({
        stripeToken: response.id,
        created: response.created,
        livemode: response.livemode
      }).accept('json').end(function (error, response) {
        _this.setState({
          submitInProgress: false,
          showSuccess: true,
          showPayments: false
        });
      });
    }
  },

  onFormError: function onFormError(error) {
    console.log("-->> FORM ERRORED with: ", error);
  },

  createOrder: function createOrder() {
    console.log("-->> create!", this.state.form);
    console.log("-->> formStates before:", this.state.formStates);
    var error = this.validateForm();
    if (error) {
      console.log("-->> things are invalid...");
      this.onFormError(error);
    } else {
      // Things look good, submit!
      console.log("-->> CREATE TOKEN!!");
      this.setState({
        submitInProgress: true
      });
      Stripe.card.createToken({
        number: this.state.form.number,
        name: this.state.form.name,
        exp: this.state.form.expiry,
        cvc: this.state.form.cvc
      }, this.onCreateResponse);
    }
    console.log("-->> formStates after:", this.state.formStates);
  },

  render: function render() {
    var _this2 = this;

    var formParams = this.props.formParams.map(function (p) {
      var type = p.type;
      var placeholder = p.placeholder;
      var onChangeHandler = _this2.onFormChange.bind(_this2, type);
      var onFocusHandler = _this2.onFocusChange.bind(_this2, type);
      return _react2.default.createElement('input', { key: type, text: 'text', placeholder: placeholder, name: type, value: _this2.state.form[type], onChange: onChangeHandler, onFocus: onFocusHandler });
    });
    var payment = _react2.default.createElement(
      'div',
      null,
      this.state.showPayments ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'stripe-card' },
          _react2.default.createElement(_reactCreditCard2.default, {
            number: this.state.form.number,
            name: this.state.form.name,
            expiry: this.state.form.expiry,
            cvc: this.state.form.cvc,
            focused: this.state.formStates.focused,
            shinyAfterBack: this.props.cardDisclosure })
        ),
        _react2.default.createElement(
          'form',
          { className: 'stripe-form' },
          formParams,
          _react2.default.createElement(
            'div',
            { onClick: this.createOrder },
            'Submit'
          ),
          _react2.default.createElement(
            'div',
            { onClick: this.togglePayments },
            'Cancel'
          )
        )
      ) : this.state.showSuccess ? _react2.default.createElement(
        'div',
        null,
        'Success!',
        _react2.default.createElement(
          'div',
          { onClick: this.togglePayments },
          'Make another order?'
        )
      ) : _react2.default.createElement(
        'div',
        { onClick: this.togglePayments },
        'Ready to order?'
      )
    );
    return _react2.default.createElement(
      'div',
      { className: 'stripe' },
      this.state.loading ? 'Loading...' : this.state.loadingError ? 'An Error Occured...' : payment
    );
  }
});

exports.default = StripeReact;

},{"react":"react","react-credit-card":"react-credit-card","react-script-loader":33,"superagent":"superagent"}],12:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter2.default,
  { history: history },
  (0, _routes2.default)()
), document.getElementById('app'));

},{"./routes":13,"history/lib/createBrowserHistory":20,"react":"react","react-dom":"react-dom","react-router":"react-router"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _App2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/menu', component: _Menu2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default })
  );
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _About = require('./components/About');

var _About2 = _interopRequireDefault(_About);

var _Menu = require('./components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./components/About":1,"./components/App":2,"./components/Home":5,"./components/Menu":7,"react":"react","react-router":"react-router"}],14:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],15:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],17:[function(require,module,exports){
(function (process){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';
var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))
},{"_process":14,"warning":32}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],20:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
    }

    return history.createLocation(path, state, undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./Actions":15,"./DOMStateStorage":17,"./DOMUtils":18,"./ExecutionEnvironment":19,"./createDOMHistory":21,"_process":14,"invariant":31}],21:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./DOMUtils":18,"./ExecutionEnvironment":19,"./createHistory":22,"_process":14,"invariant":31}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var _getCurrentLocation = getCurrentLocation();

          var pathname = _getCurrentLocation.pathname;
          var search = _getCurrentLocation.search;

          var currentPath = pathname + search;
          var path = nextLocation.pathname + nextLocation.search;

          if (currentPath === path) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function pushState(state, path) {
    transitionTo(createLocation(path, state, _Actions.PUSH, createKey()));
  }

  function push(path) {
    pushState(null, path);
  }

  function replaceState(state, path) {
    transitionTo(createLocation(path, state, _Actions.REPLACE, createKey()));
  }

  function replace(path) {
    replaceState(null, path);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(path) {
    if (path == null || typeof path === 'string') return path;

    var pathname = path.pathname;
    var search = path.search;
    var hash = path.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(path) {
    return createPath(path);
  }

  function createLocation(path, state, action) {
    var key = arguments.length <= 3 || arguments[3] === undefined ? createKey() : arguments[3];

    return _createLocation3['default'](path, state, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    pushState: pushState,
    replaceState: replaceState,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":15,"./AsyncUtils":16,"./createLocation":23,"./deprecate":24,"./runTransitionHook":27,"deep-equal":28}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var path = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var state = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var action = arguments.length <= 2 || arguments[2] === undefined ? _Actions.POP : arguments[2];
  var key = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof path === 'string') path = _parsePath2['default'](path);

  var pathname = path.pathname || '/';
  var search = path.search || '';
  var hash = path.hash || '';

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":15,"./parsePath":26}],24:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function deprecate(fn, message) {
  return function () {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] ' + message) : undefined;
    return fn.apply(this, arguments);
  };
}

exports['default'] = deprecate;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"_process":14,"warning":32}],25:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],26:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _extractPath = require('./extractPath');

var _extractPath2 = _interopRequireDefault(_extractPath);

function parsePath(path) {
  var pathname = _extractPath2['default'](path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./extractPath":25,"_process":14,"warning":32}],27:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"_process":14,"warning":32}],28:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":29,"./lib/keys.js":30}],29:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],30:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],31:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":14}],32:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))
},{"_process":14}],33:[function(require,module,exports){

// A dictionary mapping script URLs to a dictionary mapping
// component key to component for all components that are waiting
// for the script to load.
var scriptObservers = {};

// A dictionary mapping script URL to a boolean value indicating if the script
// has already been loaded.
var loadedScripts = {};

// A dictionary mapping script URL to a boolean value indicating if the script
// has failed to load.
var erroredScripts = {};

// A counter used to generate a unique id for each component that uses
// ScriptLoaderMixin.
var idCount = 0;

var ReactScriptLoader = {
	componentDidMount: function(key, component, scriptURL) {
		if (typeof component.onScriptLoaded !== 'function') {
			throw new Error('ScriptLoader: Component class must implement onScriptLoaded()');
		}
		if (typeof component.onScriptError !== 'function') {
			throw new Error('ScriptLoader: Component class must implement onScriptError()');
		}
		if (loadedScripts[scriptURL]) {
			component.onScriptLoaded();
			return;
		}
		if (erroredScripts[scriptURL]) {
			component.onScriptError();
			return;
		}

		// If the script is loading, add the component to the script's observers
		// and return. Otherwise, initialize the script's observers with the component
		// and start loading the script.
		if (scriptObservers[scriptURL]) {
			scriptObservers[scriptURL][key] = component;
			return;
		}

		var observers = {};
		observers[key] = component;
		scriptObservers[scriptURL] = observers;

		var script = document.createElement('script');
		script.src = scriptURL;

		var callObserverFuncAndRemoveObserver = function(func) {
			var observers = scriptObservers[scriptURL];
			for (var key in observers) {
				observer = observers[key];
				var removeObserver = func(observer);
				if (removeObserver) {
					delete scriptObservers[scriptURL][key];
				}
			}
			//delete scriptObservers[scriptURL];
		}
		script.onload = function() {
			loadedScripts[scriptURL] = true;
			callObserverFuncAndRemoveObserver(function(observer) {
				if (observer.deferOnScriptLoaded && observer.deferOnScriptLoaded()) {
					return false;
				}
				observer.onScriptLoaded();
				return true;
			});
		};
		script.onerror = function(event) {
			erroredScripts[scriptURL] = true;
			callObserverFuncAndRemoveObserver(function(observer) {
				observer.onScriptError();
				return true;
			});
		};
		document.body.appendChild(script);
	},
	componentWillUnmount: function(key, scriptURL) {
		// If the component is waiting for the script to load, remove the
		// component from the script's observers before unmounting the component.
		var observers = scriptObservers[scriptURL];
		if (observers) {
			delete observers[key];
		}
	},
	triggerOnScriptLoaded: function(scriptURL) {
		if (!loadedScripts[scriptURL]) {
			throw new Error('Error: only call this function after the script has in fact loaded.');
		}
		var observers = scriptObservers[scriptURL];
		for (var key in observers) {
			var observer = observers[key];
			observer.onScriptLoaded();
		}
		delete scriptObservers[scriptURL];
	}
};

var ReactScriptLoaderMixin = {
	componentDidMount: function() {
		if (typeof this.getScriptURL !== 'function') {
			throw new Error("ScriptLoaderMixin: Component class must implement getScriptURL().")
		}
		ReactScriptLoader.componentDidMount(this.__getScriptLoaderID(), this, this.getScriptURL());
	},
	componentWillUnmount: function() {
		ReactScriptLoader.componentWillUnmount(this.__getScriptLoaderID(), this.getScriptURL());
	},
	__getScriptLoaderID: function() {
		return 'id' + idCount++;
	},
};

exports.ReactScriptLoaderMixin = ReactScriptLoaderMixin;
exports.ReactScriptLoader = ReactScriptLoader;

},{}]},{},[12]);
