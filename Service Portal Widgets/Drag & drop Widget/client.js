function($scope) {
    var c = this;
    $scope.onLoad = function() {
        c.server.update().then(function(response) {
            $scope.showhide = {
                value: "block",
                name: 'showhide'
            };
        });
    }

    c.dragStart = function(event) {

        event.target.style.opacity = '0.7';
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', event.target.innerHTML);
        c.draggedNode = event.target.id;

        document.querySelectorAll('.task').forEach(function(cur) {
            if (cur.id !== event.target.id) {
                cur.classList.add('disabled');
            }
        })
    };

    c.dragEnd = function(event) {
        event.target.style.opacity = '1';
        event.target.style.cursor = 'grab';
        var cols = document.querySelectorAll('.task-col-content');
        cols.forEach(function(cur) {
            cur.classList.remove('over')
        });
        document.querySelectorAll('.task').forEach(function(cur) {
            cur.classList.remove('disabled');
        })
    };

    c.dragEnter = function(event) {
        if (event.target && event.target.classList) {
            event.target.classList.add('over');
        }
    };

    c.dragLeave = function(event) {
        if (event.target && event.target.classList) {
            event.target.classList.remove('over');
        }
    };

    c.dragOver = function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        event.dataTransfer.dropEffect = 'move';
        return false;
    };

    function findColType(element) {
        var maxLevels = 4;
        return checkElement(element, 1);

        function checkElement(element, level) {
            if (!element) {
                return null;
            }
            if (level >= maxLevels) {
                return null;
            }
            if (element.classList && element.classList.contains('task-col')) {
                return element.id;
            }
            return checkElement(element.parentElement, level++);
        }
    }

    c.drop = function(event) {
			
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        c.taskid = event.target.id;
        c.data.isPushable = true;
			
        var colType = findColType(event.target);
        var tasksarr = c.data.tasks;
        var states;
			
        for (var k = 0; k < tasksarr.length; k++) {
            states = c.data.tasks[parseInt(k)].state;
            var index_element = states.indexOf(colType);
            if (index_element > -1) {
                c.data.isPushable = false;
                break;
            }
        }

        if (c.data.isPushable) {
            c.data.tasks[parseInt(c.draggedNode)].state.push(colType);
        }

        $scope.$apply();
    };


    c.removeElement = function(ev) {

        c.taskid = ev.target.id;
        var colType = findColType(ev.target);
        var states = c.data.tasks[parseInt(c.taskid)].state;
        var index_element = states.indexOf(colType);
        states.splice(index_element, 1);
        c.data.tasks[parseInt(c.taskid)].state = states;
        $scope.$apply();
    };

    c.data.savebtn = false;

}
