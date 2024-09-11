### Item37 - 공식 명칭에는 상표를 붙이기

- 타입스크립트는 구조적 타이핑의 특성 때문에 가끔 코드가 이상한 결과를 낼 수 있다.

  ```tsx
  interface Vector2D {
    x: number;
    y: number;
  }

  function calcNorm(p: Vector2D) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
  }
  const vec3d = { x: 3, y: 4, z: 1 };
  calcNorm(vec3d); // 정상
  ```

  `calcNorm`함수는 `Vector2D`타입만 허용했지만 구조적 타이핑으로 인해 `vec3d`변수가 들어와도 정상적으로 작동한다. 이를 해결하기 위해서는 공식 명칭을 사용한다. 즉, 타입이 아니라 값의 관점에서 `Vector2D`라고 말하는 것이다.

  ```tsx
  interface Vector2D {
    _brand: "2d";
    x: number;
    y: number;
  }

  function vec2d(x: number, y: number): Vector2D {
    return { x, y, _brand: "2d" };
  }

  function calcNorm(p: Vector2D) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
  }

  const vec3d = { x: 3, y: 4, z: 1 };
  calcNorm(vec3d); // 오류 '_brand'속성이 ...형식에 없습니다.
  console.log(calcNorm(vec2d(3, 4))); // 정상
  ```

  위 코드와 같이 `상표(_brand)`를 사용해서 `calcNorm`함수가 `Vector2D`타입만 받는 것을 보장한다. 다만 `vec3d`값에 `_brand:’2d’`를 추가하는 것은 막을 수는 없으나 단순한 실수를 방지하기엔 충분하다. 연산 이후에는 상표가 사라진다.

- 상표 기법은 타입 시스템에서 동작하지만 런타임에 상표를 검사하는 것과 동일한 효과를 얻는다.
- 타입 시스템이기 때문에 런타임 오버헤드를 없앨 수 있고, 추가 속성을 붙일 수 없는 `string`이나 `number`같은 내장 타입도 상표화가 가능하다.
  ```tsx
  type AbsolutePath = string & { _brand: "abs" };

  function listAbsolutePath(path: AbsolutePath) {
    // path는 반드시 절대 경로이고, 이를 처리할 로직을 작성한다.
  }
  function isAbsolutePath(path: string): path is AbsolutePath {
    // path가 절대 경로임을 확인한다.
    return path.startsWith("/");
  }
  ```
  런타임에서는 절대 경로`(’/’)`로 시작하는지 체크하기 쉽지만, 타입 시스템에서는 절대 경로를 판단하기 어렵기 때문에 상표 기법을 사용한다. `string`타입이면서 `_brand`속성을 가지는 객체를 만들 수는 없으나 `AbsolutePath`타입에 상표 기법을 사용해 타입시스템의 영역에서만 생성할 수 있다.
  예를 들어, `string` 타입에는 `절대 경로`와 `상대 경로`가 모두 포함된다. 단순히 `string`만으로는 이것을 구별할 수 없지만, 상표 기법을 통해 `AbsolutePath`타입을 정의하면 **타입 시스템 상에서만** 절대 경로를 구분할 수 있다.
  따라서 아래와 같이 두 함수를 보완하여 사용할 수 있다.
  ```tsx
  function f(path: string) {
    if (isAbsolutePath(path)) {
      listAbsolutePath(path);
    }
    listAbsolutePath(path); // 오류. string형식의 인수는 'AbsolutePath'형식의 매개변수에 할당할 수 없습니다.
  }
  ```
