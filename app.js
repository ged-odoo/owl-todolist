(function () {
    const { Component } = owl;
    const { xml } = owl.tags;
    const { whenReady } = owl.utils;
    
    // Owl Components
    class App extends Component {
      static template = xml`<div>todo app</div>`;
    }
    
    // Setup code
    function setup() {
      const app = new App();
      app.mount(document.body);
    }
    
    whenReady(setup);
})();