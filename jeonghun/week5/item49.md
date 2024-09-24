### 콜백에서 this에 대한 타입 제공하기

- 자바스크립트에서 this는 매우 혼란스러운 기능임

let이나 const 변수가 *`렉시컬 스코프`인 반면, this는 `*다이나믹 스코프임`

\*렉시컬 스코프 : 자바스크립트에서 변수가 정의된 물리적 위치에 따라 그 변수가 어떤 범위(scope)에서 접근 가능한지가 결정되는 스코핑 방식

\*다이나믹 스코프 : 변수가 어디에서 호출되었는지에 따라 해당 변수가 어떤 범위에서 접근 가능한지가 결정되는 스코핑 방식

this가 사용되는 예시

```ts
class C {
  vals = [1, 2, 3];
  logSquares() {
    for (const val of this.vals) {
      console.log(val * val);
    }
  }
}

const c = new C();
c.logSquares();
```

코드를 실행하면 다음과 같은 값이 출력됨

```ts
1;
4;
9;
```

이제 앞선 예제를 살짝 변경하여 logSquare를 외부에 넣고 호출하면 발생하는 결과

```ts
class C {
  vals = [1, 2, 3];
  logSquares() {
    for (const val of this.vals) {
      console.log(val * val);
    }
  }
}

const c = new C();
const method = c.logSquares;
method(); // ~~ TypeError: Cannot read property 'vals' of undefined
```

`c.logSqaures()`가 실제로는 두 가지 작업을 수행

1. C.prototype.logSquares를 호출
2. this의 값을 c로 바인딩

앞의 코드에서는 logSquares의 참조 변수를 사용함으로써 두 가지 작업을 분리했고, 2번 작업이 없어졌기 때문에 this의 값이 undefined가 됨.

`this 바인딩을 어떻게 제어 하는 방법 :  call (apply, bind)을 사용`

```ts
const c = new C();
const method = c.logSquares;
method.call(c); // 1, 4, 9 정상 출력
```

(call은 method 함수를 호출하면서 첫 번째 인수로 전달한 c를 호출함 함수의 this에 바인딩됨.)

this가 반드시 C의 인스턴스에 바인딩 되어야 하는 것은 아니며, 어느 것이든 심지어 DOM에서도 this를 바인딩 가능.

\*Javascript에서 모든 객체는 프로토타입을 공유한다.
객체 자체가 스스로 메소드와 속성을 모두 가지는 대신 여러 객체가 동일한 프로토타입을 공유하도록하고 이를 사용하면 메모리를 효율적으로 사용할 수 있다.

### 콜백 함수의 this

this 바인딩은 종종 콜백 함수에서 쓰임. 예를 들어, 클래스 내에 onClick 핸들러를 정의한다면

```ts
class ResetButton {
  render() {
    return makeButton({ text: "Reset", onClick: this.onClick });
  }
  onClick() {
    alert(`Reset ${this}`);
  }
}
```

그러나 ResetButton에서 onClick을 호출하면, this 바인딩 문제로 인해 "Reset이 정의되지 않았습니다."라는 경고가 뜹니다.

일반적으로 생성자에서 메서드에 this를 바인딩시켜 해결합니다.

```ts
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

onclick(){}은 ResetButton.prototype의 속성을 정의. 그러므로 ResetButton의 모든 인스턴스에서 공유함.

그러나 생성자에서 위와 같이 바인딩하면 onClick 속성에 this가 바인딩되어 해당 인스턴스에 생성됨.

`속성 탐색 순서`에서 onClick 인스턴스 속성은 onClick 프로토타입 앞에 놓이므로, render() 메서드의 this.onClick은 바인딩된 함수를 참조하게 됨.

> 속성은 먼저 객체 인스턴스에서 찾고, 없다면 프로토타입 체인을 따라 올라가며 부모 클래스의 프로토타입에서 찾음

더 간단한 방법

```ts
class ResetButton {
  render() {
    return makeButton({ text: "Reset", onClick: this.onClick });
  }
  onClick = () => {
    alert(`Reset ${this}`);
  };
}
```

화살표 함수를 사용하게 되면 ResetButton이 생성될 때마다 제대로 바인딩 된 this를 가지는 새 함수를 생성하게 됨.

> 화살표 함수 내부의 this는 상위 스코프의 this를 가리키기 때문
> (화살표 함수는 함수 자체의 this 바인딩을 갖지 않아서 스코프 체인 상에서 가장 가까운 상위 스코프의 this를 참조)
