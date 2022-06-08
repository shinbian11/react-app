import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Header(props) {
  console.log(props);
  // Header의 onSelect 이벤트도 속성이 될 수 있다! 그러므로 props.onSelect 으로 접근이 가능한 것이다.
  // Javascript의 함수가 일급객체인 점을 이용해 props 객체에 함수도 담아서 넘겨줄 수 있다는 내용
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(evt) => {
            console.log("evt : ", evt);
            evt.preventDefault();
            props.onSelect();
          }}
        >
          WWW
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const list = props.data.map((e) => {
    return (
      // React 컴포넌트에서 최상단 요소에는 key 값을 주는 게 성능상 좋아서 보통 준다. (동적으로 변하는 애들은 추적이 쉽도록 key 값을 준다.)
      <li key={e.id}>
        <a
          href={"/read/" + e.id}
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect();
          }}
        >
          {e.title}
        </a>
        <div>{e.body}</div>
      </li>
    );
  });
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function createHandler() {}

function App() {
  const topics = [
    { id: 1, title: "html", body: "very very! HTML is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ];
  return (
    <div>
      <Header
        onSelect={() => {
          alert("Header!");
        }}
      ></Header>
      <Nav
        data={topics}
        onSelect={() => {
          alert("Nav!");
        }}
      ></Nav>
      <Article title="Welcome!" body="Hello, WEB!"></Article>
      <ButtonGroup>
        <Button variant="outlined" onClick={createHandler}>
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
    </div>
  );
}

export default App;
