import logo from "./logo.svg";
import "./App.css";

function Header() {
  return (
    <header>
      <h1>
        <a href="/">Web</a>
      </h1>
    </header>
  );
}

function Nav() {
  return (
    <nav>
      <ol>
        <li>
          <a href="/read/1">html</a>
        </li>
        <li>
          <a href="/read/2">css</a>
        </li>
      </ol>
    </nav>
  );
}
function Article() {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, WEB!
    </article>
  );
}
function App() {
  return (
    <div>
      <Header></Header>
      <Header></Header>
      <Header></Header>
      <Header></Header>

      <Nav></Nav>
      <Nav></Nav>
      <Nav></Nav>
      <Nav></Nav>

      <Article></Article>
      <Article></Article>
      <Article></Article>
      <Article></Article>
    </div>
  );
}

export default App;