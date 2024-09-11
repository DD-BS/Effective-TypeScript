# any 타입은 가능한 한 좁은 범위에서만 사용하기

- TS의 타입 시스템은 선택적이고 점진적이라서 `정적이면서 동적인 특성을 동시`에 가집니다.

> 함수에서의 any 사용

```ts
// any를 넓은 범위로 사용한 경우
function f1() {
  const x: any = expressionReturningFoo(); // 이렇게 하지 맙시다.
  processBar(x);
  return x; // x:any
}

// any를 좁은 범위로 사용한 경우
function f2() {
  const x = expressionReturningFoo();
  processBar(x as any); // 이렇게 할 것
  // processBar 함수 안에서만 영향을 주니까 타입 지정보다는 단언이 낫습니다.
  return x; // x:Foo
}

// any를 사용하지 않고 오류를 제거할 수 있는 경우
function f3() {
  const x = expressionReturningFoo();
  // @ts-ignore
  // 다음 줄 에러가 무시되지만 근본적 해결이 아니라 다른 곳에 문제가 생길 수 있음
  processBar(x);
  return x;
}
```

`오류는 processBar 안의 x에서만 나고있기 때문에 processBar 함수 내부의 x에 단언해주는 것을 권장`합니다. x를 return 해보면 어떤 문제가 발생하는지 알 수 있습니다.

> 객체에서의 any 사용

```ts
// config 객체 전체를 as any로 선언
// 다른 속성들도 타입 체크가 되지 않는 부작용이 생길 수 있습니다.
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value,
  },
} as any; // 이렇게 하지 맙시다.

// 최소한의 범위에만 any를 사용
const config: Config = {
  a: 1,
  b: 2,
  c: {
    key: value as any, // 이렇게 최소한의 범위로만 쓸 것
  },
};
```

### 요약

- 의도치 않은 타입의 안전성 손실을 피하기 위해 사용 범위를 최소한으로 좁혀라
- any타입은 절대 반환하면 안된다
