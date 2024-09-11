### Item38 - any 타입은 가능한 한 좁은 범위에서만 사용하기

- 의도치 않은 타입 안전성의 손실을 피하기 위해 any의 사용 범위를 최소한으로 좁힌다.
  ```tsx
  function processBar(b:Bar) {...}
  function f() {
  	const x = expressionReturningFoo();
  	processBar(x) // 오류
  }
  ```
  위와 같은 오류를 해결하기 위해서는 두 가지 방식이 있다.
  ```tsx
  function f1() {
    const x: any = expressionReturningFoo();
    processBar(x);
  }
  function f2() {
    const x = expressionReturningFoo();
    processBar(x as any);
  }
  ```
  - `f1()`과 `f2()`중에 `f2()`를 더 권장한다.
  - 이유는 `any`타입이 `processBar`함수 내의 매개변수에서만 사용된 표현식이므로 다른 코드에는 영향을 미치지 않기 때문이다.
  - 만일 `f1`함수가 `x`를 반환한다면 더 큰 문제가 발생한다.
  - `f2`함수에서도 `as any`단언문을 사용하기 보단 `@ts-ignore`를 사용해 오류를 제거할 수 있다.
  - 그러나 근본적인 원인을 해결한 것이 아니기 때문에 다른 곳에서 더 큰 문제가 발생할 수 있다.
- 객체를 사용하는 경우에도 객체 전체를 any로 단언하기보단 필요한 속성들만 any로 단언해주어 범위를 최소한으로 줄이는 것이 좋다.
  ```tsx
  const config: Config = {
    a: 1,
    b: 2,
    c: {
      key: value,
    },
  } as any; // 금지
  ```
  ```tsx
  const config: Config = {
    a: 1,
    b: 2,
    c: {
      key: value as any, // 필요한 속성에만 사용할 것
    },
  };
  ```
