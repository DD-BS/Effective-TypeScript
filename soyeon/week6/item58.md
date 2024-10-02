### Item58 - 모던 자바스크립트로 작성하기

- 순수 자바스크립트를 타입스크립트로 마이그레이션 시, 타입 체크 설정을 해제(예를 들어, `noImplicitAny`를 `off`)하여 타입 체크가 동작하지 않도록 한다.
- 타입스크립트는 타입 체크 기능 외에, 타입스크립트 코드를 특정 버전의 자바스크립트로 컴파일하는 기능도 있다.
- 즉, 타입스크립트 컴파일러를 자바스크립트 `트랜스파일러`로 사용할 수 있다.
- 따라서 마이그레이션을 어디서부터 시작할 지 몰라 막막하다면 옛날 버전의 자바스크립트 코드를 최신 버전의 자바스크립트로 바꾸는 작업부터 시작한다.

<br/>

**ECMAScript모듈 사용하기**

- ES2015부터는 import와 export를 사용하는 ES모듈이 표준이 되었다.

  ```tsx
  // CommonJS
  // a.js
  const b = require("./b");

  // ECMAScript module
  // a.ts
  import * as b from "./b";
  ```

<br/>

**프로토타입 대신 클래스 사용하기**

- 개발자들은 견고하게 설계된 클래스 기반 모델을 선호했기 때문에, ES2015는 `class`키워드를 사용하는 클래스 기반 모델이 도입되었다.
- 타입스크립트를 사용한다면 편집기에서 프로토타입 객체에 마우스를 올려 `Convert function to an ES2015 class`기능을 사용해 간단하게 클래스 객체로 변환할 수 있다.

  ```tsx
  // 프로토타입
  function Person(first, last) {
    this.first = first;
    this.last = last;
  }

  Person.prototype.getName = function () {
    return this.first + " " + this.last;
  };

  // 클래스
  class Person {
    first: string;
    last: string;

    constructor(first: string, last: string) {
      this.first = first;
      this.last = last;
    }
    getName() {
      return this.first + " " + this.last;
    }
  }
  ```

  <br/>

**`var`대신 `let`/`const` 사용하기**

- 자바스크립트 `var`키워드의 스코프 규칙에 문제가 있다는 것은 널리 알려진 사실이다.
- 따라서 `var`대신에 `le`t과 `const`를 사용해 스코프 문제를 피할 수 있다.
- 중첩된 `함수` 구문에도 `var`의 경우와 비슷한 스코프 문제가 존재한다.
- 특히, 호이스팅은 실행 순서를 예상하기 어렵게 만들고 직관적이지 않으므로 함수 표현식(`const bar = () ⇒ {}`)을 사용하여 호이스팅 문제를 피하는 것이 좋다.

<br/>

**`for(;;)` 대신 `for-of` 또는 배열 메서드 사용하기**

- 과거 자바스크립트에서는 배열을 순회할 때 C스타일의 for루프를 사용했다.
- `for-of`루프는 코드가 짧고 인덱스 변수를 사용하지도 않기 때문에 실수를 줄인다.
- 인덱스가 필요한 경우, `forEach`메서드를 사용한다.
- `for-in`문법도 존재하지만 몇 가지 문제점이 있으므로 사용하지 않는 것이 좋다.(아이템16)

<br/>

**함수 표현식보다 화살표 함수 사용하기**

- `this`키워드는 일반적인 변수들과는 다른 스코프 규칙을 가지기 때문에, 자바스크립트에서 가장 어려운 개념 중 하나다.
- 일반적으로는 `this`가 클래스 인스턴스를 참조하는 것을 기대하지만 아래 예제처럼 예상치 못한 결과가 나오는 경우도 있다.

  ```tsx
  class Foo {
    method() {
      console.log(this);
      [1, 2].forEach(function (i) {
        console.log(this);
      });
    }
  }

  const f = new Foo();
  f.method();
  // strict모드에서 Foo, undefined, undefined를 출력
  // non-strict모드에서 Foo, window, window (!)를 출력
  ```

- 대신 화살표 함수를 사용하면 상위 스코프의 `this`를 유지할 수 있다.

  ```tsx
  class Foo {
    method() {
      console.log(this);
      [1, 2].forEach((i) => {
        console.log(this);
      });
    }
  }

  const f = new Foo();
  f.method();
  // 항상 Foo, Foo, Foo를 출력
  ```

