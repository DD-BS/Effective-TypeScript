### Item21 - 타입 넓히기

- 정적 분석 시점에, 변수는 ‘가능한’ 값들의 집합인 타입을 가진다
- 만약 변수를 초기화할 때 타입을 명시하지 않으면 타입 체커는 타입을 유추하고 결정해야 하는데 이러한 과정을 ‘넓히기’라 한다.
- ‘타입 넓히기’로 인해 추론 가능한 타입이 여러 개 생기면, 잘못된 추론이 발생할 수도 있다.

  ```tsx
  interface Vector3D {
    x: number;
    y: number;
    z: number;
  }

  function getComponent(vector: Vector3D, axis: "x" | "y" | "z") {
    return vector[axis];
  }

  let x = "x";
  let vec = { x: 10, y: 20, z: 40 };
  getComponent(vec, x); // x에서 타입 오류 발생
  ```

  위 코드에서 `getComponent`함수 호출 시 두번째 매개변수인 x의 타입은 `‘x’ | ‘y’ | ‘z’`여야 하지만, 타입 할당 시점에 넓히기가 동작하여 `string`으로 추론되었다. `string`타입은 `‘x’ | ‘y’ | ‘z’`타입에 할당이 불가능하므로 오류가 발생한 것이다. 이는 타입스크립트가 `let`으로 선언된 변수 `x`가 언제든 재할당이 가능할 것이라 예상했기 때문에 `string`으로 추론한 것이다.

- 넓히기의 과정을 제어하는 몇 가지 방법이 있다.

1. const 사용하기
   - `let`대신 `const`로 변수를 선언해 더 좁은 타입을 만들 수 있다. 위 예제에서도 `const`로 변경하면 오류가 사라진다.
   - 그러나 객체와 배열의 경우에는 `const`를 사용해도 여전히 문제가 발생한다.
   - 객체의 경우 타입스크립트의 넓히기 알고리즘은 각 요소를 `let`으로 할당하기 때문이다.
2. 명시적 타입 구문 제공하기

   ```tsx
   const v: { x: 1 | 3 | 5 } = {
     x: 1,
   }; // x의 타입은 1|3|5
   ```

3. 타입 체커에 추가적인 문맥 제공하기
   - 예를 들면, 함수의 매개변수로 값을 전달한다
4. const 단언문 사용하기

   - 변수 선언에 쓰이는 let이나 const와는 다른, 온전히 타입 공간에만 해당하는 기법이다

   ```tsx
   const v1 = { x: 1, y: 2 }; // 타입 {x: number; y: number;}
   const v2 = { x: 1 as const, y: 2 }; // 타입 {x: 1; y:number;}
   const v3 = { x: 1, y: 2 } as const; // 타입 {readonly x: 1; readonly y:2;}

   const a1 = [1, 2, 3]; // 타입 number[]
   const a2 = [1, 2, 3] as const; // 타입 readonly [1,2,3]
   ```

   이렇게 값 뒤에 `as const`를 작성해 최대한 좁은 타입으로 추론하도록 한다. 배열을 튜플타입으로 추론하는 경우에도 사용할 수 있다.
