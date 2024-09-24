### Item47 - 공개 API에 등장하는 모든 타입을 익스포트하기

- 라이브러리 제작자는 프로젝트 초기에 타입 익스포트부터 작성한다.
  ```tsx
  interface SecretName {
  	first: string;
  	last: string;
  }
  interface SecretSanta {
  	name: SecretName;
  	gift: string;
  }

  export function getGift(name: SecretName, gift: string): SecretSanta{...}

  type MySanta = ReturnType<typeof getGift> // SecretSanta
  type MyName = Parameters<typeof getGift>[0] // SecretName
  ```
  - 해당 라이브러리 사용자는 `getGift`함수만 import할 수 있다.
  - 그러나 `Parameters`와 `ReturnType` 제너릭 타입을 사용해 추출할 수 있다.
  - 공개 API 매개변수에 놓이는 순간 타입은 노출되므로 굳이 숨기려 하지 말고 라이브러리 사용자를 위해 명시적으로 익스포트하는 것이 좋다.
