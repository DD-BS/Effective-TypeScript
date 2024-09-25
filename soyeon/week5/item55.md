### Item55 - DOM 계층 구조 이해하기

- 타입스크립트는 DOM 엘리먼트 계층 구조를 파악하기 용이하다.
- `Element`와 `EventTarget`에 달려 있는 Node의 구체적인 타입을 안다면 타입 오류를 디버깅할 수 있고, 언제 타입 단언을 사용해야 하는지 알 수 있다.
- 엘리먼트들은 자신만의 고유한 속성을 가지고 있기 때문에 이런 속성에 접근하려면 타입 정보 역시 실제 엘리먼트 타입이어야 하므로 구체적인 타입을 지정해야 한다.
- 일반적으로 타입 단언문은 지양해야 하지만, DOM 관련해서는 타입스크리브보다 우리가 더 정확히 알고 있으므로 단언문을 사용해도 좋다.

```tsx
document.getElementById("my-div") as HTMLDivElement;
```

```tsx
function handleDrag(eDown: Event) {
  const dragStart = [eDown.clientX, eDown.clientY]; // 오류. Event에 clientX, clientY 속성이 없음
}
```

- EventTarget의 타입에도 별도의 계층구조가 존재한다.
  - UIEvent
  - MouseEvent
  - TouchEvent
  - WheelEvent
  - KeyboardEvent
- `clientX`, `clientY`를 사용하기 위해서는 `Event`타입 대신 좀 더 구체적인 `MouseEvent`타입을 명시한다.
