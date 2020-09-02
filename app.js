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

    class App extends Component {
        static template = xml/* xml */ `
          <div class="task-list">
              <t t-foreach="tasks" t-as="task" t-key="task.id">
                <div class="task" t-att-class="task.isCompleted ? 'done' : ''">
                  <input type="checkbox" t-att-checked="task.isCompleted"/>
                  <span><t t-esc="task.title"/></span>
                </div>
              </t>
          </div>`;
      
        tasks = TASKS;
    }

    // Setup code
    function setup() {
      const app = new App();
      app.mount(document.body);
    }
    
    whenReady(setup);
})();