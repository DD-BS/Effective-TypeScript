### Item12 - 함수 표현식에 타입 적용하기

- 자바스크립트와 타입스크립트는 함수 ‘문장’과 함수 ‘표현식’을 다르게 인식한다

  ```tsx
  function rollDice1(sides: number) {} // 문장
  const rollDice2 = (sides: number) => {}; // 표현식

  type DiceRollFn = (sides: number) => number; // 함수 타입 선언
  const rollDice3: DiceRollFn = (sides) => {}; // 함수 표현식에 타입 사용
  ```

  함수 표현식을 사용하면 함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언하여 재사용할 수 있다는 장점이 있기 때문에 함수 표현식을 사용하는 것이 좋다

- 라이브러리는 공통 함수 시그니처를 타입으로 제공하기도 한다. 예를 들면, 리액트는 함수의 매개변수에 명시하는 MouseEvent 타입 대신에 함수 전체에 적용할 수 있는 MouseEventHanlder 타입을 제공한다.
- 웹 브라우저에서 `fetch()`를 사용한 경우도 살펴보자
  ```tsx
  declare function fecth(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response>;

  async function checkedFetch1(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new Error("Request failed" + response.status);
    }
    return response;
  } // 문장

  const checkedFetch2: typeof fecth = async (input, init) => {
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new Error("Request failed" + response.status);
    }
    return response;
  }; // 표현식
  ```
  `checkedFetch2`와 같이 함수 표현식으로 더 간결하게 작성할 수 있다. 또한 타입 구문은 `checkedFetch`의 반환 타입을 보장하며, `throw new Error` 대신에 `return new Error`를 사용했다면 이 실수를 찾아낸다.
