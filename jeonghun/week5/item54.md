# 객체를 순회하는 노하우

아래 코드는 정상적으로 실행되지만, 편집기에서는 오류가 발생함

```ts
const obj = {
  one: "uno",
  two: "dos",
  three: "tres",
};

for (const k in obj) {
  const v = obj[k]; //에러) obj에 인덱스 시그니처가 없기 때문에 엘리먼트는 암시적으로 'any' 타입임.
}
```

- k와 obj 객체의 키 타입이 서로 다르게 추론되어 발생한 오류(구조적 타이핑 문제)

이럴 경우 k의 타입을 더욱 구체적으로 명시해주면 오류가 해결됨

```ts
const obj = {
  one: "uno",
  two: "dos",
  three: "tres",
};

let k: keyof typeof obj; // 타입이 "one" | "two" | "three";

for (k in obj) {
  const v = obj[k]; //정상
}
```

```ts
interface ABC {
  a: string;
  b: string;
  c: number;
}

function foo(abc: ABC) {
  for (const k in abc) {
    // const k: string
    const v = abc[k];
    // ~~~~~~ Element implicitly has an 'any' type
    //        because type 'ABC' has no index signature
  }
}

function foo(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    k; // string 타입
    v; // any 타입
  }
}
```

위와 같은 타입일 경우 Object.entries를 사용하면 간단하게 해결 됨.

- 단지 객체의 키와 값을 순회하고 싶을 때 사용
