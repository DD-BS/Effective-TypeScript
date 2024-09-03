### Item22 - 타입 좁히기

- 가장 일반적인 `null`체크

  ```tsx
  const el = document.getElementById("foo"); // 타입 HTMLElement | null
  if (el) {
    el.innerHTML = "Party"; // 타입 HTMLElement
  } else {
    el; // 타입 null
  }
  ```

  위 코드에서 `el`이 `null`이라면, 분기문의 첫 번째 블록이 실행되지 않는다. 즉, 더 좁은 타입이 되어 작업이 수월해진다. 그러나 타입 별칭이 존재한다면 그러지 못할 수도 있다 (item24)

  <br/>

- `instanceof`를 사용해서 타입을 좁히는 방법

  ```tsx
  function contains(text: string, search: string | RegExp) {
    if (search instanceof RegExp) {
      return !!search.exec(text); // search타입 RegExp
    }
    return text.includes(search); // search타입 string
  }
  ```

  <br/>

- 속성 체크로 타입 좁히기

  ```tsx
  interface A {a: number}
  interface B {b: number}
  function pickAB{ab: A|B} {
  	if('a' in ab) {ab} // 타입 A
  	else {ab} // 타입 B
  	ab // 타입 A|B
  }
  ```

  <br/>

- 내장 함수로 타입 좁히기

  ```tsx
  function contains(text: string, terms: string | string[]) {
    const termList = Array.isArray(terms) ? terms : [terms];
    termList; // 타입 string[]
  }
  ```

  <br/>

- 명시적인 ‘태그’를 붙여서 타입 좁히기

  ```tsx
  interface UploadEvent {type: 'upload'}
  interface Downloadvent {type: 'download'}
  type AppEvent = UploadEvent | Downloadvent;

  function handleEvent(e: AppEvent) {
  	switch(e.type) {
  		case 'download':
  			...
  		case 'upload':
  			...
  	}
  }
  ```

  위 패턴은 ‘태그된 유니온(tagged union)’ 또는 ‘구별된 유니온(discriminated union)’이라 불린다.

  <br/>

- 타입 식별을 돕기 위해 아래와 같이 커스텀 함수를 도입할 수도 있다.

  ```tsx
  // input element인지 확인하는 함수를 정의
  function isInputElement(el: HTMLElement): el is HTMLInputElement {
    return "value" in el;
  }
  function getElementContent(el: HTMLElement) {
    if (isInputElement(el)) {
      return el.value; // 타입 HTMLInputElement
    }
    return el.textContent; // 타입 HTMLElement
  }
  ```

  이러한 기법을 ‘사용자 정의 타입 가드’라고 한다. 반환 타입에 `el is HTMLInputElement`는 함수의 반환이 true인 경우, 타입 체커에게 매개변수의 타입을 좁힐 수 있다고 알려준다. 또한 타입 가드를 사용해 배열과 객체의 타입을 좁힐 수도 있다. 아래 코드를 보자.

  ```tsx
  const arr1 = ["A", "B", "C"];
  const members = ["A", "B"].map((who) => arr1.find((el) => el === who));
  // members타입 (string | undefined)[]
  ```

  `find()`로 존재하는 요소만 걸러내고 있지만, 여전히 타입에는 `undefined[]`가 포함된다.

  ```tsx
  const members = ["A", "B"]
    .map((who) => arr1.find((el) => el === who))
    .filter((who) => who !== undefined);
  // members타입 (string | undefined)[]
  ```

  `filter()`까지 사용해 `undefined`를 걸러내려 해도 결과는 마찬가지다.❓[(이슈 생성)](https://github.com/DD-BS/Effective-TypeScript/issues/1#issue-2502969125)

  따라서 이런 경우, 아래와 같이 타입 가드를 사용해 타입을 좁힐 수 있다

  ```tsx
  function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
  }
  const members = ["A", "B"]
    .map((who) => arr1.find((el) => el === who))
    .filter(isDefined);
  ```

  <br/>

- 타입스크립트는 조건문에서 타입을 좁히는 데 능숙하지만, 타입을 섣불리 판단하는 실수를 하지 않도록 주의한다
  - 예를 들어 `null`을 제외하기 위한 잘못된 방법 중 하나는 `typeof null === ‘object’`를 체크하는 것으로 결과는 `true`이다.
