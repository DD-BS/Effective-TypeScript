# any 타입의 진화 이해하기

- 타입스크립트에서 일반적으로 변수의 타입은 변수를 선언할 때 결정된다.
- 이후 타입은 정제될 수 있지만(null 체크 등), 새로운 값이 추가되도록 확장은 불가능
  `number에서 number[]로 확장이 불가능하다는 말`
  > any 타입은 예외를 따름

```ts
function range(start: number, limit: number) {
  const out = []; // 타입이 any[]
  for (let i = start; i < limit; i++) {
    out.push(i); //out의 타입이 any[];
  }
  return out; //타입이 number[];
}
```

- 위에서 out의 타입은 any[]로 선언되었지만 number 타입의 값을 넣은 순간부터 타입은 number[]로 진화한다.

### 요약

- 암시적으로 any는 any[]로 진화할 수 있다. 이러한 동작을 발생시키는 코드를 인지하고 이해할 수 있어야 한다.
- any를 진화시켜 사용하기보다는 명시적 타입 구문을 사용하는게 더 안전하다.
