import { Link } from "react-router-dom";

// Header의 onSelect 이벤트도 속성이 될 수 있다! 그러므로 props.onSelect 으로 접근이 가능한 것이다.
// Javascript의 함수가 일급객체인 점을 이용해 props 객체에 함수도 담아서 넘겨줄 수 있다는 내용
export function Header(props) {
  return (
    <header className={props.className}>
      <h1>
        <Link
          to="/"
          onClick={() => {
            props.onSelect();
          }}
        >
          WWW
        </Link>
      </h1>
    </header>
  );
}
