Attendees = new Mongo.Collection("attendees");

if (Meteor.isClient) {
  Template.body.helpers({
    attendees: function () {
      return Attendees.find({});
    }
  })

  Template.body.events({
    "submit .register": function (event) {
      event.preventDefault();

      var name = event.target.name.value;
      var email = event.target.email.value;

      if (Attendees.find({ email: email }).count() > 0) {
        return
      }

      if (name !== "" && email !== "") {
        Attendees.insert({
          name: name,
          email: email,
          status: 'Registered'
        })

        event.target.name.value = "";
        event.target.email.value = "";
      }
    },

    "click .status": function () {
      Attendees.update(this._id, {
        $set: {status: (this.status === "Registered") ? "Checked-in" : "Registered"}
      });
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
