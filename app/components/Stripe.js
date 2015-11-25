import React from 'react';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import ReactCreditCard from 'react-credit-card';
import request from 'superagent';

var StripeReact = React.createClass({
  mixins: [ReactScriptLoaderMixin],

  getScriptURL: function() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function() {
    // TODO: prod/test key
    var ready = Stripe && process.env.STRIPE_TEST_PUBLISHABLE_KEY;
    this.setState({
      loading: false,
      loadingError: !ready
    });
    if (ready) {
      Stripe.setPublishableKey(process.env.STRIPE_TEST_PUBLISHABLE_KEY);
    }
  },

  onScriptError: function() {
    console.log("-->> ERROR!");
    this.setState({
      loading: false,
      loadingError: true
    });
  },

  getDefaultProps: function() {
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

  getInitialState: function() {
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

  togglePayments: function() {
    this.setState({
      showPayments: !this.state.showPayments
    });
  },

  onFormChange: function(type, event) {
    if (!this.state.submitInProgress) {
      let form = this.state.form;
      form[type] = event.target.value;
      this.setState(form);
    }
  },

  onFocusChange: function(type) {
    if (!this.state.submitInProgress) {
      let formStates = this.state.formStates;
      formStates.focused = type;
      this.setState(formStates);
    }
  },

  validateForm: function() {
    let formStates = this.state.formStates;
    let error = null;
    ['number', 'expiry', 'cvc', 'name'].forEach(type => {
      // Reset form states
      formStates[type + 'Invalid'] = false;
    });
    if (!Stripe.card.validateCardNumber(this.state.form.number)) {
      formStates.numberInvalid = true;
      error = 'Card number is invalid';
    }
    else if (!this.state.form.name) {
      formStates.nameInvalid = true;
      error = 'Name is invalid';
    }
    else if (!Stripe.card.validateExpiry(this.state.form.expiry)) {
      formStates.expiryInvalid = true;
      error = 'Expiry is invalid';
    }
    else if (!Stripe.card.validateCVC(this.state.form.cvc)) {
      formStates.cvcInvalid = true;
      error = 'CVC is invalid';
    }
    // Update formstates
    this.setState(formStates);
    // Returns error if any, otherwise null
    return error;
  },

  onCreateResponse: function(status, response) {
    if (response.error) {
      // Stripe error
      this.setState({
        submitInProgress: false
      });
      console.log("-->> SOMETHING WENT WRONG ...");
    }
    else {
      // Send form data to server for charge
      request.post(window.location.origin + '/stripe/order')
        .send({
          stripeToken: response.id,
          created: response.created,
          livemode: response.livemode
        })
        .accept('json')
        .end((error, response) => {
          this.setState({
            submitInProgress: false,
            showSuccess: true,
            showPayments: false
          });
        });
    }
  },

  onFormError: function(error) {
    console.log("-->> FORM ERRORED with: ", error);
  },

  createOrder: function() {
    console.log("-->> create!", this.state.form);
    console.log("-->> formStates before:", this.state.formStates);
    let error = this.validateForm();
    if (error) {
      console.log("-->> things are invalid...");
      this.onFormError(error);
    }
    else {
      // Things look good, submit!
      console.log("-->> CREATE TOKEN!!");
      this.setState({
        submitInProgress: true
      });
      // TODO turn this on for prod
      if (process.env.NODE_ENV === 'development') {
        Stripe.card.createToken({
          number: this.state.form.number,
          name: this.state.form.name,
          exp: this.state.form.expiry,
          cvc: this.state.form.cvc
        }, this.onCreateResponse);
      }
    }
    console.log("-->> formStates after:", this.state.formStates);
  },

  onBlurChange: function(type) {
    if (!this.state.submitInProgress && type === 'cvc') {
      let formStates = this.state.formStates;
      formStates.focused = 'number';
      this.setState(formStates);
    }
  },

  render: function() {
    let formParams = this.props.formParams.map(p => {
      let type = p.type;
      let placeholder = p.placeholder;
      let onChangeHandler = this.onFormChange.bind(this, type);
      let onFocusHandler = this.onFocusChange.bind(this, type);
      let onBlurHandler = this.onBlurChange.bind(this, type);
      return <input key={type} text="text" placeholder={placeholder} name={type} value={this.state.form[type]} onChange={onChangeHandler} onFocus={onFocusHandler} onBlur={onBlurHandler}/>;
    });
    let payment = (
      <div>
        { this.state.showPayments ?
          <div>
            <div className="stripe-card">
              <ReactCreditCard
                number={this.state.form.number}
                name={this.state.form.name}
                expiry={this.state.form.expiry}
                cvc={this.state.form.cvc}
                focused={this.state.formStates.focused}
                shinyAfterBack={this.props.cardDisclosure}/>
            </div>
            <form className="stripe-form">
              {formParams}
              <div onClick={this.createOrder}>Submit</div>
              <div onClick={this.togglePayments}>Cancel</div>
            </form>
          </div> :
          this.state.showSuccess ?
          <div>
            Success!
            <div onClick={this.togglePayments}>Make another order?</div>
          </div> :
          <div onClick={this.togglePayments}>Ready to order?</div> }
      </div>
    );
    return (
      <div className="stripe">
        { this.state.loading ? 'Loading...' : this.state.loadingError ? 'An Error Occured...' : payment }
      </div>
    );
  }
});

export default StripeReact;
