## 타입스크립트 컴파일러의 역할
1. 브라우저에서 동작 할 수 있도록 자바스크립트로 트랜스파일 함
2. 코드의 타입 오류를 체크


### 각 역할은 서로 독립적이다
- 타입스크립트가 자바스크립트로 변환될 때 코드 내의 타입에는 영향을 주지않음
- 자바스크립트의 실행 시점에도 타입은 영향을 미치지 않음

쉽게 말해 컴파일과 타입 체크가 독립적으로 동작한다.
그렇기에 아래와 같은 일이 발생한다.
- 타입오류가 있어도 컴파일이 가능하다
- 런타임에는 타입 체크가 불가능하다

오류가 있을 때 컴파일을 하지 않으려고 하면은 `tsconf.json에 noEmitOnError를 설정하거나 빌드 도구를 설정하면 된다.

```ts
interface Square {
  width: number
}
interface Rectangle extends Square {
  height: number
}
type Shape = Square | Rectangle

//instanceof는 클래스를 지칭해야한다. 인터페이스를 지칭하면 당연히 오류가 발생
function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // ~~~~~~~~~ 'Rectangle' only refers to a type,
    //           but is being used as a value here
    return shape.width * shape.height
    //         ~~~~~~ Property 'height' does not exist
    //                on type 'Shape'
  } else {
    return shape.width * shape.width
  }
}

export default {}
```
instanceof체크는 런타임에 일어나지만 Rectangle은 타입이기 때문에 런타임 시점에는 아무런 역할을 할 수 없음.<br/>
`타입스크립트 타입은 제거 가능`으로 실제로 컴파일 되는 과정에서 모든 인터페이스, 타입, 타입 구문은 제거됨
위의 코드는 컴파일을 하게 되면 아래와 같은 코드가 된다<br/>
`인터페이스는 다 사라지고 안에 코드만 남는다. 레퍼런스 오류가 발생한다`
```js
function calculateArea(shape) {
  if (shape instanceof Rectangle) {
    // ~~~~~~~~~ 'Rectangle' only refers to a type,
    //           but is being used as a value here
    return shape.width * shape.height
    //         ~~~~~~ Property 'height' does not exist
    //                on type 'Shape'
  } else {
    return shape.width * shape.width
  }
}

exports ["default"]= {};
```

### 타입 정보를 유지하는 방법

#### 1. 태그 기법
- 런타임에 타입 정보를 쉽게 유지 할 수 있다.
```ts
interface Square {
  kind: 'square'
  width: number
}
interface Rectangle {
  kind: 'rectangle'
  height: number
  width: number
}
type Shape = Square | Rectangle

function calculateArea(shape: Shape) {
  if (shape.kind === 'rectangle') {
    shape // Type is Rectangle
    return shape.width * shape.height
  } else {
    shape // Type is Square
    return shape.width * shape.width
  }
}

export default {}
```

#### 2. 클래스화
- 인터페이스는 타입으로만 사용 가능
- 클래스로 선언하면 타입과 값 모두 사용 가능
```ts
class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width)
  }
}
type Shape = Square | Rectangle

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    shape // Type is Rectangle
    return shape.width * shape.height
  } else {
    shape // Type is Square
    return shape.width * shape.width // OK
  }
}

export default {}
```



### 타입스크립트 타입으로는 함수 오버로드가 불가능한다
- 함수 오버로딩은 가능하지만 ,`타입 수준`에서만 동작
- 하나의 함수에 대해 여러 개의 선언문은 작성 할 수 있지만 `구현체는 하나`

```ts
  
function add(a: number, b: number): number
function add(a: string, b: string): string

//이렇게 하려면 any나 제네릭 타입을 사용 해야 해야한다
function add(a, b) {
  return a + b
}

const three = add(1, 2) // Type is number
const twelve = add('1', '2') // Type is string

export default {}
```


### 요약
- 컴파일과 타입 시스템은 무관하다
- 타입스크립트 타입은 런타임 동작이나 성능에 영향을 주지 않는다
- 타입 오류가 존재해도 컴파일은 가능하다
- 타입 체크는 런타입에 사용 할 수 없다

### 궁금해서 찾아본 추가본
타입스크립트 컴파일러는 컴파일과 타입 체크를 독립적으로 처리하지만, 두 과정은 밀접하게 연관이 되어있음
- 컴파일 과정
1. 파싱 (Parsing): TypeScript 소스 코드를 구문 트리(AST, Abstract Syntax Tree)로 변환
2. 타입 체크 (Type Checking): AST를 기반으로 타입 정보를 분석하고, 타입 오류를 검사
3. 트랜스파일 (Transpile): 타입 체크가 완료된 후, TypeScript 코드를 JavaScript 코드로 변환

이 과정을 통해 컴파파일러는 타입 체크와 컴파일을 동시에 수행함.<br/>
타입 체크는 컴파일 과정의 일부로 포함됨

tsconf에 아래 옵션을 사용하게되면 타입 체크와 컴파일의 독립성을 유지 할 수 있음<br/>
 - 이를 설정 할 경우 타입 오류가 발생 시 javaScript 파일을 생성하지 않음
 - 타입 체크와 컴파일을 독립적으로 관리 할 수 있음
```json
{
  "compilerOptions": {
    "noEmitOnError": true,
  }
}
```
