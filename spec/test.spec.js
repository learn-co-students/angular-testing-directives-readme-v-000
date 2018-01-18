describe('angularjs homepage todo list', function() {
	it('should add a todo', function() {
		// mimics steps a user would take
		browser.get('https://angularjs.org'); //user visits site

		element(by.model('todoList.todoText')).sendKeys('Writing tests!!'); //user enters string into input
		element(by.css('[value="add"]')).click(); //clicks add
// here we check if the string got added to the todo
		var todoList = element.all(by.repeater('todo in todoList.todos'));
		expect(todoList.count()).toEqual(3);
		expect(todoList.get(2).getText()).toEqual('Writing tests!!');
	});
});