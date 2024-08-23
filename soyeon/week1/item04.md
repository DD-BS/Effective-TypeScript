### 아이템4 - 구조적 타이핑에 익숙해지기

- 함수의 매개변수 값이 모두 제대로 주어진다면, 그 값이 어떻게 만들어졌는지 신경쓰지 않고 사용한다

  ```tsx
  interface Vector2D {
    x: number;
    y: number;
  }

  function calcLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  interface NamedVector {
    name: string;
    x: number;
    y: number;
  }

  const v: NamedVector = { x: 3, y: 4, name: "Zee" };
  console.log(calcLength(v));
  ```

- `calcLength()`는 매개변수를 `Vector2D`타입으로 받고있지만, `NamedVector`타입이 들어와도 전혀 오류를 내지 않는다
- 이는 `Vector2D`타입과 `NamedVector`타입이 구조적으로 호환되기 때문이다
- 즉, 타입스크립트의 타입 시스템은 확장에 ‘열려(open)’있기 때문에 타입에 선언된 속성 외에 임의의 속성을 추가하더라도 오류가 발생하지 않는다

  ```tsx
  interface Vector3D {
    x: number;
    y: number;
    z: number;
  }

  function calcLengthL1(v: Vector3D) {
    let length = 0;
    for (const axis of Object.keys(v)) {
      const coord = v[axis]; // Error
      length += Math.abs(coord);
    }
    return length;
  }

  calcLengthL1({ x: 1, y: 2, z: 3 });
  calcLengthL1({ x: 1, y: 2, z: 3, address: "123 Broadway" });
  ```

- 매개변수 `v`는 `Vector3D`타입에 따르면 모두 `number`이므로 coord의 타입이 `number`가 되어야 할 것으로 예상되지만,
- `address`와 같이 `v`는 다른 속성을 가질 수도 있으므로 axis의 타입은 `string`이 될 수도 있다
- 따라서, 정확한 타입으로 객체를 순회하는 것은 까다롭다
- 구조적 타이핑을 사용하면 유닛테스트에 유리하다는 장점이 있다
