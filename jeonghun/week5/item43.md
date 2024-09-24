# 몽키 패치보다는 안전한 타입 사용

`몽키패치(Monkey Patching)`는 기존의 코드나 객체의 동작을 동적으로 수정하거나 덮어쓰는 것을 의미함. 주로 자바스크립트에서 이미 정의된 함수나 메서드의 기능을 변경하거나 확장할 때 사용됨.

```js
// 기존 Array.prototype.push 메서드를 변경
const originalPush = Array.prototype.push;

Array.prototype.push = function (...args) {
  console.log("push가 호출됨");
  return originalPush.apply(this, args);
};

const arr = [1, 2, 3];
arr.push(4); // "push가 호출됨" 이 출력되고 배열에 4가 추가됨
```

이런식으로 작업을 할 때는 `사이드 이펙트`가 발생하지 않게 고려해야한다.
또한, 타입스크립트에서는 `타입체커`에 의해 또다른 문제가 발생한다.

예를 들어 타입스크립트는 Document와 HTMLElement의 내장 속성을 알고 있지만, 우리가 추가한 속성에 대해서는 알지 못한다. 따라서 타입 오류가 발생한다.

```ts
document.monkey = "123"'
// 'Document' 유형에 monkey 속성이 없습니다.


//이렇게 사용하면 사용 가능
(document as any).monkey ="123";
```

위에 처럼 any로 단언하게 되면 타입 체커에 의한 요류는 피할 수 있지만, 타입 안전성을 상실하고, 언어서비스를 사용할 수 없게 된다.

가장 최선의 방법은 `document 또는 DOM으로부터 데이터를 분리`

1. interface의 보강 기능 사용

```ts
interface Document {
  monkey: string;
}
```

- 보강을 사용하면 타입이 안전하고 타입체커로 타입 체크도 가능하다.

모듈 관점(ts파일을 import, export하는 경우)에서 제대로 사용하려면 global선얼을 추가해야한다

```ts
export {};
declare global {
  interface Document {
    monkey: string;
  }
}
```

2. 더 구체적인 타입 사용

```ts
interface MonkeyDocument extends Document {
  monkey: string;
}
(document as MonkeyDocument).monkey = "132";
```

- Document를 확장해서 타입 단언을 하게되면 기존 Document는 유지되면서 새로운 타입을 만들었기에 모듈 역역 문제도 해결 할 수 있음

### 요약

- 전역변수나 DOM에 데이터를 저장하지 말고, 데이터를 분리해서 사용해야한다.
- 내장타입에 데이터를 저장해야하는 경우, 보강이나 확장을 통해 안전한 타입 접근을 해야한다.
