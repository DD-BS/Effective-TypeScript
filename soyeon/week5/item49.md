### Item49 - 콜백에서 this에 대한 타입 제공하기

- `let`이나 `const`로 선언된 변수는 렉시컬 스코프인 반면, `this`는 다이나믹 스코프이다.
- 다이나믹 스코프의 값은 ‘정의된’ 방식이 아니라 ‘호출된’ 방식에 따라 달라진다.
- `this`는 전형적으로 객체의 현재 인스턴스를 참조하는 클래스에서 가장 많이 쓰인다.
  ```tsx
  class C {
    vals = [1, 2, 3];
    logSquares() {
      for (const val of this.vals) {
        console.log(val * val);
      }
    }
  }

  const c = new C();
  c.logSquares(); // 149

  const method = c.logSquares();
  method(); // 오류. undefined의 'vals'속성을 읽을 수 없음
  ```
  - 위 코드에서 `logSquares`를 외부 변수에 넣으면 런타임에 오류가 발생한다.
  - `c.logSquares()`가 실제로는 두 가지 작업을 수행하기 때문이다.
    - `C.prototype.logSquares`를 호출
    - `this`의 값을 `c`로 바인딩
  - `logSquares`의 참조 변수를 사용함으로써 두 가지 작업을 분리했고, `this`의 값은 `undefined`로 설정된다.
  - 즉, `method`라는 변수에 `c.logSquares`를 할당했을 때, **메서드의 호출을 저장한 것이 아니라, 함수 그 자체의 참조를 저장한 것**이다.
  - 따라서 `method()`를 호출하면, 이 함수는 `c`와의 연결이 끊긴 채로 호출되므로 더 이상 `this`가 `c`를 가리키지 않게 된다.
  - 이 경우, 자바스크립트는 `this`의 값을 **전역 객체**(브라우저 환경에서는 `window`) 또는 `undefined`로 설정하게 되고, `undefined.vals`를 참조하려 해서 오류가 발생하는 것이다.
- 명시적으로 this를 바인딩하여 해결할 수 있다.
  - `call`사용
    ```tsx
    const method = c.logSquares();
    method.call(c); // 정상 동작
    ```
  - `bind`사용
    ```tsx
    const method = c.logSquares.bind(c);
    method(); // 정상 동작
    ```
- `this`는 어떤 것이든 바인딩할 수 있다.
- 심지어 DOM에서도 `this`를 바인딩할 수 있다.

  ```tsx
  document.querySelector("input")!.addEventListener("chage", function (e) {
    console.log(this); // input엘리먼트 출력
  });
  ```

- 종종 콜백 함수에서도 쓰인다.

  ```tsx
  class ResetButton {
    render() {
      return makeButton({ text: "Reset", onClick: this.onClick });
    }
    onClick() {
      alert(`Reset ${this}`);
    }
  }
  ```

  - `ResetButton`에서 `onClick`을 호출하면, `this`바인딩 문제로 인해 경고가 발생한다.
  - 생성자에서 메서드에 `this`를 바인딩시켜 해결할 수 있다.

  ```tsx
  class ResetButton {
    constructor() {
      this.onClick = this.onClick.bind(this);
    }
    render() {
      return makeButton({ text: "Reset", onClick: this.onClick });
    }
    onClick() {
      alert(`Reset ${this}`);
    }
  }
  ```

  - `onClick(){..}` 은 `ResetButton.prototype`의 속성을 정의한다.
  - 그러므로 `ResetButton`의 모든 인스턴스에서 공유된다.
  - 그러나 생성자에서 `this.onClick = …` 으로 바인딩하면, `onClick`속성에 `this`가 바인딩되어 해당 인스턴스에 생성된다.
  - 속성 탐색 순서에서 `onClick`인스턴스 속성은 `onClick`프로토타입 속성보다 앞에 놓이므로, `render()`메서드의 `this.onClick`은 바인딩된 함수를 참조하게 된다.
  - 이보다 더 간단한 방식으로 바인딩을 해결할 수 있다.

  ```tsx
  class ResetButton {
    render() {
      return makeButton({ text: "Reset", onClick: this.onClick });
    }
    onClick = () => {
      alert(`Reset ${this}`);
    };
  }
  ```

  - `onClick`함수를 화살표 함수로 바꿨다.
  - `ResetButton`이 생성될 때마다 제대로 바인딩된 `this`를 가지는 새 함수를 생성하게 된다.

- `this`를 사용하는 콜백 함수가 있다면, this바인딩 문제를 고려해야 한다.
- 이 문제는 콜백 함수의 매개변수에 `this`를 추가하고, 콜백 함수를 `call`로 호출해서 해결할 수 있다.
  ```tsx
  function addKeyListener(
    el: HTMLElement,
    fn: (this: HTMLElement, e: KeyboardEvent) => void
  ) {
    el.addEventListener("keydown", (e) => {
      fn.call(el, e);
    });
  }
  ```
  - 콜백 함수의 첫 번째 매개변수에 있는 `this`는 특별하게 처리된다.
  - 콜백 함수의 매개변수에 `this`를 추가하면 `this`바인딩이 체크되기 때문에 실수를 방지할 수 있다.
  - 또한, 라이브러리 사용자의 콜백 함수에서 `this`를 참조할 수 있고 완전한 타입 안전성도 얻을 수 있다.
  - 만약 라이브러리 사용자가 콜백을 화살표 함수로 작성하고 `this`를 참조하려고 하면 타입스크립트가 문제를 잡아낸다.

### 결론

- `this`는 API의 일부가 되는 것이기 때문에 반드시 타입 선언에 포함해야 한다.
