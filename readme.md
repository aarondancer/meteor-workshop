#Making an event registration and checking system using Meteor

##0. What is Meteor?
Meteor is a framework that allows you to quickly create real-time websites, web apps, mobile apps, and more all using full stack JavaScript!

##1. Installing Meteor

Just go to https://www.meteor.com/install and follow the instructions!

##2. Hello World
###Creating your first app
Let's create our first app in Meteor! To save time, let's go ahead and name it 'hackathon-system' so we can recycle the project when we're done. 

To create a new app in Meteor, just open up your Terminal or Powershell and type the following:
`meteor create hackathon-system`

That will create a new folder called `hackathon-system` with the following files inside of it:

```
hackathon-system.js
hackathon-system.html
hackathon-system.css
.meteor
```

###Running your first app
Let's go ahead and run our newly generated app by typing:
```
cd hackathon-system
meteor
```

Once it's done loading, visit http://localhost:3000 and you'll see a screen like this show up:

<img src="https://i.imgur.com/jH7tvVX.png">

Click the `Click Me` button and you'll notice the number increments. There's nothing really magical about this, this is just the Blaze templating engine doing some basic JavaScript. 

##3. Setting up the view

With Blaze, views are made with HTML and custom tags that the Blaze will recognize. Go ahead and open up your `hackathon-system.html` file and make add the following changes:

Change `<title>hackathon-system</title>` to `<title>Hackathon System</title>`

Remove everything inside `<body>...</body>` and `<template name="hello>...</template>`

Now add a header inside `<body>` like so:

```
<body>
	<header>
		<h1>Hackathon System</h1>
	</header>
</body>
```

##4. Display attendees
###Creating the template
The first thing we need to do in order to display attendees is to create a template for attendees. This template will define how every attendee will be displayed on the screen.

Change `name="hello"` to `name="attendee"` in `<template>`. This will be our attendee template.

Now we define the template's content:

```
<template name="attendee">
	<div>
		<div>{{status}}</div>
		<div><b>{{name}}<b></div>
		<div>{{email}}</div>
	</div>
</template>
```

In short, what we just did was have the template display the status, name, and email of the attendee, wrapped within a div container. 

###Displaying the template
Now that we have the template, we need to tell the view to display the template for every attendee that exists. We do this by adding the following before the header we made earlier:

```
<div>
	{{#each attendees}}
		{{> attendee}}
	{{/each}}
</div>
```

###Sample Data
Now if you load up the app, you'll notice that it's empty! Why? because there's no attendees to pull from! Let's go ahead and add some attendees. We'll just hardcode this into the client for now. 

Open up your `hackathon-system.js` file and add delete everything inside the `if (meteor.isClient) {...}` brackets.

Now, add the following:

```
	Template.body.helpers({
		attendees: [
			{ name: 'Bob Jones', email: 'bob@jones.com', status: 'Checked-in'},
			{ name: 'Tiffany Williams', email:'tiff@any.com', status: 'Registered' }
		]
	});
```

What we just did is insert code into the client (the browser) that gives the body access to the hardcoded attendees array we created inside it. In that array we created two JavaScript objects with a name and email.

Now, go back to your Meteor app and you'll see that your code has magically been updated to show the two attendees you just hardcoded in!

<img src="https://i.imgur.com/3mJYIbo.png">

Go ahead and try renaming someone or changing an email. You'll notice that it gets updated automagically. This is thanks to Meteor's hot-reload.

You have successfully displayed your attendees using Blaze! Now let's make it prettier.

##5. Making it prettier
###Installing Bootstrap
One of the easiest ways to get your apps looking decent quickly is to use a front-end framework called Bootstrap. In order for us to use Bootstrap, you'll get to witness the magic of the Meteor package system. 

All you have to do to install Bootsrap into Meteor is type this into your console:
`meteor add twbs:bootstrap`

That's it!

###Adding some formatting and classes
In order to style and structure a view properly, you need to use classes. 

Let's wrap everything inside the body with a `<div>` that has the Bootstrap `container` class. What this class will do is wrap what we have into a padded container. The result should look similar to this:

```
<div class="container">
	<header>
		...
	</header>
	<div>
		...
	</div>
</div>
```

Now, let's format the attendees to where they show up as cards in a grid format. I won't be doing much  explaining about the Bootstrap grid here, if you want to learn it in detail visit here: http://getbootstrap.com/css/#grid

First we need to edit the template. I so that each card has a defined width. For the `<div>` tag inside, we'll add some classes like so:

