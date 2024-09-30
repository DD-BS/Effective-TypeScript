# 정보를 감추는 목적으로 private 사용하지 않기

> 자바스크립트에서는 클래스에 비공개 속성을 만들 수 없다.

- `private`, `public`, `protected` 같은 접근 제어자는 타입스크립트 키워드이기에 `컴파일 후에는 제거`된다.

```ts
class Diary {
  private secret = "password";
}
const d = new Diary();
d.secret; // 'private'이라서 접근이 안된다는 오류

//단언문을 사용하면 접근이 가능하다!!
const d = new Diary();
(d as any).secret; // 접근 가능
```

위에 처럼 접근 제어자는 컴파일 후에 제거되므로 `정보를 감추는 목적`으로 사용하면 안된다.

<br/>

정보를 감추려면 `클로저`를 사용해야 한다.

```ts
declare function hash(text: string): number;

class PasswordChecker {
  checkPassword: (password: string) => boolean;
  constructor(passwordHash: number) {
    this.checkPassword = (password: string) => {
      return hash(password) === passwordHash;
    };
  }
}

const checker = new PasswordChecker(hash("13123123"));
checker.checkPassword("12312312");
```

- PasswordChecker의 생성자 외부에서 passwordHash변수에 접근이 불가능해서 정보를 숨길 수 있다
- 단점 : 사용할 때마다 인스턴스를 만들어야해서 메모리 낭비가 된다
  <br/>

[링크](https://typescript-kr.github.io/pages/release-notes/typescript-3.8.html#ecmascript-private-fields)

현재 표준화가 진행중이지만 접두사 #을 붙여서 타입체크와 런타임 모두에서 비공개로 만들 수 있다.<br/>

### 요약

- 확실히 정보를 감추고 싶으면 클로저를 사용해라
- private은 우회가 가능하다
