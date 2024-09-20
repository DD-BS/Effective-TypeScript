## Item42 - 모르는 타입의 값에는 any 대신 unknown을 사용하기

- `unknown`에는 함수의 반환값과 관련된 형태, 변수 선언과 관련된 형태, 단언문과 관련된 형태가 있다.

### 함수의 반환값과 관련된 형태

```tsx
function parseYAML(yaml: string): any {
  return yaml;
}

interface Book {
  name: string;
  author: string;
}
const book: Book = parseYAML(`
	name: Jane Eyre
	author: Charlotte
`);
alert(book.title); // 오류 없음. 런타임에 undefined 경고
book("read"); // 오류 없음. 런타임에 'TypeError'발생
```

- 위와 같이 any타입으로 반환하게 된다면 오류를 미리 알려주는 것이 아닌 런타임에 오류가 발생하게 된다.
- 따라서 `any`가 아닌 `unknown`으로 반환하게 만드는 것이 더 안전하다.

<br/>

```tsx
function safeParseYAML(yaml: string):unknown {
	return yaml;
}
const book = safeParseYAML(...)
alert(book.title) // 오류 발생. 개체가 unknown형식
book('read') // 오류 발생. 개체가 unknown형식
```

- `unknown`타입을 반환하게 되면 개체가 없는 경우에는 오류를 발생시킨다.
- 앞선 내용들을 살펴보면 `any`타입은 위험한 두 가지 특징이 존재한다.
  - 어떠한 타입이든 `any`타입에 할당 가능
  - `any`타입은 어떠한 타입으로도 할당 가능
- 반면에 `unknown`타입은 어떠한 타입이든 `unknown`에 할당 가능하지만 `unknown`타입은 오직 `unknown`과 `any`에만 할당할 수 있다.
- `never`타입은 `unknown`과 정반대이다.
  - 어떤 타입도 `never`에 할당할 수 없음
  - `never`타입은 어떠한 타입으로도 할당 가능

<br/>

```tsx
const book = safeParseYAML(...) as Book;
alert(book.title) // 오류 발생. 'Book'형식에 'title'속성이 없음
book('read') // 오류 발생. 이 식은 호출할 수 없음
```

- `unknown`타입인 채로 값을 사용하면 오류가 발생한다
- `unknown`인 값에 함수 호출을 하거나 연산을 하는 것도 마찬가지로 오류가 발생한다.
- 따라서 `타입 단언`을 사용해 적절한 타입으로 변환하도록 강제한다.
- 타입 단언문을 사용해 `Book`타입을 기준으로 타입이 체크되기 때문에 `unknown`타입 기준의 오류보다 더 정확한 오류를 나타낸다.

### 변수 선언과 관련된 형태

- 어떠한 값이 있지만 그 타입을 모르는 경우에 `unknown`을 사용한다

  ```tsx
  function processValue(val: unknown) {
    if (val instanceof Date) {
      val; // 타입 Date
    }
  }
  ```

  - 타입 단언문 외에도 `instanceof`를 체크해 `unknown`에서 원하는 타입으로 변환할 수 있다.

  <br/>

  ```tsx
  function isBook(val: unknown): val is Book {
    return (
      typeof val === "object" &&
      val !== null &&
      "name" in val &&
      "author" in val
    );
  }

  function processValue(val: unknown) {
    if (isBook(val)) {
      val; // 타입 Book
    }
  }
  ```

  - 사용자 정의 타입 가드도 `unknown`에서 원하는 타입으로 변환할 수 있다.
  - `unknown`타입의 범위를 좁히기 위해서는 상당히 많은 노력이 필요하다.
  - in 연산자에서 오류를 피하기 위해 `val`이 객체임을 확인하고, `null`이 아닌 것도 확인해야 한다.
  - 제너릭을 사용할 수도 있으나 좋지 않다.
  - 따라서 제너릭보다는 `unknown`을 반환하고 사용자가 직접 단언문을 사용하거나 원하는 대로 타입을 좁히도록 강제하는 것이 좋다.

<br/>

### 단언문과 관련된 형태

- 이중 단언문에서 `any`대신 `unknown`사용 가능
  ```tsx
  declare const foo: Foo;
  let barAny = foo as any as Bar;
  let barUnk = foo as unknown as Bar;
  ```
  - `barAny`와 `barUnk`는 기능적으로 동일하지만, 추후에 두 개의 단언문을 분리하는 리팩토링 시에 `unknown`형태가 더 안전하다.
  - `any`의 경우 분리되는 순간 영향력이 전염병처럼 퍼진다.
  - `unknown`의 경우 분리되는 즉시 오류를 발생하므로 안전하다.

<br/>

### unknown과 유사하지만 다른 타입

- `object` - 모든 비기본형 타입으로 이루어진다. 여기에 `true`, `12`, `‘foo’`가 포함되지 않지만 객체와 배열은 포함된다.
- `{}` - `null`과 `undefined`를 제외한 모든 값을 포함