```
<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
	...
</div>
```

These classes basically defines the `<div>` as a container that determines how wide each card should be depending on screen width.

Now we need to wrap everything we have with a `<div>` that will act as the styling layer of the card:

``` 
<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
	<div class="card">
		...
	</div>
</div>
```

Now to finish off the attendee grid, we need to go back into our body and edit the `<div>` below the `<body>` and tell it to wrap all of the templates by giving it the `row` class:

```
<header>
	...
</header>
<div class="row">
	...
</div>
```

Now if you look at the page, you'll notice that the attendees will be aligned and spaced out, but they don't quite look like cards yet. 

###Adding some custom styling
Let's add some basic custom styling to make the attendees look like cards. Open up your `hackthon-system.css` file and type the following:

```
.card {
	padding: 16px;
	border: 1px solid #ccc;
	border-radius: 8px;
	margin: 8px;
	width: 100%;
}
```

This should style the cards to look like this:
<img src="https://i.imgur.com/UIaJNBL.png">

Not bad eh? But how about we make the status more prominent?

###Status Tag

Go back to your template and edit the status tag to look like this:

```
<div class="card">
	<div class="{{status}} status">
		{{status}}
	</div>
	...
</div>
```

Woah. Okay. There's Blaze tags in the class? Yep! You can do that. That's how we'll make the tag change color based on the status. I also added a plain `status` tag to act as the base styling.

Now let's add some custom CSS:

```
.card .status {
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 2px;
	background: #eee;
	padding-left: 8px;
}

.card .Checked-in {
	border-color: #0a0;
	background: #8c8;
}

.card .Registered {
	border-color: #a90;
	background: #fe9;
}
```

So we have our base `status` styling, then styles for `Checked-in` and `Registered`.

Let's see how it looks:
<img src="https://i.imgur.com/zgC52mr.png">

Pretty spiffy!

##6. Registering someone
Okay okay, that's enough making it pretty. Let's get coding. We've hardcoded attendees, let's make this for real and have it pull data from the server.

### Defining a collection
Remember that array of attendees we made earlier? That was our attendee collection, but it was only available to the client. We need to make a collection that's available to the server and the client like so:

```
Attendees = new Mongo.Collection("attendees");

if (Meteor.isClient) {
	Template.body.helpers({
		attendees: function () {
			return Attendees.find({});
		}
	}
}
```

So what did we do? We created a MongoDB collection outside of the Client and Server scope. This makes the collection global to both the Client and Server code. Then we modified the helper to just return the `Attendees` collection we made to the client.


###Adding an attendee manually
Now, let's try manually entering in some data into our databse. Access the MongoDB console by going into your terminal and typing: `meteor mongo`

Then, run this query to insert a new attendee into the database:
`db.attendees.insert({ name: 'Richard Hillary', email: 'rich@one.com', status: 'Registered' });`

Basically you're just inserting an attendee object, similar to the ones you hardcoded before into the `attendees` collection in the database.

Now, if you look at your app you should see your new attendee!

<img src="https://i.imgur.com/VW1SqJi.png">

###Adding a form
Alright alright, so maybe we need a button. We'll also need some fields for people to enter their information. Go back into your html and add the following above `<div class="row">`:

```
<form class="register form-inline">
	<div class="form-group">
		<input class="form-control" type="text" name="name" placeholder="Name">
		<input class="form-control" type="email" name="email" placeholder="Email">
		<button class="btn btn-primary" type="submit">Register</button>
	</div>
</form>
```

This code creates a form, two fields, and a submit button. We identify the form by its `register` class. It should look like this:

<img src="https://i.imgur.com/3AGq3zB.png">


Now that we have our form, let's have that form add that person to the database when they click `Register`

Within `if (Meteor.isClient) {...}` type out the following:

```
Template.body.events({
	"submit .register": function (event) {
		//Prevent the page from reloading
		event.preventDefault();
			
		var name = event.target.name.value;
		var email = event.target.email.value;
			
		Attendees.insert({
			name: name,
			email: email,
			status: 'Registered'
		})
		
		//Clear the text boxes
		event.target.name.value = "";
		event.target.email.value = "";
	}
})
```

This code will take what's inputed in the textboxes and create a new registered attendee in the database. 

Try to add someone! You'll notice that person will instantly show up on the screen and in the database.

###Basic Validation
Wait a minute, if you try to add someone with a blank field, it works. You can also add duplicate people. We should check to see if the fields are blank and if the email already exists.

