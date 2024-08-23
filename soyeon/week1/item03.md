### 아이템3 - 코드 생성과 타입이 관계없음을 이해하기

- 타입스크립트 컴파일러가 수행하는 두 가지 역할
  - 최신 타입스크립트/자바스크립트를 브라우저에서 동작할 수 있도록 자바스크립트로 트랜스파일
  - 코드의 타입 오류 체크
- 위 두 역할은 각각 독립적으로 이루어지기 때문에 타입 오류가 있어도 컴파일 가능
- 타입 체크와 컴파일이 동시에 이루어지는 C나 자바와는 다르다
- 만약 오류가 있을 때 컴파일하지 않으려면, `noEmitOnError`옵션을 설정한다

<br/>

**✅ 런타임에는 타입 체크가 불가능하다**

```tsx
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calcArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // Error
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

- 위와 같은 코드가 있을 때 런타임 환경에서 `instanceof`체크가 일어나지만, `Rectangle`은 타입이기 때문에 **컴파일 과정에서 제거(erasable)**된다.
- 즉, `instanceof`는 값을 평가해야 하지만 위 코드에서는 런타임에 사리진 `Rectangle`타입을 값으로 썼기 때문에 오류가 발생

> `instanceof`연산자는 생성자의 프로토타입이 특정 객체의 프로토타입을 갖는지 확인하여 boolean값을 반환한다.

**해결법1**

- height 속성이 존재하는지 체크한다
  ```tsx
  ...
  function calcArea(shape: Shape) {
  	if('height' in shape){
  		shape; // 타입 Rectangle
  		return shape.width * shape.height;
  	} else {
  		shape; // 타입 Square
  		return shape.width * shape.width;
  	}
  }
  ```
- 속성 체크는 런타임에 접근 가능한 값에만 관련되지만, 타입 체커 역시 shape의 타입을 Rectangle로 보정해주기 때문에 오류가 사라진다

**해결법2**

- ‘태그’기법 사용

  ```tsx
  interface Square {
    kind: "square";
    width: number;
  }
  interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
  }
  type Shape = Square | Rectangle; // tagged union이라 한다

  function calcArea(shape: Shape) {
    if (shape.kind === "rectangle") {
      shape; // 타입 Rectangle
      return shape.width * shape.height;
    } else {
      shape; // 타입 Square
      return shape.width * shape.width;
    }
  }
  ```

**해결법3**

- 타입을 클래스로 만든다
- 타입(런타임 접근 불가)과 값(런타임 접근 가능)을 둘 다 사용하는 기법

  ```tsx
  class Square {
  	constructor(public width: number) {}
  }
  class Rectangle extends Square {
  	constructor(public width: number, public height: number) {
  		super(width);
  	}
  }
  type Shape = Square | Rectangle; // 타입으로 참조

  function calcArea(shape: Shape) {
  	if(shape instanceof Rectangle) {...} // 값으로 참조
  	else {...}
  }
  ```

- `instanceof`연산자를 사용했을 때 오류가 났던 코드에서 타입을 모두 클래스로 선언해 값으로 만들어 오류를 없앨 수 있다

<br/>

**✅ 타입 연산은 런타임에 영향을 주지 않는다**

- `string` 또는 `number`타입인 값을 항상 `number`로 정제하는 코드
  ```tsx
  function asNumber(val: number | string): number {
    return val as number;
  }
  ```
- 그러나 아래 자바스크립트로 변환된 코드에는 타입 단언문인 `as number`가 전혀 영향을 미치지 않았음을 알 수 있다
  ```tsx
  function asNumber(val) {
    return val;
  }
  ```
- 따라서 값을 정제하기 위해서는 런타임의 타입 체크가 필요하고 자바스크립트 연산을 통해 변환을 수행해야 한다
  ```tsx
  function asNumber(val: number | string): number {
    return typeof val === "string" ? Number(val) : val;
  }
  ```

<br/>

**✅ 런타임 타입은 선언된 타입과 다를 수 있다**

```tsx
function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log("실행되니?");
  }
}

setLightSwitch("ON");
```

- 위 코드는 `: boolean`으로 타입을 선언했음에도 불구하고 컴파일되어 런타임에 실행된다
- 따라서 선언된 타입이라도, 실제로 그렇게 된다는 보장은 없으며 타입이 언제든 달라질 수 있다

<br/>

**✅ 타입스크립트 타입으로는 함수를 오버로드할 수 없다**

- 동일한 이름에 매개변수만 다른 여러 버전의 함수를 허용하는 다른 언어와는 다르게 타입스크립트에서 ‘함수 오버로딩’은 불가능하다
- 타입 수준에서만 ‘함수 오버로딩’은 가능하지만, 컴파일 후 결국 구현체만 남게 된다

  ```tsx
  function add(a: number, b: number): number;
  function add(a: string, b: string): string;

  function add(a, b) {
    return a + b;
  }

  const three = add(1, 2); // 타입 number
  const twelve = add("1", "2"); // 타입 string
  ```

<br/>

**✅ 타입스크립트 타입은 런타임 성능에 영향을 주지 않는다**

- 타입과 타입 연산자는 자바스크립트 변환 시점에 제거되기 때문에 런타임의 성능에 영향을 주지 않는다
- ‘런타임’ 오버헤드가 없는 대신 컴파일러의 ‘빌드타임’ 오버헤드가 있다
- ‘빌드타임’ 오버헤드가 커진다면, 빌드 도구에서 `transpile only`를 설정하여 타입 체크를 건너뛸 수 있다
