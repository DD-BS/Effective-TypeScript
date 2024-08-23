### 아이템1 - 타입스크립트와 자바스크립트 관계 이해하기

- 타입스크립트는 자바스크립트의 상위 집합
- 따라서 모든 자바스크립트는 타입스크립트라는 명제는 참이지만, 그 반대는 성립하지 않는다
- 타입 시스템의 목표 중 하나는 런타임에 오류를 발생시킬 코드를 미리 찾아내는 것
  - 그러나 타입 체커는 모든 오류를 찾아내지는 않는다.
  - 타입 체커를 통과하면서도 런타임 오류를 발생시킬 수 있다.
  - 또한, 오류는 발생하지 않지만 의도와 다르게 동작하는 코드도 있다.
- 타입스크립트는 오타인지 판단하지는 못한다.
  - 그러나 정의된 타입, 변수, 함수의 이름이 잘못되었을 경우 이를 잡아낼 수는 있다.
  ```tsx
  const states = [
    { name: "Alabama", capitol: "Montgomery" },
    { name: "Alaska", capitol: "Juneau" },
  ];
  for (const state of states) {
    console.log(state.capital);
    // 'capital'속싱이 ...형식에 없습니다.
    // 'capitol'을 사용하시겠습니까?
  }
  ```
  - states 객체 내에 `capitol`이라는 오타를 냈지만 이것이 오타인지 알지는 못한다.
  - 따라서 명시적으로 `state`를 선언하여 의도를 분명하게 한다.
  ```tsx
  interface State {
  	name: string;
  	capital: string;
  }
  const states: State[] = [...]
  ```