- 인라인(또는 콜백)에서는 일반 함수보다 화살표 함수가 더 직관적이고 코드도 간결해지므로 가급적 화살표 함수를 사용한다.
- 또, 컴파일러 옵션에 `noImplicitThis` 또는 `strict`를 설정하면, 타입스크립트가 `this`바인딩 관련 오류를 표시해주므로 설정하는 것이 좋다.

<br/>

**단축 객체 표현과 구조 분해 할당 사용하기**

- 변수와 객체 속성의 이름이 같다면, 중복된 이름을 생략하여 작성한다.

  ```tsx
  const x = 1,
    y = 2,
    z = 3;
  //const pt = { x:x, y:y, z:z }
  const pt = { x, y, z };
  ```

- 화살표 함수 내에서 객체를 반환할 때는 소괄호로 감싼다.
  ```tsx
  ["A", "B", "C"].map((char, idx) => ({ char, idx }));
  ```
- 객체 구조 분해 할당을 사용한다.

  ```tsx
  // const props = obj.props;
  // const a = props.a;
  // const b = props.b;

  const { props } = obj;
  const {
    props: { a, b },
  } = obj; // 여기서 a,b는 변수 선언이지만 props는 변수 선언이 아니다.
  ```

- 배열에도 구조 분해 문법을 사용한다.
  ```tsx
  const point = [1, 2, 3];
  const [x, y, z] = point;
  const [, a, b] = point; // 첫 번째 요소 무시
  ```

<br/>

**함수 매개변수 기본값 사용하기**

- 자바스크립트에서 함수의 모든 매개변수는 생략 가능하며 매개변수를 지정하지 않으면 `undefined`로 간주된다.
- 매개변수에 기본값을 지정하면 코드가 간결해질 뿐만 아니라 선택적 매개변수라는 것을 명확히 나타내는 효과를 줄 수 있다.
- 기본값을 기반으로 타입 추론이 가능하다.
  ```tsx
  function parseNum(str, base = 10) {
    return parseInt(str, base);
  }
  ```

<br/>

**저수준 프로미스나 콜백 대신 `async/await` 사용하기**

- `async/await`을 사용하면 코드가 간결해져서 실수를 방지할 수 있고, 비동기 코드에 타입 정보가 전달되어 타입 추론이 가능하다.

<br/>

**연관 배열에 객체 대신 `Map`과 `Set` 사용하기**

- 객체 인덱스 시그니처(아이템15)는 편리하지만, 몇 가지 문제점이 있다.

  ```tsx
  function countWords(text: string) {
    const counts: { [word: string]: number } = {};

    for (const word of text.split(/[\s,.]+/)) {
      counts[word] = 1 + (counts[word] || 0);
    }
    return counts;
  }

  console.log(countWords("Objects have a constructor"));
  // {
  // 	 Objects: 1,
  // 	 have: 1,
  // 	 a: 1,
  // 	 constructor: "1function Object() { [native code] }"
  // }
  ```

- `constructor`키워드는 `Object.prototype`에 있는 생성자 함수다.
- 원치 않는 값일 뿐만 아니라, 타입도 `number`가 아닌 `string`이다.
- 이런 문제를 방지하기 위해서는 `Map`을 사용하는 것이 좋다.
  ```tsx
  function countWords(text:string) {
  	const counts: new Map<string, number>();
  	for (const word of text.split(/[\s,.]+/)) {
  		counts.set(word, 1 + (counts.get(word) || 0));
  	}
  	return counts;
  }
  ```

<br/>

**타입스크립트에 `use strict` 넣지 않기**

- 엄격 모드에 오류로 표시된 부분은 타입스크립트에서도 오류일 가능성이 높다.
- 그러나 타입스크립트에서 수행되는 안전성 검사가 엄격 모드보다 훨씬 더 엄격한 체크를 하기 때문에 타입스크립트에서 `use strict`는 무의미하다.
- 또한, 타입스크립트 컴파일러가 생성하는 자바스크립트 코드에서 `‘use strict’`가 추가된다.
- 타입스크립트 코드에 `alwaysStrict` 설정을 사용한다.
