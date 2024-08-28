### Item14 - 타입 연산과 제너릭 사용으로 반복 줄이기

- 타입 간에 매핑하는 방법을 익혀 타입 정의에서도 DRY원칙을 시킨다.
- 타입에 이름을 붙여넣자

  ```tsx
  interface Point2D {
  	x: number;
  	y: number;
  }
  function distance(a: Point2D, b:Point2D) {...}

  type HTTPFunction = (url: string, opts: Options) => Promise<Response>
  const get: HTTPFunction = (url, opts) => {...}
  ```

  <br/>

- 확장을 사용하자

  ```tsx
  interface Person {
    firstName: string;
    lastName: string;
  }
  interface PersonWithBirthDate extends Person {
    birth: Date;
  }

  type TPersonWithBirthDate = Person & { birth: Date };
  ```

  <br/>

- ‘매핑된 타입’또는 `Pick`라이브러리를 사용하자

  ```tsx
  interface State {
    userId: string;
    pageTitle: string;
    recentFiles: string[];
    pageContents: string;
  }
  type NavState = {
    userId: State["userId"];
    pageTitle: State["pageTitle"];
    recentFiles: State["recentFiles"];
  };
  ```

  State를 인덱싱하여 속성의 타입에서 중복을 제거할 수 있다. 그러나 여전히 코드가 반복되는 느낌이다.

  ```tsx
  type NavState = {
    [k in "userId" | "pageTitle" | "recentFiles"]: State[k];
  };
  ```

  이 때 ‘매핑된 타입’을 사용해 반복된 코드를 줄일 수 있다.

  ```tsx
  // type Pick<T,K extends keyof T> = {[K in K]: T[K]}; 라이브러리 존재
  type NavState = Pick<State, "userId" | "pageTitle" | "recentFiles">;
  ```

  이외에도 `Pick`라이브러리를 사용하여 반복을 줄일 수 있다. `Pick`은 제너릭 타입이며, 함수 호출과 같이 매개변수 타입을 받아서 결과 타입을 반환한다.

  태그된 유니온에서도 다른 형태의 중복이 발생할 수 있는데, 마찬가지로 인덱싱과 `Pick`을 통해 줄일 수 있다.

  ```tsx
  interface SaveAction {
    type: "save";
  }
  interface LoadAction {
    type: "load";
  }
  type Action = SaveAction | LoadAction;
  type ActionType = Action["type"]; // 'save' | 'load'
  type ActionRec = Pick<Action, "type">; // {type: 'save' | 'load'}
  ```

  `ActionType`은 type속성의 가능한 값들을 추출한 것이고, `ActionRec`은 Action에서 type속성만 선택하여 객체를 정의한다.

  <br/>

- `keyof` 또는 `Partial`라이브러리를 사용하자

  ```tsx
  interface Options {
    width: number;
    height: number;
    color: string;
    label: string;
  }
  type OptionsUpdate = { [k in keyof Options]?: Options[k] };

  class UIWidget {
    constructor(init: Options);
    update(options: OptionsUpdate);
    // 	update(options: Partial<Options>)
  }
  ```

  **Options**의 모든 속성을 선택적으로 만들고 싶다면 `keyof`를 사용해 모든 속성을 옵셔널하게 새로 정의한다. 새로 정의하지 않고 `Partial`라이브러리를 사용할 수도 있다

  <br/>

- 값의 형태에 해당하는 타입을 정의하고 싶을 때는 `typeof`를 사용하자

  ```tsx
  const INIT_OPTIONS = {
    width: 640,
    color: "#00FF00",
  };
  type Options = typeof INIT_OPTIONS;
  ```

  이 때, 선언의 순서에 주의한다. 타입 정의를 먼저하고 값이 그 타입에 할당 가능하다고 선언하는 것이 좋다

  <br/>

- 함수나 메서드의 반환 값에 명명된 타입을 만들고 싶을 땐 `ReturnType`라이브러리를 사용하자

  ```tsx
  function getUserInfo(userId: string) {
  	...
  	return {userId, name, age, height}
  }
  type UserInfo = ReturnType<typeof getUserInfo>;
  ```

  함수의 ‘값’인 `getUserInfo`가 아닌 typeof `getUserInfo`가 적용되었다. 이렇듯 적용대상이 값인지 타입인지 정확히 알고 구분해서 처리해야 한다.

  <br/>

- 제너릭 타입에서 매개변수를 제한할 수 있는 방법은 `extends`를 사용하는 것이다

  ```tsx
  interface Name {
  	first: string;
  	last: string;
  }
  type DancingDuo<T extends Name> = [T,T];

  const c1: DancingDuo<Name> = [...]
  const c2: DancingDuo<{first: string}> = [...] // 오류. last속성이 없음

  // Pick 라이브러리도 마찬가지로 범위를 T가 가진 키값들로 제한한다
  type Pick<T,K extends keyof T> = {[k in K]: T[k]}
  ```

  `extends`를 ‘확장’이라는 개념이 아닌 ‘부분 집합’임을 이해하고 범위를 좁힌다고 생각한다.
