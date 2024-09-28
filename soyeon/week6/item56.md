### Item56 - 정보를 감추는 목적으로 private 사용하지 않기

- 자바스크립트는 클래스에 비공개 속성을 만들 수 없다.
- 많은 이가 비공개 속성임을 나타내기 위해 `_`를 접두사로 붙이던 것이 관례로 인정되었을 뿐이다.
- 그러나 단순히 비공개라고 표시한 것 뿐, 일반적인 속성들과 동일하게 외부에 공개되어 있다.
- 타입스크립트는 `public`, `protected`, `private` 접근 제어자를 사용해서 공개 규칙을 강제할 수 있는 것으로 오해할 수 있다.

```tsx
class Diary {
  private secret = "test";
}
const diary = new Diary();
diary.secret; // 오류. secret속성은 private이며, 'Diary'클래스 내에서만 접근 가능
```

- 그러나 접근 제어자는 타입스크립트 키워드이므로 컴파일 후에는 제거된다.
- 즉, 타입스크립트의 접근 제어자들은 단지 컴파일 시점에만 오류를 표시한다.
- `_`관례와 마찬가지로 런타임에는 아무런 효력이 없다.
- 심지어 단언문을 사용하면 타입스크립트 상태에서도 `private`속성에 접근할 수 있다.

```tsx
const diary = new Diary();
(diary as any).secret; // 정상
```

- 따라서 정보를 감추기 위해서 `private`을 사용하면 안된다.

- 자바스크립트에서 정보를 숨기기 위해 가장 효과적인 방법은 클로저를 사용하는 것이다.

```tsx
declare function hash(text: string): number;

class PasswordChecker {
  checkPassword: (password: string) => boolean;
  constructor(passwordHash: number) {
    this.checkPassword = (password: string) => {
      return hash(password) === passwordHash;
    };
  }
}

const checker = new PasswordChecker(hash("s3cret"));
checker.checkPassword("s3cret"); // true
```

- `PasswordChecker`의 생성자 외부에서 `passwordHash`변수에 접근할 수 없기 때문에 정보를 숨기는 목적을 달성했다.
- 문제점

  - `passwordHash`를 생성자 외부에서 접근할 수 없기 때문에, `passwordHash`에 접근해야 하는 메서드 역시 생성자 내부에 정의되어야 한다.
  - 메서드 정의가 생성자 내부에 존재하게 되면, 인스턴스를 생성할 때마다 각 메서드의 복사본이 생성되기 때문에 메모리를 낭비할 수 있다.
  - 동일한 클래스로부터 생성된 인스턴스라고 하더라도 서로의 비공개 데이터에 접근하는 것이 불가능하므로 철저하게 비공개이다.

- 접두사 `#`을 붙여서 비공개 필드 기능을 사용한다.

```tsx
class PasswordChecker {
  #passwordHash: number;

  constructor(passwordHash: number) {
    this.#passwordHash = passwordHash;
  }

  checkPassword(password: string) {
    return hash(password) === this.#passwordHash;
  }
}

const checker = new PasswordChecker(hash("s3cret"));
checker.checkPassword("secret"); // false
checker.checkPassword("s3cret"); // true
```

- `#passwordHash`속성은 클래스 외부에서 접근할 수 없다.
- 클로저와는 다르게 클래스 메서드나 동일한 클래스의 개별 인스턴스끼리 접근이 가능하다.
- 비공개 필드를 지원하지 않는 자바스크립트 버전으로 컴파일하게 되면, `WeakMap`을 사용한 구현으로 대체된다.
- 구현 방식과 무관하게 데이터는 동일하게 비공개이다.
