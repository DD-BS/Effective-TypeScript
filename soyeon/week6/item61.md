### Item61 - 의존성 관계에 따라 모듈 단위로 전환하기

- 점진적 마이그레이션을 할 때는 모듈 단위로 하는 것이 이상적이다.
- 한 모듈을 골라서 타입 정보를 추가하면, 해당 모듈이 의존(임포트)하는 모듈에서 비롯되는 타입 오류가 발생한다.
- 의존성과 관련된 오류 없이 작업하려면, 다른 모듈에 의존하지 않는 최하단 모듈부터 작업을 시작해서 의존성의 최상단에 있는 모듈을 마지막으로 완성한다.
- 프로젝트 내에 존재하는 모듈은 서드파티 라이브러리에 의존하지만 서드파티 라이브러리는 해당 모듈에 의존하지 않기 때문에, **서드파티 라이브러리 타입 정보**를 가장 먼저 해결한다.
- 외부 API를 호출하는 경우, **외부 API타입 정보도 추가**한다.
- 모듈 단위로 마이그레이션을 시작하기 전에, 모듈 간의 의존성 관계를 시각화해 보면 좋다.

<br/>

**일반적인 오류들**

- 선언되지 않은 클래스 멤버

  - 자바스크립트는 클래스 멤버 변수를 선언할 필요가 없지만, 타입스크립트에서는 명시적으로 선언해야 한다.(`.js`를 `.ts`로 바꾸면 오류가 발생)

  ```tsx
  class Greeting {
    constructor(name) {
      this.greeting = "Hello"; // 오류
      this.name = name; // 오류
    }
    greet() {
      return this.greeting + " " + this.name; // 오류
    }
  }
  ```

  ```tsx
  class Greeting {
    greeting: string;
    name: any;
    constructor(name) {
      this.greeting = "Hello";
      this.name = name;
    }
    greet() {
      return this.greeting + " " + this.name;
    }
  }
  ```

  - 타입스크립트로 전환하다 보면 잘못된 설계를 발견할 수 있다.
  - 이 때, 개선할 부분을 기록해 두고 리팩토링은 타입스크립트 전환 작업 완료 후에 작업한다.

- 타입이 바뀌는 값

  - 아래 코드는 자바스크립트에서는 문제가 없지만, 타입스크립트가 되는 순간 오류가 발생한다.

  ```tsx
  const state = {};
  state.name = "New York"; // 오류
  state.capital = "Albany"; // 오류
  ```

  - 한꺼번에 객체를 생성하면 간단히 오류를 해결할 수 있다.

  ```tsx
  const state = {
    name: "New York",
    capital: "Albany",
  };
  ```

  - 만약 한꺼번에 생성하기 곤란한 경우라면 임시 방편으로 타입 단언문을 사용하고 마이그레이션이 완료된 후, 아이템9를 참고해 문제를 해결한다.

  ```tsx
  interface State {
    name: string;
    capital: string;
  }
  const state = {} as State;
  state.name = "New York"; // 정상
  state.capital = "Albany"; // 정상
  ```

- 타입스크립트 전환 시 `@ts-check`, `JSDoc` 무효
  - 타입스크립트로 전환하게 되면, `@ts-check`와 `JSDoc`은 작동하지 않는다.
  - `JSDoc`타입 정보를 타입스크립트 타입으로 전환해주는 빠른 수정 기능을 사용해서 전환할 수 있다. (`Annotate with type from JSDoc`)
  - 타입 정보가 생성된 후에는 불필요한 `JSDoc`을 제거한다.
