### Item41 - any의 진화를 이해하기

- 타입스크립트에서 일반적으로 변수의 타입은 변수를 선언할 때 결정된다.
- 그 후에 `null`인지 체크해서 정제될 수 있지만, 새로운 값이 추가되도록 확장할 수는 없다.
- 그러나 `any`타입과 관련해서 예외인 경우가 존재한다.

  ```tsx
  function range(start: number, limit: number) {
    const out = []; // 타입 any[]
    for (let i = start; i < limit; i++) {
      out.push(i);
    }
    return out; // 반환 타입이 number[]로 추론
  }
  ```

  - 변수 `out`은 `any[]`타입이었으나 반환할 때는 `number[]`로 추론되었다.
  - 이는 타입의 진화(evolve)라 할 수 있으며 타입 좁히기와는 다르다.
  - `any`타입의 진화는 `noImplicitAny`가 설정된 상태에서 변수의 타입이 암시적 `any`인 경우에만 발생한다.

  <br/>

  ```tsx
  const result = [];
  result.push("a");
  result; // 타입 string[]
  result.push(1);
  result; // 타입 (string | number)[]
  ```

  - 배열에 다양한 타입의 요소를 넣으면 배열 타입이 확장되며 진화한다.

  <br/>

  ```tsx
  let val; // 타입 any
  if (Math.random() < 0.5) {
    val = /hello/;
    val; // 타입 RegExp
  } else {
    val = 12;
    val; // 타입 number
  }
  val; // 타입 number | RegExp
  ```

  - 또한 조건문에서도 분기에 따라 타입이 변할 수 있다

  <br/>

  ```tsx
  let val = null; // 타입 any
  try {
    somethingDangerous();
    val = 12;
    val; // 타입 number
  } catch (e) {
    console.warn(e);
  }
  val; // 타입 number | null
  ```

  - 변수의 초깃값이 `null`인 경우도 `any`의 진화가 일어난다. 보통 `try catch`블록 안에서 변수를 할당하는 경우에 나타난다.

  <br/>

  ```tsx
  let val: any;

  if(...) {
  	...
  	val // 타입 any
  } esle {
  	...
  	val // 타입 any
  }
  val // 타입 any
  ```

  - 명시적으로 `any`를 선언하면 `any`타입이 그대로 유지된다.

  <br/>

  ```tsx
  function range(start: number, limit: number) {
    const out = [];
    if (start === limit) {
      return out; // 오류 발생
    }
  }
  ```

  - 그러나 위처럼 `any`타입인 변수에 어떠한 할당도 하지 않고 사용하려고 하면 오류가 발생한다.
  - `any`타입의 진화는 암시적 `any`타입에 어떤 값을 할당할 때만 발생한다.

  <br/>

  ```tsx
  function makeSquare(start: number, limit: number) {
    const out = [];
    range(start, limit).forEach((i) => {
      out.push(i * i);
    });
    return out; // 오류 발생
  }
  ```

  - 암시적 `any`타입은 함수 호출을 거쳐도 진화하지 않는다.
  - 위 코드는 루프로 순회하는 대신 배열의 `map`과 `filter`를 통해 단일 구문으로 배열을 생성해 `any`전체를 진화시킬 수 있다.

### 결론

- 위와 같이 여러 any타입의 진화를 보여줬지만, 타입을 안전하게 지키기 위해서 암시적 any를 진화시키는 방식보다 명시적 타입 구문을 사용하자
