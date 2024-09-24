# DOM 계층 구조 이해하기

- 타입스크립트에서는 DOM 엘리먼트의 계층 구조를 파악하기 좋다.
- Element와 EventTarget에 달려 있는 Node의 구체적인 타입을 안다면 타입 오류를 디버깅할 수 있고, 언제 타입 단언을 사용해야 할지 알 수 있다.

> HTMLInputElement는 HTMLElement의 서브타입이고, HTMLElement는 Element의 서브타입임. 또한 Element는 Node의 서브타입이고, Node는 EventTarget의 서브타입임.

[참고자료](https://ko.javascript.info/basic-dom-node-properties)

### 계층 구조별 타입

#### EventTarget

- DOM 타입 중 가장 추상화된 타입
- 이벤트 리스터를 추가하거나 제거하고, 이벤트를 보내는 것만 가능

```Ts
function handleDrag(eDown: Event) {
  const targetEl = eDown.currentTarget;
  targetEl.classList.add("dragging");
  // ~~~~~~~           객체가 'null'인 것 같습니다.
  //         ~~~~~~~~~ 'EventTarget' 형식에 'classList' 속성이 없습니다.
  // ...
}
```

- currentTarget 속성의 타입은 EventTarget | null 입니다.
- EventTarget 타입에 classList 속성이 없습니다.

#### Node

- Element가 아닌 Node인 경우 예시 : 텍스트 조각, 주석

```ts
<p>
  And <i>yet</i> it move
  <!-- quote from Galileo -->
</p>
```

<p> 는 HTMLParagraphElement 이며, children과 childNodes 속성을 가지고 있습니다.
children은 자식 엘리먼트 <i>yet</i> 를 포함하는 HTMLCollection.

#### Event 타입

- Event는 가장 추상화된 이벤트. 더 구체적인 타입들은 다음과 같음

UIEvent: 모든 종류의 사용자 인터페이스 이벤트
MouseEvnet: 클릭처럼 마우스로부터 발생되는 이벤트
TouchEvent: 모바일 기기의 터치 이벤트
WheelEvent: 스크롤 휠을 돌려서 발생되는 이벤트
KeyboardEvent: 키 누름 이벤트

### 요약

- DOM 타입은 타입스크립트에서 중요한 정보이다.
- Node, Element, HTMLElement, EventTarget 간의 차이점, Event와 MouseEvent의 차이점을 알아야 한다.
