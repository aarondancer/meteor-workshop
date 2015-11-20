Attendees = new Mongo.Collection("attendees");

if (Meteor.isClient) {
  Template.body.helpers({
    attendees: function () {
      if (Session.get("hideCheckedIn")) {
        return Attendees.find({status: 'Registered'});
      }
      return Attendees.find({});
    },
    hideCheckedIn: function() {
      return Session.get("hideCheckedIn");
    }
  });

  Template.body.events({
    "submit .register": function (event) {
      event.preventDefault();

      var name = event.target.name.value;
      var email = event.target.email.value;

      if (Attendees.find({ email: email }).count() > 0) {
        return
      }

      if (name !== "" && email !== "") {
        Meteor.call("register", name, email)

        event.target.name.value = "";
        event.target.email.value = "";
      }
    },

    "click .status": function () {
      Meteor.call("toggleCheckIn", this);
    },

    "change .toggle-checked-in": function(event) {
      Session.set("hideCheckedIn", event.target.checked);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  register: function (name, email) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized")
    }

    Attendees.insert({
      name: name,
      email: email,
      status: 'Registered'
    })
  },
  toggleCheckIn: function(attendee) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized")
    }
    Attendees.update(attendee._id, {
      $set: {status: (attendee.status === "Registered") ? "Checked-in" : "Registered"}
    });
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
