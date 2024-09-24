# 타입스크립트 기능보다는 ECMAScript 기능을 사용하기

### 열거형(enum)

```ts
enum Flavor {
  VANILLA = 0,
  CHOCOLATE = 1,
  STRAWBERRY = 2,
}

let flavor = Flavor.CHOCOLATE;

Flavor; // 자동 완성 추천: VANILLA, CHOCOLATE, STRAWBERRY
Flavor[0]; // 값이 "VANILLA"
```

타입스크립트 열거형은 아래 상황에 따라 다르게 동작한다.

- 숫자 열거형에 0, 1, 2 외의 다른 숫자가 할당되면 매우 위험하다.
- 상수 열거형은 보통의 열거형과 달리 런타임에서 제거된다. const enum Flavor와 같이 const를 붙이면 Flavor.CHOCOLATE 가 0으로 바뀌어 버린다.
- 문자형 열거형은 구조적 타이핑이 아닌 명목적 타이핑을 사용한다. (명목적 타이핑은 타입의 이름이 같이야 할당이 허용된다.)
- 숫자 열거형에 0, 1, 2 외의 다른 숫자가 할당되면 매우 위험하다.

```ts
enum Alphabet {
  A = -2,
  B,
  C = 10,
  D,
  E = 0,
  F,
}
/*
[LOG]: {
  "0": "E",
  "1": "F",
  "10": "C",
  "11": "D",
  "A": -2,
  "-2": "A",
  "B": -1,
  "-1": "B",
  "C": 10,
  "D": 11,
  "E": 0,
  "F": 1
} 
*/
```

### 매개변수 속성

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

타입스크립트는 더 간결하 문법을 제공한다.

```ts
class Person {
  constructor(public name: string) {}
}
```

public name은 매개변수 속성이라고 부른다. 매개변수 속성은 아래와 같은 몇가지 문제점이 존재한다.

일반적으로 타입스크립트 컴파일은 타입 제거가 이루어지므로 코드가 줄어들지만, 매개변수 속성은 코드가 늘어나는 문법이다.
매개변수 속성이 런타임에는 실제로 사용되지만, 타입스크립트 관점에서는 사용되지 않는 것처럼 보인다.
매개변수 속성과 일반 속성을 섞어서 사용하면 클래스의 설계가 혼란스러워 진다.

```ts
class Person {
  first: string;
  last: string;
  constructor(public name: string) {
    [this.first, this.last] = name.split(" ");
  }
}
```

Person 클래스에는 세가지 속성(first, last, name)이 있지만, name은 매개변수 속성에 있어서 일관성이 없다. 아래와 같은 상황도 일어날 수 있다.

```ts
class Person {
  constructor(public name: string) {}
}

const p: Person = { name: "Jed Bartlet" }; // 정상
```

초급자에게는 생소한 문법이다. 따라서 일반 속성과 매개변수 속성 중 한 가지만 사용하자.

### 데코레이터

데코레이터는 클래스, 메서드, 속성에 애너테이션을 붙이거나 기능을 추가하는데 사용할 수 있다.

class Greeter {
greeting: string;
constructor(message: string) {
this.greeting = message;
}

    @logged
    greet() {
        return "Hello, " + this.greeting;
    }

}

function logged(target: any, name: string, descriptor: PropertyDescriptor) {
const fn = target[name];
descriptor.value = function() {
console.log(`Calling ${name}`);
return fn.apply(this, arguments);
}
}

console.log(new Greeter('Dave').greet());
// 출력:
// Calling greet
// Hello, Dave
데코레이터는 처음에 앵귤러 프레임워크를 지원하기 위해 추가되었으며 tsconfig.json에 experimentalDecorators 속성을 설정하고 사용해야 한다. 현재까지도 표준화가 완료되지 않았기 때문에, `사용 중인 데코레이터가 비표준으로 바뀌거나 호환성이 깨질 수 있다. 따라서 사용하지 말자.`

### 요약

- 일반적으로 타입스크립트 코드에서 모든 타입 정보를 제거하면 자바스크립트가 되지만, 열거형, 매개변수 속성, 트리플 슬래시 임포트, 데코레이터는 타입 정보를 제거한다고 자바스크립트가 되지 않는다.
- 타입스크립트의 역확을 명확하게 하려면 열거형, 매개변수 속성, 트리플 슬래시 임포트, 데코레이터는 사용하지 말자.
