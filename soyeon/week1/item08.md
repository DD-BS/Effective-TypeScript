### 아이템8 - 타입 공간과 값 공간의 심벌 구분하기

- 타입스크립트의 심벌은 타입 공간이나 값 공간 중의 한 곳에 존재한다
- 컴파일 과정에서 타입 정보는 제거되기 때문에 심벌이 제거된다면 타입에 해당된다
  ```tsx
  interface Cylinder {
    // 타입
    radius: number;
    height: number;
  }
  const Cylinder = () => {}; // 값
  ```
- `class`와 `enum`은 상황에 따라 타입과 값 두 가지 모두 가능하다
- `class`가 타입으로 쓰일 때는 속성과 메서드가 쓰이는 반면, 값으로 쓰일 때는 생성자가 사용된다.
- `typeof`연산자는 타입에서 쓰일 때와 값에서 쓰일 때 다른 기능을 한다

  ```tsx
  interface Person {
    first: string;
    last: string;
  }
  interface EmailParams {
    p: Person;
    subject: string;
    body: string;
  }

  const p: Person = {first: 'Jane', last: 'Jacobs'};
  function email (params: EmailParams): Response{...}

  type T1 = typeof p; // 타입 Person
  type T2 = typeof email; // 타입 (params: EmailParams) => Response

  const v1 = typeof p; // 값 'object'
  const v2 = typeof email; // 값 'function'
  ```

  - 타입의 관점에서 `typeof`는 값을 읽어 타입으로 반환한다
  - 값의 관점에서 `typeof`는 자바스크립트 런타임의 `typeof` 연산자가 된다

- `class`를 `typeof`연산자와 함께 쓰는 경우

  ```tsx
  class Cylinder {
    radius = 1;
    height = 1;
  }

  const v = typeof Cylinder; // 값 'function'
  type T = typeof Cylinder;
  ```

  - 자바스크립트에서 클래스는 실제 함수로 구현되기 때문에 값은 `‘function’`이 된다
  - p.50 `T`타입은 `Cylinder`가 인스턴스 타입이 아닌 `new`키워드를 사용할 때 볼 수 있는 생성자 함수이다 ❓
    ```tsx
    declare let fn: T;
    const c = new fn(); // 타입 Cylinder
    ```
  - 이는 `InstanceType`제너릭을 사용해 생성자 타입과 인스턴스 타입을 전환할 수 있다
    ```tsx
    type C = InstanceType<typeof Cylinder>; // 타입 Cylinder
    ```

- 속성 접근자인 `[]`는 타입으로 쓰일 때에도 동일하게 동작한다
- `obj[’field’]`와 `obj.field`는 값이 동일하더라도 타입이 다를 수 있다
- 따라서 타입의 속성을 얻을 때는 반드시 `obj[’field’]`을 사용해야 한다

- 값과 타입 두 공간 사이에서 다른 의미를 가지는 코드 패턴들
  - 값으로 쓰이는 `this`는 자바스크립트의 `this`키워드이고, 타입으로 쓰이는 `this`는 일명 ‘`다형성 this`’라 불리는 타입스크립트의 타입이다. 서브클래스의 메서드 체인 구현할 때 유용하다
  - 값에서 `&`와 `|`는 AND와 OR연산이고, 타입에서는 인터섹션과 유니온이다
  - `const`는 새 변수를 선언하지만 `as const`는 리터럴 또는 리터럴 표현식의 추론된 타입을 바꾼다
  - `extends`는 서브클래스(`class A extends B`) 또는 서브타입(`interface A extends B`) 또는 제너릭 타입의 한정자(`Generic<T extends number>`)를 정의할 수 있다
  - `in`은 루프(`for (key in object)`) 또는 매핑된 타입에 등장한다
- 타입스크립트에서 올바른 방식으로 구조분해할당을 진행해야 값과 타입을 구분할 수 있다
  ```tsx
  function email({person, subject, body}: {person: Person, subject: string, body: string} ){...}
  ```
