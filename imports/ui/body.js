import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';
 
Template.body.helpers({
  tasks() {
    //return Tasks.find({});
      // Show newest tasks at the top
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
});
//1.event handler for submitform.  we are listening to the submit event on any element that matches the CSS selector .new-task
Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
 
    // Clear form
    target.text.value = '';
    //console.log(event)
  },
});