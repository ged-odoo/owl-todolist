(function () {
    const { Component } = owl;
    const { xml } = owl.tags;
    const { whenReady } = owl.utils;
    
    const TASKS = [
        {
          id: 1,
          title: "buy milk",
          isCompleted: true,
        },
        {
          id: 2,
          title: "clean house",
          isCompleted: false,
        },
    ];

    // -------------------------------------------------------------------------
    // Task Component
    // -------------------------------------------------------------------------
    const TASK_TEMPLATE = xml /* xml */`
        <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
            <input type="checkbox" t-att-checked="props.task.isCompleted"/>
            <span><t t-esc="props.task.title"/></span>
        </div>`;

    class Task extends Component {
        static template = TASK_TEMPLATE;
        static props = ["task"];
    }

    // -------------------------------------------------------------------------
    // App Component
    // -------------------------------------------------------------------------
    const APP_TEMPLATE = xml /* xml */`
        <div class="task-list">
            <t t-foreach="tasks" t-as="task" t-key="task.id">
                <Task task="task"/>
            </t>
        </div>`;

    class App extends Component {
        static template = APP_TEMPLATE;
        static components = { Task };

        tasks = TASKS;
    }

    // Setup code
    function setup() {
      const app = new App();
      app.mount(document.body);
    }
    
    whenReady(setup);
})();