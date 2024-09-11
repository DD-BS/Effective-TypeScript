# 함수 안으로 타입 단언문 감추기

- 함수 내부에는 타입 단언 사용하고, 함수 외부로 드러나는 타입은 정의를 정확히 명시하는 것이 좋음

1. 어떤 함수든 캐싱할 수 있는 래퍼 함수 cacheWrapper

```ts
declare function cacheWrapper<T extends Function>(fn: T): T;
declare function shallowEqual(a: any, b: any): boolean;

// TS는 반환문에 있는 함수와 원본 함수 T 타입이 어떤 관련이 있는지 알지 못하기 때문에 오류 발생
function cacheWrapper<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;

  return function (...args: any[]) {
    // 🚨 '(...args: any[]) => any' 형식은 'T' 형식에 할당할 수 없습니다.
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  };
}
```

2. 단언문을 추가해서 오류를 제거

```ts
function cacheWrapper<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;

  return function (...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T; // 타입 단언
}
```

### 요약

- 불가피하게 사용해야 한다면, 정확한 정의를 가지는 함수 안으로 숨기도록 하자
