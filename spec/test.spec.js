describe('angularjs homepage todo list', function() {
	it('should add a todo', function() {
		browser.get('https://angularjs.org'); // GOES TO THE WEBSITE

		element(by.model('todoList.todoText')).sendKeys('Writing tests!!'); // FILLS IN FORM
		element(by.css('[value="add"]')).click(); // CLICKS ADD

		var todoList = element.all(by.repeater('todo in todoList.todos'));
		expect(todoList.count()).toEqual(3);
		expect(todoList.get(2).getText()).toEqual('Writing tests!!');
	});
});