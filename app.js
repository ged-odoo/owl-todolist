(function () {
    const { Component } = owl;
    const { xml } = owl.tags;
    const { whenReady } = owl.utils;
    
    const { useRef, useState } = owl.hooks;

    // -------------------------------------------------------------------------
    // Task Component
    // -------------------------------------------------------------------------
    const TASK_TEMPLATE = xml /* xml */`
      <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
        <input type="checkbox" t-att-checked="props.task.isCompleted" t-on-click="toggleTask"/>
        <span><t t-esc="props.task.title"/></span>
      </div>`;

    class Task extends Component {
        static template = TASK_TEMPLATE;
        static props = ["task"];
    
        toggleTask() {
            this.trigger('toggle-task', {id: this.props.task.id});
        }
    }

    // -------------------------------------------------------------------------
    // App Component
    // -------------------------------------------------------------------------
    const APP_TEMPLATE = xml /* xml */`
    <div class="todo-app">
    <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>  
    <div class="task-list" t-on-toggle-task="toggleTask">
          <t t-foreach="tasks" t-as="task" t-key="task.id">
            <Task task="task"/>
          </t>
       </div>
    </div>`;

    class App extends Component {
        static template = APP_TEMPLATE;
        static components = { Task };

        nextId = 1;
        tasks = useState([]);
        inputRef = useRef("add-input");

        mounted() {
            this.inputRef.el.focus();
        }

        addTask(ev) {
            // 13 is keycode for ENTER
            if (ev.keyCode === 13) {
                const title = ev.target.value.trim();
                ev.target.value = "";
                if (title) {
                    const newTask = {
                        id: this.nextId++,
                        title: title,
                        isCompleted: false,
                    };
                    this.tasks.push(newTask);
                }
            }
        }

        toggleTask(ev) {
            const task = this.tasks.find(t => t.id === ev.detail.id);
            task.isCompleted = !task.isCompleted;
        }
    }

    // Setup code
    function setup() {
      const app = new App();
      app.mount(document.body);
    }
    
    whenReady(setup);
})();