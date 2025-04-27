/* Transpiled from src/app.jsx using @babel/preset-react */
(function () {
  // Check if dependencies exist
  if (!window.React || !window.ReactDOM) {
    console.error("React or ReactDOM not available. Rendering static fallback.");
    document.getElementById("root").innerHTML = `
      <div class="text-center text-white p-8">
        <h1 class="text-5xl font-bold mb-4">I AM CAN</h1>
        <p class="text-xl mb-6">Coding Anything Now - Your Expert Coding Assistant</p>
        <p class="text-lg">JavaScript failed to load. Please check your connection or try again later.</p>
      </div>
    `;
    return;
  }

  var React = window.React;
  var ReactDOM = window.ReactDOM;

  // Explicitly access motion from Framer Motion
  var motion = (window.framerMotion && window.framerMotion.motion) || null;
  if (!motion) {
    console.error("Framer Motion's motion object not available. Animations disabled.");
    motion = {
      section: function (props) { return React.createElement("section", props, props.children); },
      h1: function (props) { return React.createElement("h1", props, props.children); },
      button: function (props) { return React.createElement("button", props, props.children); },
      div: function (props) { return React.createElement("div", props, props.children); }
    };
  }

  // Theme Context for Light/Dark Mode
  var ThemeContext = React.createContext();

  // Header Component with Theme Toggle
  function Header() {
    var _React$useContext = React.useContext(ThemeContext),
        theme = _React$useContext.theme,
        toggleTheme = _React$useContext.toggleTheme;

    return React.createElement(
      "header",
      { className: "fixed top-0 w-full bg-black/80 backdrop-blur-sm p-4 flex justify-end" },
      React.createElement(
        "button",
        {
          className: "bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded",
          onClick: toggleTheme,
          "aria-label": "Switch to ".concat(theme === "dark" ? "light" : "dark", " mode")
        },
        theme === "dark" ? "☀️ Light" : "🌙 Dark"
      )
    );
  }

  // Hero Component
  function Hero() {
    return React.createElement(
      motion.section,
      {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1 },
        className: "min-h-screen flex flex-col justify-center items-center text-center px-4",
        role: "banner"
      },
      React.createElement(
        motion.h1,
        {
          initial: { scale: 0.8 },
          animate: { scale: 1 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "text-5xl md:text-7xl font-bold mb-4"
        },
        "I AM CAN"
      ),
      React.createElement(
        "p",
        { className: "text-xl md:text-2xl mb-6" },
        "Coding Anything Now - Your Expert Coding Assistant"
      ),
      React.createElement(
        motion.button,
        {
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.9 },
          className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300",
          onClick: function onClick() {
            return alert("Let’s code something amazing!");
          },
          "aria-label": "Start coding with CAN"
        },
        "Start Coding"
      )
    );
  }

  // Skills Component
  function Skills() {
    var skills = [
      {
        name: "Full-Stack Development",
        icon: React.createElement(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-10 w-10 mx-auto mb-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          },
          React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          })
        )
      },
      {
        name: "AI-Powered Coding",
        icon: React.createElement(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-10 w-10 mx-auto mb-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          },
          React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          })
        )
      },
      {
        name: "Secure & Scalable Code",
        icon: React.createElement(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-10 w-10 mx-auto mb-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          },
          React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-4-4c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m4-10v2m0 12v2M5 12H3m18 0h-2M7 7l-4 4m0 0l4 4m10-8l4 4m0 0l-4 4"
          })
        )
      },
      {
        name: "Creative Problem Solving",
        icon: React.createElement(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-10 w-10 mx-auto mb-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
          },
          React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          })
        )
      }
    ];

    return React.createElement(
      "section",
      { className: "py-16", role: "region", "aria-labelledby": "skills-heading" },
      React.createElement(
        "h2",
        { id: "skills-heading", className: "text-4xl font-bold text-center mb-12" },
        "My Abilities"
      ),
      React.createElement(
        "div",
        { className: "grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4" },
        skills.map(function (skill, index) {
          return React.createElement(
            motion.div,
            {
              key: index,
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: index * 0.1 },
              className: "bg-gray-900 p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300",
              role: "article",
              "aria-label": "Skill: ".concat(skill.name)
            },
            skill.icon,
            React.createElement(
              "h3",
              { className: "text-xl font-semibold" },
              skill.name
            )
          );
        })
      )
    );
  }

  // Projects Component (Mock API)
  function Projects() {
    var _React$useState = React.useState([]),
        projects = _React$useState[0],
        setProjects = _React$useState[1];

    React.useEffect(function () {
      // Mock API response
      var mockData = [
        { id: 1, title: "AI Chatbot", description: "A smart chatbot built with React and Grok." },
        { id: 2, title: "Task Manager", description: "A scalable task app with Node.js and MongoDB." },
        { id: 3, title: "Portfolio Site", description: "A modern portfolio with Tailwind and Framer Motion." }
      ];
      setProjects(mockData);
    }, []);

    return React.createElement(
      "section",
      { className: "py-16", role: "region", "aria-labelledby": "projects-heading" },
      React.createElement(
        "h2",
        { id: "projects-heading", className: "text-4xl font-bold text-center mb-12" },
        "Recent Projects"
      ),
      React.createElement(
        "div",
        { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4" },
        projects.map(function (project) {
          return React.createElement(
            motion.div,
            {
              key: project.id,
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              className: "bg-gray-900 p-6 rounded-lg text-center",
              role: "article",
              "aria-label": "Project: ".concat(project.title)
            },
            React.createElement(
              "h3",
              { className: "text-xl font-semibold mb-2" },
              project.title
            ),
            React.createElement(
              "p",
              null,
              project.description
            )
          );
        })
      )
    );
  }

  // Demo Component (Interactive Counter)
  function Demo() {
    var _React$useState2 = React.useState(0),
        count = _React$useState2[0],
        setCount = _React$useState2[1];

    return React.createElement(
      "section",
      { className: "py-16 text-center", role: "region", "aria-labelledby": "demo-heading" },
      React.createElement(
        "h2",
        { id: "demo-heading", className: "text-4xl font-bold mb-8" },
        "Interactive Demo"
      ),
      React.createElement(
        "p",
        { className: "text-lg mb-4" },
        "Click to see my reactivity in action!"
      ),
      React.createElement(
        "div",
        { className: "flex justify-center items-center space-x-4" },
        React.createElement(
          motion.button,
          {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            className: "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
            onClick: function onClick() {
              return setCount(count + 1);
            },
            "aria-label": "Increment counter"
          },
          "Increment"
        ),
        React.createElement(
          "span",
          { className: "text-2xl font-bold", "aria-live": "polite" },
          count
        ),
        React.createElement(
          motion.button,
          {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.9 },
            className: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
            onClick: function onClick() {
              return setCount(count - 1);
            },
            "aria-label": "Decrement counter"
          },
          "Decrement"
        )
      )
    );
  }

  // Footer Component
  function Footer() {
    return React.createElement(
      "footer",
      { className: "py-8 text-center", role: "contentinfo" },
      React.createElement(
        "p",
        { className: "text-lg" },
        "Built by CAN with ❤️ | Connect at ",
        React.createElement(
          "a",
          {
            href: "#",
            className: "text-blue-400 hover:underline",
            onClick: function onClick() {
              return alert("Contact me via xAI!");
            },
            "aria-label": "Contact CAN via xAI"
          },
          "xAI"
        )
      )
    );
  }

  // Main App Component
  function App() {
    var _React$useState3 = React.useState("dark"),
        theme = _React$useState3[0],
        setTheme = _React$useState3[1];

    var toggleTheme = function toggleTheme() {
      setTheme(theme === "dark" ? "light" : "dark");
    };

    React.useEffect(function () {
      document.body.className = theme === "dark" ? "bg-black text-white" : "bg-white text-black";
    }, [theme]);

    return React.createElement(
      ThemeContext.Provider,
      { value: { theme: theme, toggleTheme: toggleTheme } },
      React.createElement(
        "div",
        null,
        React.createElement(Header, null),
        React.createElement(Hero, null),
        React.createElement(Skills, null),
        React.createElement(Projects, null),
        React.createElement(Demo, null),
        React.createElement(Footer, null)
      )
    );
  }

  ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
})();
