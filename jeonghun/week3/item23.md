# 객체 한번에 생성하기

- 객체를 생성할 때에는 객체를 먼저 만들고 해당 객체에 속성을 하나씩 추가하는 것보다 `객체를 한번에 만드는 것이 좋다`

```ts
// 위 방식보다는
const point = {}; // Type : {}
point.x = 1; // '{}' 형식에 'x'속성이 없습니다. error

// 하단 방식이 좋다
const point = {
  x: 1,
  y: 2,
}; // 에러 미발생
```

### 작은 객체들을 조합하여 큰 객체를 만드는 경우

이 경우에도 여러 단계를 거치는것보다 `객체 전개 연산자(스프레드 연산자) ...`를 사용하면 큰 객체를 한꺼번에 만들어 낼 수 있다

```ts
const namedPoint = {
  ...pt,
  ...id,
};

const firstLast = { first: 'Barnes', last: 'Bucky' }
const president = { ...firstLast, ...(hasMiddle ? { middle: 'B' } : {} };

```

### 전개 연산자를 사용해서 한꺼번에 여러 속성을 추가 할 수도 있다

```ts
declare let hasDates: boolean;
const nameTitle = { name: 'bibi', title: 'boy' };
const pharaoh = {
  ...nameTitle,
  ...(hasDates ? { start: -2589, end: -2566 } : {})

/*
hasDate가 true 면 name, title, start, end
hasDates가 false면  name, title
*/

const pharaoh: {
  start: number;
  end: number;
  name: string;
  title: string;
} | {
  name: string;
  title: string;
}

pharaoh.start // { name: string; title: string;} 형식에 'start' 속성이 없다 error

```

이러한 경우처럼 조건부로 속성을 추가 하고 싶은 경우에는 `addOptional`을 사용하는게 좋다.

```ts
function addoptional<T extends object, U extends object>(
a: T, b | null
) : T & Partial<U> {
  return {...a, ...b};
}

```

### 요약

- 속성을 제가각 추가하지 말고 한번에 객체로 만들어라
- 속성을 추가하려면 객체 전개를 사용해라
