### 아이템9 - 타입 단언보다는 타입 선언을 사용하기

- 타입을 부여하는 두 가지 방법

  ```tsx
  interface Person {
    name: string;
  }

  const alice: Person = { name: "Alice" }; // 타입 Person
  const bob = { name: "Bob" } as Person; // 타입 Person
  ```

  - 첫 번째는 ‘타입 선언’ (: Person)
  - 두 번째는 ‘타입 단언’ (as Person)
  - 타입 단언은 강제로 타입을 지정하여 타입 체커에게 오류를 무시하라고 한다.
  - 타입 단언은 잉여 속성 체크가 동작하지 않는다
  - **따라서 안전성 체크가 되는 타입 선언을 사용하는 것이 좋다**
    > `const bob = <Person>{}`과 같은 코드는 타입 단언의 원래 문법이다. 그러나 `.tsx`파일에서 컴포넌트 태그로 인식되기 때문에 현재는 잘 쓰이지 않는다.

- 화살표 함수에서 타입 선언시 간편하게 타입을 표현할 수 있다
  ```tsx
  const names = ["alice", "bob", "jan"];
  const people: Person[] = names.map((name): Person => ({ name }));
  ```
  - `: Person[]`으로 반환타입 명시
  - name에 `:Person`타입 명시
- 타입 단언이 꼭 필요한 경우는 DOM 엘리먼트를 사용하는 경우이다
  ```tsx
  document.querySelector("#myButton").addEventListener("click", (e) => {
    e.currentTarget; // 타입 EventTarget
    const button = e.currentTarget as HTMLButtonElement;
    button; // 타입 HTMLButtonElement
  });
  ```
  - 타입스크립트는 DOM에 접근할 수 없기 때문에 `#myButton`이 버튼 엘리먼트임을 알지 못한다
  - `currentTarget` 또한 EventTarget으로 타입이 잘못 추론되었다
  - 따라서 타입 단언문을 사용해 DOM에 대한 정보를 알려준다
- `!`문법을 사용해 `null`이 아님을 단언하는 경우도 있다
  - 변수에 접두사 `!`를 붙이면 boolean의 부정문
  - 접미사로 쓰인 `!`는 단언문으로 컴파일 과정 중에 제거되며, `null`이 아니라고 확신할 때 사용한다
