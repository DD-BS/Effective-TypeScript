### Item28 - 유효한 상태만 표현하는 타입을 지향하기

- 효과적으로 타입을 설계하려면, 유효한 상태만 표현할 수 있는 타입들을 만들어내는 것이 가장 중요하다.
  ```tsx
  // x
  interface State {
    pageText: string;
    isLoading: boolean;
    error?: string;
  }

  // o
  interface RequestPending {
    state: "pending";
  }
  interface RequestError {
    state: "error";
    error: string;
  }
  interface RequestSuccess {
    state: "ok";
    pageText: string;
  }
  type RequestState = RequestPending | RequestError | RequestSuccess;
  ```
  상태를 한번에 나타내는 코드보다 네트워크 요청 과정 각각의 상태를 명시적으로 모델링할 수 있도록 태그된 유니온을 사용했다.
- 타입을 설계할 때는 어떤 값들을 포함하고 제외할지 신중하게 생각해야 코드를 작성하기 쉬워지고 타입 체크가 용이해진다.
