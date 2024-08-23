### 아이템10 - 객체 래퍼 타입 피하기

- 자바스크립트의 원시값 타입: string, number, boolean, null, undefined, symbol, bigint
- 원시값은 불변(immutable)이며 메서드를 가지지 않는다는 점에서 객체와 구분된다
- `charAt()`과 같이 string의 메서드가 있어보이지만 사실 `String`객체 타입에 정의된 메서드이다
- 자바스크립트는 `string`기본형을 `String`객체로 래핑하고, 메서드를 호출하고, 마지막에 래핑한 객체를 버린다
- `string`기본형과 `String`객체 래퍼는 동일하지 않다.
- `String`객체는 오직 자기 자신하고만 동일하다
  ```tsx
  new String(’hello’) === new String(’hello’)  // false 서로 다른 객체이므로
  ```
- 다른 기본형에도 동일하게 객체 래퍼 타입이 존재한다
  - `Number`, `Boolean`, `Symbol`, `BigInt` (null과 undefined는 없음)
- `string`은 `String`에 할당할 수 있지만 `String`은 `string`에 할당할 수 없으므로 `string`을 사용할 때는 특히 유의한다.
  ```tsx
  function isGreeting(phrase: String) {
    return ["hello", "good day"].includes(phrase); // 오류: String이 아닌 string 사용하기
  }
  ```
- 타입스크립트에서 제공하는 타입 선언은 전부 기본형 타입으로 되어 있으므로 굳이 객체 래퍼 타입을 사용할 필요 없다
