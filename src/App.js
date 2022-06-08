import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Header(props) {
  // console.log(props);

  // Header의 onSelect 이벤트도 속성이 될 수 있다! 그러므로 props.onSelect 으로 접근이 가능한 것이다.
  // Javascript의 함수가 일급객체인 점을 이용해 props 객체에 함수도 담아서 넘겨줄 수 있다는 내용
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(evt) => {
            // console.log("evt : ", evt);
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
            props.onSelect(e.id);
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
  // useState : 기본 값이 일단 WELCOME이다. state 참조(Read)하려면 첫번째 데이터를 이용, state를 바꿀 때는 두번째 데이터를 이용!
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  // console.log(mode, id);
  const topics = [
    { id: 1, title: "html", body: "very very! HTML is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ];

  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>;
  } else if (mode === "READ") {
    const topic = topics.filter((e) => {
      if (e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];

    // console.log("topic은? : ", topic);
    content = <Article title={topic.title} body={topic.body}></Article>;
  }
  return (
    <div>
      <Header
        onSelect={() => {
          // 모드의 값이 바뀌었을때, App 함수가 다시 호출된다. 그 return 값이 웹페이지에 반영되게 하고 싶다! ===> state의 개념 도입!
          // 중요 ***) 리액트에서 상태(state)는 값이 바뀌었을 때 컴포넌트를 다시 실행한다!!
          // mode = "WELCOME";
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        data={topics}
        onSelect={(id) => {
          // alert("Nav! " + id);
          // mode = "READ";
          setMode("READ");
          setId(id);
        }}
      ></Nav>
      {content}
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
