### Item15 - 동적 데이터에 인덱스 시그니처 사용하기

- 타입에 ‘인덱스 시그니처’를 명시해 유연하게 매핑을 표현할 수 있다.

  ```tsx
  type Rocket = { [property: string]: string };
  const rocket: Rocket = {
    name: "Falcon 9",
    variant: "v1.0",
    thrust: "4,940 kN",
  };
  ```

  그러나 이렇게 타입 체크가 수행되면 단점이 있다.

  - 잘못된 키를 포함해 모든 키를 허용한다. name 대신 Name으로 작성해도 유효함
  - 특정 키가 필요하지 않다. `{}`도 유효한 Rocket타입이다
  - 키마다 다른 타입을 가질 수 없다
  - 자동 완성 기능이 동작하지 않는다

  따라서 이런 인덱스 시그니처는 **동적 데이터를 표현할 때 사용**한다.

  ```tsx
  function parseCSV(input: string): {[columnName: string]: string}[] {...}
  ```

  <br/>

- 가능하다면 인덱스 시그니처보다 인터페이스, Record, 매핑된 타입 같은 정확한 타입을 사용한다.
  ```tsx
  interface Row1 = { [column: string]: number } // 인덱스 시그니처 사용시 너무 광범위
  type Vec3D = Record<'x'|'y'|'z', number>; // Record 사용
  type ABC1 = {[k in 'a'|'b'|'c']: number}; // 매핑된 타입
  type ABC2 = {[k in 'a'|'b'|'c']: k extends 'b' ? string : number}; // 조건부 사용
  ```
  매핑된 타입은 조건부를 사용해 키마다 별도의 타입을 사용할 수도 있다
