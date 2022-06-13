import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Header(props) {
  // console.log(props);

  // Header의 onSelect 이벤트도 속성이 될 수 있다! 그러므로 props.onSelect 으로 접근이 가능한 것이다.
  // Javascript의 함수가 일급객체인 점을 이용해 props 객체에 함수도 담아서 넘겨줄 수 있다는 내용

  return (
    <header className={props.className}>
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

const HeaderStyled = styled(Header)`
    border-bottom = 1px solid gray;
    color:red;
`;

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

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          // alert("submit!");
          const title = evt.target.title.value;
          const body = evt.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input name="title" type="text" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create" />
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "very very! HTML is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ]);

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
    content = <Article title={topic.title} body={topic.body}></Article>;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body };

          // topics.push(newTopic);
          // setTopics(topics);
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setId((current) => nextId);
          setNextId((current) => nextId + 1);
          setMode("READ");
        }}
      ></Create>
    );
  }

  return (
    <div>
      <HeaderStyled
        onSelect={() => {
          // 모드의 값이 바뀌었을때, App 함수가 다시 호출된다. 그 return 값이 웹페이지에 반영되게 하고 싶다! ===> state의 개념 도입!
          // 중요 ***) 리액트에서 상태(state)는 값이 바뀌었을 때 컴포넌트를 다시 실행한다!!
          // mode = "WELCOME";
          setMode("WELCOME");
        }}
      ></HeaderStyled>
      <Nav
        data={topics}
        onSelect={(id) => {
          setMode("READ");
          setId(id);
        }}
      ></Nav>
      {content}
      <ButtonGroup>
        <Button
          variant="outlined"
          onClick={() => {
            setMode("CREATE");
          }}
        >
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button
        variant="outlined"
        onClick={() => {
          const newTopics = topics.filter((e) => {
            if (e.id === id) return false;
            return true;
          });

          setTopics(newTopics);
          setMode("WELCOME");
          // setId((current) => nextId);
          // setNextId((current) => nextId + 1);
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export default App;
