### 아이템7 - 타입이 값들의 집합이라고 생각하기

- ‘할당 가능한 값들의 집합’이 곧 타입이다
- 가장 작은 집합은 아무 값도 포함하지 않는 공집합이며, 타입스크립트에서는 `never`타입이다. `never`타입으로 선언된 변수에는 아무런 값도 할당할 수 없다
  ```tsx
  const x: never = 12; // '12'형식은 'never'형식에 할당할 수 없습니다.
  ```
- 그 다음 작은 집합은 한 가지 값만 포함하여 유닛이라 불리는 `리터럴(literal)`타입이다
  ```tsx
  type A = "A";
  type Twelve = 12;
  ```
- 두 개 혹은 세 개로 묶으려면 `유니온(union)`타입을 사용한다. 집합들의 합집합을 일컫는다

  ```tsx
  type AB = "A" | "B";
  type AB12 = "A" | "B" | 12;

  const a: AB = "A"; // 정상
  const c: AB = "C"; // 오류
  ```

- `&`연산자와 함께 사용해보자.`&`연산자는 두 타입의 교집합을 계산한다

  ```tsx
  interface Person {
    name: string;
  }
  interface Lifespan {
    birth: Date;
    death?: Date;
  }
  type PersonSpan = Person & Lifespan;

  const ps: PersonSpan = {
    name: "AB",
    birth: new Date("1912/12/12"),
    death: new Date("1952/12/12"),
  }; // 정상
  ```

- `Person`과 `Lifespan` 인터페이스는 공통 속성(교집합)이 없으므로 공집합으로 예상할 수 있으나, 타입 연산자는 인터페이스의 속성이 아닌, 값의 집합(타입의 범위)에 적용된다
- 즉, 타입스크립트에서 `&`연산자 사용시 각 타입 내의 속성을 모두 포함해야 한다
- p.41 추가적인 속성을 가지는 경우에도 여전히 그 타입에 속한다❓(오류남..)

  - 잉여 속성 체크(Excess Property Checking)가 수행된다 **(아이템11)**
  - 이는 객체 리터럴로 객체를 생성할 때는 지정된 프로퍼티 외에 추가적인 프로퍼티가 있는지 검사한다
  - 해결법1: 객체 리터럴을 직접 할당하지 않고, 중간 변수로 할당하면 잉여 속성 체크를 피할 수 있다

    ```tsx
    const tempPs = {
      name: "AB",
      birth: new Date("1912/12/12"),
      death: new Date("1952/12/12"),
      age: 40,
    };

    const ps: PersonSpan = tempPs; // 오류 발생하지 않음
    ```

  - 해결법2: 타입 단언을 사용하여 타입스크립트에게 추가 프로퍼티가 있는 것을 허용하도록 명시할 수 있다
    ```tsx
    const ps = {
      name: "AB",
      birth: new Date("1912/12/12"),
      death: new Date("1952/12/12"),
      age: 40,
    } as PersonSpan;
    ```
  - 해결법3: 타입에 `age` 프로퍼티를 명시적으로 추가한다

    ```tsx
    interface Person {
      name: string;
      age?: number; // age를 선택적으로 추가
    }
    interface Lifespan {
      birth: Date;
      death: Date;
    }
    type PersonSpan = Person & Lifespan;

    const ps: PersonSpan = {
      name: "AB",
      birth: new Date("1912/12/12"),
      death: new Date("1952/12/12"),
      age: 40, // 오류가 발생하지 않음
    };
    ```

- 두 인터페이스에 `keyof`연산자와 유니온 사용하기
  ```tsx
  interface Person {
    name: string;
  }
  interface Lifespan {
    birth: Date;
    death?: Date;
  }
  type k = keyof (Person | Lifespan); // 타입 never
  ```
  - 유니온 타입에 속하는 값은 어떠한 키도 없기 때문에 공집합이 된다
  - 만약 `Person`인터페이스에 `birth: Date;`가 있었다면 `k`타입은 `'birth'`가 된다
  ```tsx
  keyof (A&B) = (keyof A) | (keyof B)
  keyof (A|B) = (keyof A) & (keyof B)
  ```
- 일반적으로 `extends`를 사용해 확장하는 방식을 쓴다. 이 때 상속의 관점보다는 **부분 집합**이라는 관점으로 이해해야 쉽다
  ```tsx
  interface Person {
    name: string;
  }
  interface PersonSpan extends Person {
    birth: Date;
    death?: Date;
  }
  ```
- `extends`키워드는 제너릭 타입에서 한정자로도 쓰인다 (’~의 부분집합’을 의미)

  ```tsx
  function getKey<K extends string>(val:any, key:K){...}

  getKey({}, 'x'); // 정상
  getKey({}, Math.random() < 0.5 ? 'a' : 'b'); // 정상
  getKey({}, document.title); // 정상
  getKey({}, 12); // 오류: string이 아님
  ```

  ```tsx
  interface Point {
  	x: number;
  	y: number;
  }

  function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {...}

  const pts: Point[] = [{x:1, y:1},{x:2, y:0}];
  sortBy(pts, 'x') // 정상
  sortBy(pts, 'y') // 정상
  sortBy(pts, Math.random() < 0.5 ? 'x' : 'y') // 정상
  sortBy(pts, 'z') // 오류:
  ```

  - `Point`인터페이스를 정의한다
  - `sortBy()`에 제너릭 타입으로 T의 키인 K와 T를 설정하고, 매개변수 vals는 T[]타입을, key는 K타입을 받는다
  - 이 때 K는 T의 키들 중에 하나(keyof)이므로 T가 만약 Point라면 ‘x’ 또는 ‘y’가 된다
  - `pts`변수에 `Point`타입으로 배열을 할당했고, `sortBy()`에 `pts`를 넘겼으므로 T는 `Point`타입이 된다
  - 두번째 매개변수인 k에는 K타입, 즉 T의 키인 ‘x’ 또는 ‘y’ 중 하나를 넘겨야하므로 ‘z’가 들어오는 경우는 오류가 발생한다
