import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link, Routes, Route, useParams } from "react-router-dom";
import { Header } from "./Header";
import { Article } from "./Article";
import { Nav } from "./Nav";
import { Create } from "./Create";

function createHandler() {}

function App() {
  const [mode, setMode] = useState("WELCOME"); // todo 삭제 예정
  const [id, setId] = useState(null); // todo 삭제 예정
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "very very! HTML is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ]);

  // 중요) 리액트에서 상태(state)는 값이 바뀌었을 때 컴포넌트를 다시 실행한다!!
  return (
    <div>
      <Header onSelect={headerHandler()}></Header>
      <Nav data={topics} onSelect={navHandler()}></Nav>
      <Routes>
        <Route
          path="/"
          element={<Article title="Welcome" body="Hello, WEB!"></Article>}
        ></Route>
        <Route
          path="/create"
          element={<Create onCreate={onCreateHandler()}></Create>}
        ></Route>
        <Route
          path="/read/:topic_id"
          element={<Read topics={topics}></Read>}
        ></Route>
      </Routes>
      <ButtonGroup>
        <Button
          component={Link}
          to="/create"
          variant="outlined"
          onClick={createHandler()}
        >
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined" onClick={deleteHandler()}>
        Delete
      </Button>
    </div>
  );

  function Read(props) {
    // Router시 url 경로에 가변적인 params가 있다면, 컴포넌트 내에서 useParams를 이용해 그 가변적인 params를 알 수 있다.
    const params = useParams();
    const id = Number(params.topic_id);
    const topic = props.topics.filter((e) => {
      if (e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    return <Article title={topic.title} body={topic.body}></Article>;
  }

  function onCreateHandler() {
    return (title, body) => {
      const newTopic = { id: nextId, title, body };

      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setId((current) => nextId);
      setNextId((current) => nextId + 1);
      setMode("READ");
    };
  }

  function navHandler() {
    return (id) => {
      setMode("READ");
      setId(id);
    };
  }

  function deleteHandler() {
    return () => {
      const newTopics = topics.filter((e) => {
        if (e.id === id) return false;
        return true;
      });

      setTopics(newTopics);
      setMode("WELCOME");
    };
  }

  function createHandler() {
    return () => {
      setMode("CREATE");
    };
  }

  function headerHandler() {
    return () => {
      setMode("WELCOME");
    };
  }
}

export default App;