Checking if fields are empty is actually really easy to do. All you have to do is wrap the insert and clear text code with a conditional that checks if the value of the fields are empty. 

```
if (name !== "" && email !== "") {
	Attendees.insert({
	  name: name,
	  email: email,
	  status: 'Registered'
	})
	
	event.target.name.value = "";
	event.target.email.value = "";
}
```


Now let's implement a check to see if an email already exists:

```
if (Attendees.find({ email: email }).count() > 0) {
	return
}
```

All we do is search for attendees with the same email and get a count of how many matches there are.

##7. Checking someone in
Now that registration is working, and we have some basic validation, let's get someone checked in. 

How about rather than making a separate button to check someone in, you just click their status to check in and out!

This is pretty simple:

```
"submit .register": function (event) {
 	...
 }, // <-- Make sure you add a comma

"click .status": function () {
	Attendees.update(this._id, {
		$set: {status: (this.status === "Registered") ? "Checked-in" : "Registered"}
	});
}
```

Now click the statuses and you'll notice they'll toggle! Pretty easy eh?

##9. Hiding checked-in people

What if we want to hide the attendees that are checked in? 

Let's add a checkbox below our form:

```
<input type="checkbox" name="toggle-checked-in" class="toggle-checked-in" checked="{{hideCheckedIn}}">
<label for="toggle-checked-in">Toggle checked in</label>
```

What this checkbox will do is set its checked state to the `hideCheckedIn` session variable. 

Now, let's add the logic. Add another event, this time for the `change` event on the checkbox:

```
"change .toggle-checked-in": function(event) {
      Session.set("hideCheckedIn", event.target.checked);
}
```

This will toggle the `hideCheckedIn` variable.

Now, in the helpers add a hideCheckedIn helper that returns the session variable:

```
attendees: function () {
      ...
},
hideCheckedIn: function() {
      return Session.get("hideCheckedIn");
}
```

But, if you check the box you'll notice that the checked-in people don't hide. We'll need to tell the attendees helper to filter out those people if the checkbox is checked:

```
if (Session.get("hideCheckedIn")) {
    return Attendees.find({status: 'Registered'});
}
return Attendees.find({});
```

##9. User Accounts
Now, we don't want this to be accessible by anyone right? Let's only allow logged in people to register and check in people. But how do we do that? Well in Meteor it's simple!

First install the `accounts-ui` and `accounts-password` packages:

```
meteor add accounts-ui accounts-password
```

Then, above our form add the following code to add a login dropdown above our form:

```
{{> loginButtons}}
```

Let's also have it require a username instead of an email by placing this at the bottom of the Meteor client:

```
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
```

Now we need to add some validation that tells your code to stop and throw an error if the user isn't logged in. Add this inside all of your events:

```
if (!Meteor.userId()) {
	throw new Meteor.Error("not-authorized")
}
```

But this isn't enough, users can still see the fields and attendees. We can hide all of that by wrapping it all in the following tags.

```
{{#if currentUser}}
{{/if}}
```

##10. Security
Now that we have authentication, we need to make sure our app is actually secure. By default Meteor is insecure, and we need to make some changes to our code.

First, we need to remove the unsubscribe package:

```
meteor remove insecure
```
This prevents people from executing MongoDB queries from the client.

Next, we need to move modifying queries out of the client and into the server. We do this by declaring `Meteor.methods`.

Below the server contitional, add another block for `Meteor.methods` like so:

```
Meteor.methods({

});
```

Let's start moving our methods. Move all of the validation and queries in `register` to a new `register` method in `Meteor.methods`:

```
Meteor.methods({
	register: function(name, email) {
		if (!Meteor.userId()) {
       	throw new Meteor.Error("not-authorized")
		}
		Attendees.insert({
			name: name,
			email: email,
			status: 'Registered'
		})
	}
});
```

Now, just do the same for the check-in event.

##11. Deploy to Meteor
Believe it or not, we have a fully functioning app!

You can deploy your app using the command:
`meteor deploy your_app_name.meteor.com`

Then you can visit it at https://your_app_name.meteor.com

It's completely free! Just not that this is only good for testing, Meteor will shutdown inactive sites and there's no control over hosting.

##12. What's next?
This app was made to demonstrate the basic capabilities of Meteor. The app's architecture completely ignores Meteor's awesome user accounts API for the sake of getting down some basic concepts.

Things to work on:

 - Remove auto-publish. Use publish and subscribe instead.
 - Make it a multipage app!
 - Make it mobile!
 - Deploy to a real production environment (like Azure)