# 모던 자바스크립트로 작성하기

> 타입스크립트는 자바스크립트의 상위집합이기에 코드를 최신 버전으로 바꾸다 보면 타입스크립트의 일부도 저절로 익히게 된다

### ECMAScript 모듈 사용하기

- ES2015부터 import, export를 사용하는 모듈이 표준이 되었음
- 마이그레이션 대상인 자바스크립트가 `단일 파일`이거나 `비표준 모듈 시스템`이라면 ES모듈로 전환하는게 좋다

### 프로토타입 대신 클래스 사용하기

- 프로토 타입 기반의 객체 모델은 과거의 잔재이다
- 마이그레이션하려는 코드에서 단순한 객체를 다룰 때 프로토타입을 사용하고 있다면 클래스로 바꿔라

### var 대신 let/const 사용하기

- var는 호이스팅 등으로 문제가 있다
- let이나 const는 블록 스코프를 가지므로 해당 문제를 피할 수 있다

### for 대신 for-of나 배열 메서드 사용하기

- for도 좋지만 상황에 따라 for-of나 forEach를 사용하자
- for-in은 몇가지 문제가 있으니 사용하지 말자

👀 for-in의 문제점

- for-in은 객체의 모든 열거 가능한 속성들을 순회한다
- 여기서 순회 가능한 속성은 객체의 key 값을 말한다.
- value값은 직접 접근이 불가능하다
- 순서가 없는 객체에 `임의의 순서`를 가지고 접근한다
- 따라서 정렬된 값을 출력하는 경우나 순서를 가지는 배열은 for-of이나 forEach를 사용

### 함수 표현식보다 화살표 함수 사용

- this는 다이나믹 스코프 규칙을 따르기 때문에 어려운 개념이다.
- 화살표 함수를 사용 할 경우에는 this 참조가 편하기 때문에 상황에 따라 사용하면 좋다

### 단축 객체 표현과 구조 분해 할당 사용

```ts
const x = 1, y = 2, z = 3;
const pt = {
  x: x,
  y: y,
  z: z,
};
/*
만약 객체 속성과 변수의 이름이 같다면 단축 객체 표현을 사용하여
아래와 같이 단축 할 수 있다
*/
const { props } = obj;
const {a, b} = props;

//극단적으로 단축할 경우
cosnt {props: {a, b}} = obj;


//배열에도 사용 가능하다.
const point = [1, 2, 3];
const [x, y, z] = point;
const [, a, b] = point; //첫번재 요소 무시
```

### 함수 매개변수 기본값 사용하기

- 자바스크립트에서 함수의 모든 매개변수는 기본값을 직접 지정할 수 있다. undefined가 발생할 수 있는 경우라면 기본값을 지정해주는 것도 좋은 설계라 할 수 있다

### 저수준 프로미스나 콜백 대신 async/await 사용하기

- async/await를 사용하면 코드가 더 간결해지고 버그나 실수를 방지 할 수 있다.
- 비동기 코드에 타입 정보가 전달되어 타입추론이 가능하다

### 연관 배열에 객체 대신 Map과 Set 사용하기

```ts
function countWords(text:string){
  const counts = {[word :string] : number} = {};
  for(const word of text.split(/[\s,.]+/)){
    counts[word] = 1+ (counts[word] || 0)
  }
  return counts;
  /*
  {
  Objects:1,
  have:1,
  a:1,
  constructor: "1function Object()...
  }
  */
}
```

위의 코드는 문제가는 것처럼 보이지만, constructor라는 특정 문자를 만나면 문제가 발생한다.

- constructor는 Object.prototype에 있는 생성자 함수이기 때문이다
  이러한 문제를 방지하기 위해 Map을 사용하면 좋다.

```ts
function countWords(text<:string){
  const counts = new Map<string,number>()
  for(const word of text.split(/[\s,.]+/)){
    counts.set(word, 1+ (counts.get(word) || 0));
  }
  return counts;
```

### 타입스크립트에 use strict 넣지 않기

- 타입스크립트에서 수행하는 안정성 검사가 더 엄격한 검사를 진행한다.
- 타입크립트 컴파일러가 생성하는 자바스크립트 코드에는 `use strict`가 추가되어 있다.
