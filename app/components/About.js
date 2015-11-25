import React from 'react';
import { Break } from './Common';

var About = React.createClass({
  render: function() {
    return (
      <div className="about">
        <div>
          <span className="bold">Hi! I'm Samson, creator of C'est la Creme!</span>
          <br/>
          <br/>
          I love food. For as long as I can remember I've been eating my way through all different ethnic cuisines! I started cooking for myself ever since I was little and have always been cooking as a hobby. One day I decided to make my mom's favorite dessert - the Creme Brulee. 
          <br/>
          <br/>
          As an engineer by day, and an amateur foodie at night, I've often dreamt about making something special and sharing it with everyone. 
          <br/>
          <br/>
          Well, here it is: My goal is to make the absolute best creme brulee I can make with the best ingredients I can find. That's it!
        </div>
        <Break/>
        <div>
          <span className="bold">F.A.Q</span>
          <br/>
          <br/>
          <div>
            <span className="bold">[How do I finish the sugar layer on top?]</span>
            <br/>
            <br/>
            Dab the surface with a paper towel if there is any moisture on top, and spread 3/4 to a 1 teaspoon of white sugar on top evenly. Best way is to use a torch to gently melt the sugar! Alternatively you can set the oven to "Broil", set the temperature to 500F, and place the creme brulee on the top rack for 5-10 minutes or until golden brown and bubbling.
            <br/>
            <br/>
            Let sit for 10 minutes and eat! Or, if a cold creme brulee is desired, place the jars back into the fridge for up to 30 minutes and serve. The longer you wait, the softer the sugar crust gets though.
            <br/>
            <br/>
            *Please be safe!!! If you are torching and have an open flame, please do so at your own risk and have a fire extinguisher nearby.*
          </div>
          <br/>
          <br/>
          <div>
            <span className="bold">[Can I have different flavors?]</span>
            <br/>
            <br/>
            Yes! Mix and match! Leave us a note in your order and we will be happy to accommodate.
          </div>
          <br/>
          <br/>
          <div>
            <span className="bold">[Can you make me a custom flavor?]</span>
            <br/>
            <br/>
            Email us! Let's make it happen! *Please note we do try our best to accommodate but may be restricted by minimum quantities and flavor limitations.*
          </div>
          <br/>
          <br/>
          <div>
            <span className="bold">[Can I order more than 4?]</span>
            <br/>
            <br/>
            Yes! However for orders of more than a dozen please email and inquire in advance.
          </div>
          <br/>
          <br/>
          <div>
            <span className="bold">[Can we keep the jars?]</span>
            <br/>
            <br/>
            Of course! However we'd gladly accept returns as we can clean and sustainably re-use the jars.
          </div>
        </div>
      </div>
    );
  }
});

export default About;
