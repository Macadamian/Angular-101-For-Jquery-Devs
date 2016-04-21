jQuery(function ($) {
	'use strict';

	var ENTER_KEY = 13;

	var util = {
		uuid: function () {
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		}
	};

	var App = {
		init: function () {
			this.todos = [
				{
					id: util.uuid(),
					title: 'code reviews',
					completed: false
				},
				{
					id: util.uuid(),
					title: 'make coffee',
					completed: false
				}
			];
			this.bindEvents();

			this.render();
		},
		bindEvents: function () {
			$('#new-todo').on('keyup', this.create.bind(this));
			$('#filters').on('click', 'li > button', this.getFilteredTodos.bind(this));
			$('#todo-list')
				.on('change', '.toggle', this.toggle.bind(this))
		},
		render: function () {
			var todos = this.todos;

			$('#todo-list').empty();
			for (var t = 0; t < todos.length; t++) {
				this.makeTodoHtml(todos[t]);
			}

			$('#main').toggle(todos.length > 0);
			this.renderFooter();
			$('#new-todo').focus();
		},
		renderFooter: function () {
			var todoCount = this.todos.length;
			var activeTodoCount = this.getActiveTodos().length;
			var activeTodoWord = util.pluralize(activeTodoCount, 'todo');

			$('#active-todo-count').html(activeTodoCount);
			$('#active-todo-word').html(activeTodoWord);
			$('#footer').toggle(todoCount > 0);
		},
		getActiveTodos: function () {
			return this.todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		getFilteredTodos: function (e) {
			var filter = e && e.target.innerHTML;

			//update css for filter buttons
			$('#filters > li > button').removeClass('selected');
			$(e.target).addClass('selected');

			//update list item display
			if (filter === 'Active') {
				$('#todo-list > li.completed').hide();
				$('#todo-list > li:not(.completed)').show();
			}

			else if (filter === 'Completed') {
				$('#todo-list > li.completed').show();
				$('#todo-list > li:not(.completed)').hide();
			}

			else {	//filter === 'All' or undefined
				$('#todo-list > li').show();
			}
		},
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
		indexFromEl: function (el) {
			var id = $(el).closest('li').data('id');
			var todos = this.todos;
			var i = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},
		create: function (e) {
			var $input = $(e.target);
			var val = $input.val().trim();

			if (e.which !== ENTER_KEY || !val) {
				return;
			}

			this.todos.push({
				id: util.uuid(),
				title: val,
				completed: false
			});

			$input.val('');

			this.render();
		},
		makeTodoHtml: function(item) {
			var newItem =
				'<li class="' + (item.completed ? 'completed' : '') + '" data-id="' + item.id + '">' +
					'<div class="view">' +
						'<input class="toggle" type="checkbox"' + (item.completed ? 'checked' : '') + '>' +
						'<label>' + item.title + '</label>' +
					'</div>' +
				'</li>';
			$('#todo-list').append(newItem);
		},
		toggle: function (e) {
			var i = this.indexFromEl(e.target);
			this.todos[i].completed = !this.todos[i].completed;
			this.render();
		}
	};

	App.init();
});
