# Testing Directives

## Overview

Now that we understand event and behavioural directives, we need to test them to ensure the functionality is as we expect. That way, if we ever upgrade our version of Angular, we can ensure that nothing will break if the built-in directives functionality ever changed.

## Objectives

- Install Protractor
- Describe end to end testing with Protractor
- Test a Directive
- Write a unit test

## Installing Protractor

First, let's install Protractor, a library for end-to-end feature testing in Angular. As opposed to Karma and Jasmine, we use Protractor to actually test the HTML side of things. Jasmine only let's us test what's happening programatically. With Protractor, we can click on buttons and enter text into inputs, etc. This way, we're interacting with our site the same way our users will and testing the results that they'll get back.

 To install Protractor, go into your command line and enter:

```bash
npm install -g protractor
```

Make sure this is working by entering:

```bash
protractor --version
```

We then need to update `webdriver`, which is provided to us when we install protractor.

```bash
webdriver-manager update
```

Now, we need to start the Selenium Server. This is a webserver that protractor will communicate with to run our tests.

```bash
webdriver-manager start
```

### Writing a test

Let's write a protractor test.

Protractor lets us grab web pages and interact with elements on the page.

To start, we need to load a page to interact with. For this example, we're going to grab Angular's website. To do this, we'll call the `get` method on our `browser` object and pass in a URL.

```js
describe('Angular Website', function() {
	it('should add a todo', function() {
		browser.get('https://angularjs.org');
	});
});
```

Now, we can select an element on the page using the `element` function. We can select it via multiple different ways. One way to grab an element is using the `ng-model` selector.

Now, the Angular website features a todo example. The `ng-model` value for the input to add a new todo is `todoList.todoText`. Let's grab the element.

```js
describe('angularjs homepage todo list', function() {
	it('should add a todo', function() {
		browser.get('https://angularjs.org');

		element(by.model('todoList.todoText'))
	});
});
```

Now that we've got the element we can actually write inside it, using `.sendKeys`.

```js
describe('angularjs homepage todo list', function() {
	it('should add a todo', function() {
		browser.get('https://angularjs.org');

		element(by.model('todoList.todoText')).sendKeys('Writing tests!!');
	});
});
```

This will type in the element just as if a user was typing!

Now, we need to actually press the `add` button.

```js
describe('angularjs homepage todo list', function() {
	it('should add a todo', function() {
		browser.get('https://angularjs.org');

		element(by.model('todoList.todoText')).sendKeys('Writing tests!!');
		element(by.css('[value="add"]')).click();
	});
});
```

Here, we're grabbing the add button by its CSS selector and then clicking it - so simple!

Now, that was completely useless unless we can check that the todo actually gets added.

Much like the model selector we used above, we can select elements by their `ng-repeat` value.

```js
describe('angularjs homepage todo list', function() {
	it('should add a todo', function() {
		browser.get('https://angularjs.org');

		element(by.model('todoList.todoText')).sendKeys('Writing tests!!');
		element(by.css('[value="add"]')).click();

		var todoList = element.all(by.repeater('todo in todoList.todos'));
	});
});
```

Simple! As multiple items have the `ng-repeat` on them, we need to use `element.all()` instead of `element()` so we get an array of all of the elements.

If you take a look at the todo list, we originally had two todos and now we should have three. We can test the count of items much like our previous tests, by using `expect`.

```js
describe('angularjs homepage todo list', function() {
	it('should add a todo', function() {
		browser.get('https://angularjs.org');

		element(by.model('todoList.todoText')).sendKeys('Writing tests!!');
		element(by.css('[value="add"]')).click();

		var todoList = element.all(by.repeater('todo in todoList.todos'));
		expect(todoList.count()).toEqual(3);
	});
});
```

Sorted! We are now checking that there's three elements. Let's make sure that the new todo matches the text we put into the input.

```js
describe('angularjs homepage todo list', function() {
	it('should add a todo', function() {
		browser.get('https://angularjs.org');

		element(by.model('todoList.todoText')).sendKeys('Writing tests!!');
		element(by.css('[value="add"]')).click();

		var todoList = element.all(by.repeater('todo in todoList.todos'));
		expect(todoList.count()).toEqual(3);
		expect(todoList.get(2).getText()).toEqual('Writing tests!!');
	});
});
```

We can run this test by running `protractor conf.js`. It will then launch a Chrome instance, go to the Angular website and run our tests.

 Adding code so I can submit, this lab doesn't seem to match up to the readme
This simplistic API allows us to click and interact with a lot of different items on our pages, so we can test all of our directives functionality.

<p data-visibility='hidden'>View <a href='https://learn.co/lessons/angular-testing-directives-readme'>Angular Testing Directives</a> on Learn.co and start learning to code for free.</p>
