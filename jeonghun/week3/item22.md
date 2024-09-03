# 타입 좁히기

[이전에 정리한 자료](https://github.com/lionleeee/typescript-TIL/blob/main/24072401_type%20Narrowing.md)

- item 21과 반대되는 개념이 `타입 좁히기` 이다.
- 넓은 타입으로부터 좁은 타입으로 진행되는 과정을 말한다.

### 타입 좁히기 제어 방법

1.`조건문`을 통한 타입 좁히기

만약 el이 null이라면 분기문의 첫번쨰 블록이 실행이 되지않으니, 첫번째 블록은 null을 제외해서 더 좁은 타입이 된다.
분기문에서 예외를 던지거나 함수를 반환하여 블록의 나머지 부분에서 변수의 타입을 좁힐 수 있다

```ts
// 분기문
const el = document.getElementById("foo"); // type : HTMLElement | null
if (el) {
  el.innerHTML = "bibi"; // type : HTMLElement
} else {
  alert("no element"); // type : null
}

// 예외를 던지기
if (!el) throw new Error("no element"); // type : null
el.innerHTML = "bibi"; // type : HTMLElement
```

...이전에 정리한게 있어서 마무리...

### 요약

- 분기분 이외에 여러 종류의 제어 흐름을 이해하는게 중요
- 타입 좁히기를 이해한다면 타입 추론에 대한 개념을 잡고 타입 체커를 더 효율적으로 사용 할 수 있다
