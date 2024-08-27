# 함수 표현식에 타입 적용

```ts
function rollDice1(sides: number): number {
  /* COMPRESS */ return 0; /* END */
} // 문장
const rollDice2 = function (sides: number): number {
  /* COMPRESS */ return 0; /* END */
}; // 표현식
const rollDice3 = (sides: number): number => {
  /* COMPRESS */ return 0; /* END */
}; // 표현식

export default {};
```

TS에서는 함수 표현식을 사용하는게 좋다
매개변수 타입부터 반환값까지 함수 타입을 선언해서 재사용 할 수 있다

```ts
type DiceRollFn = (sides: number) => number;

//재사용
const rollDice: DiceRollFn = (sides) => {
  /* COMPRESS */ return 0; /* END */
};

export default {};
```

불필요한 함수 선언을 줄일 수 있음

```ts
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;

export default {};
```

## 요약

- 반복 되는 타입 시그니처는 함수 타입을 분리하여 중복을 제거해라
- 다은 함수 시그니처를 참조하려면 typeof fn을 사용해라
