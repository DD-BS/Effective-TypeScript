### Item50 - 오버로딩 타입보다는 조건부 타입을 사용하기

```tsx
function double(x: number | string): number | string {
  return x + x;
}
```

- 위 코드는 매개변수에 `number`타입을 넣어도 `string`으로 반환하는 경우도 포함된다.

```tsx
function double<T extends number | string>(x: T): T;
const num = double(12); // 타입이 12
```

- 제너릭을 사용해 타입을 구체적으로 만들었으나 너무 과하게 구체적이다.

```tsx
function double(x: number): number;
function double(x: string): string;

const num = double(12); // 타입이 number

function f(x: number | string) {
  return dobule(x); // 오류. number|string형식의 인수는 string 형식의 매개변수에 할당할 수 없음
}
```

- 여러 가지 타입 선언으로 분리한다.
- 함수 타입이 조금 명확해졌으나 `f()`를 보면 유니온 타입 관련한 문제가 발생한다.

```tsx
function double<T extends number | string>(
  x: T
): T extends string ? string : number;

const num = double(12); // 타입이 number
const str = double("x"); // 타입이 string

function f(x: string | number) {
  double(x);
}
```

- 조건부 타입을 사용하는 것이 가장 좋은 해결책이다.
- 제너릭을 사용했던 예제와 유사하지만, 반환 타입이 더 정교하다.
- 유니온에 조건부 타입을 적용하면, 조건부 타입의 유니온으로 분리되기 때문에 `number | string`의 경우에도 동작한다.
- 따라서, 오버로딩 타입보다 조건부 타입을 사용하는 것이 좋다.
- 조건부 타입은 추가적인 오버로딩 없이 유니온 타입을 지원할 수 있다.
