### Item54 - 객체를 순회하는 노하우

- 단순히 객체의 키와 값을 순회하고 싶다면 `Object.entries`를 사용한다.

```tsx
interface ABC {
  a: string;
  b: string;
  c: number;
}

function foo(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    k; // string 타입
    v; // any 타입
  }
}
```
