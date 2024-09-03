### Item23 - 한꺼번에 객체 생성하기

- 객체 생성 시에 속성을 하나씩 추가하기보다는 여러 속성을 포함해서 한꺼번에 생성하는 것이 타입 추론에 유리하다
- 객체를 반드시 나눠서 만들어야 한다면, 타입 단언문을 사용해 타입 체커를 통과하게 할 수 있다.
  ```tsx
  interface Point {
    x: number;
    y: number;
  }
  const pt = {} as Point;
  pt.x = 3; // 정상
  ```
  그러나 웬만하면 선언할 때 객체를 한꺼번에 만드는 것이 좋다.

<br/>

- 작은 객체들을 조합해서 더 큰 객체를 만들어야 하는 경우에는 ‘객체 전개 연산자’ `…`을 사용한다.

  ```tsx
  const pt = { x: 3, y: 4 };
  const id = { name: "a" };
  const namedPoint = { ...pt, ...id };
  namedPoint.name = "b"; // 정상
  ```

  객체 전개 연산자를 사용하면 타입 걱정 없이 필드 단위로 객체를 생성할 수도 있다. 이 때 모든 업데이트마다 새 변수를 사용해 각자 새로운 타입을 얻도록 하는 것이 중요하다.

  ```tsx
  const pt0 = {};
  const pt1 = { ...pt0, x: 3 };
  const pt: Point = { ...pt1, y: 4 };
  ```

  <br/>

- 타입에 안전한 방식으로 조건부 속성을 추가하려면, 속성을 추가하지 않는 `null` 또는 `{}`로 객체 전개를 사용한다.

  ```tsx
  declare let hasMiddle: boolean;
  const first = { name: "Harry" };
  const president = { ...first, ...(hasMiddle ? { middle: "S" } : {}) };
  ```

  편집기에서 `president`에 마우스를 올려보면 타입이 `middle`타입이 선택적 속성을 가진 것으로 추론된다.
  만약 전개 연산자로 여러 속성을 한꺼번에 추가하게 된다면 타입이 유니온으로 추론된다. 따라서 여러 속성을 추가한 것이 선택적 속성이길 원했지만, 유니온 타입이 된 것이라면 아래와 같이 헬퍼 함수를 사용하면 된다.

  ```tsx
  function addOptional<T extends object, U extends object>(
    a: T,
    b: U | null
  ): T & Partial<U> {
    return { ...a, ...b };
  }

  const pharaoh = addOptional(
    name,
    hasDates ? { start: -2000, end: -3000 } : null
  );
  pharaoh.start; // 정상
  ```
