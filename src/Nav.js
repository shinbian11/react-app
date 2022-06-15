import { Link } from "react-router-dom";

export function Nav(props) {
  const list = props.data.map((e) => {
    return (
      // React 컴포넌트에서 최상단 요소에는 key 값을 주는 게 성능상 좋아서 보통 준다. (동적으로 변하는 애들은 추적이 쉽도록 key 값을 준다.)
      <li key={e.id}>
        <Link
          to={"/read/" + e.id}
          onClick={() => {
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </Link>
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
