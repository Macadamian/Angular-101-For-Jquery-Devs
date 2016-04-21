todoApp.controller('todoCtrl', TodoCtrl);

function TodoCtrl() {
    var vm = this;
    var ENTER_KEY = 13;

    vm.title = 'todo app';
    vm.todos = [];
    vm.addItem = addItem;

    function addItem(e) {
        //use enter key
        if (e.keyCode === ENTER_KEY) {
            vm.todos.push({
                id: uuid(),
                title: vm.newItemString,
                completed: false
            });

            //clear input
            vm.newItemString = '';
        }
    }

    function uuid() {
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
    }


    function init() {
        vm.todos = [
            {
                id: uuid(),
                title: 'code reviews',
                completed: false
            },
            {
                id: uuid(),
                title: 'make coffee',
                completed: true
            }
        ];
    }



    init();
}
