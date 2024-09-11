# 공식 명칭에는 상표 붙이기

구조적 타이핑(Item4)의 특성 때문에 가끔 코드가 이상한 결과를 낼 수 있다.

** 공식명칭 (nominal typing) **을 사용

```ts
interface Vector2D {
  _brand: "2d";
  x: number;
  y: number;
}
function vec2D(x: number, y: number): Vector2D {
  return { x, y, _brand: "2d" };
}
function calculateNorm(p: Vector2D) {
  return Math.sqrt(p.x * p.x + p.y * p.y); // Same as before
}

calculateNorm(vec2D(3, 4)); // OK, returns 5
const vec3D = { x: 3, y: 4, z: 1 };

//_brand가 때문에 3D는 사용 할 수가 없다
calculateNorm(vec3D);
// ~~~~~ Property '_brand' is missing in type...
```

상표(\_brand)를 사용해서 calculateNorm 함수가 Vector2D 타입만 받는 것을 보장한다.<br/>

#### number 타입에도 상표를 붙일 수 있다

> 하지만 산술연산 후에는 상표가 없어지기에 실제 사용에는 무리가 있다

```ts
type Meters = number & { _brand: "meters" };
type Seconds = number & { _brand: "seconds" };

const meters = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;

const oneKm = meters(1000); // Type is Meters
const oneMin = seconds(60); // Type is Seconds
```

### 요약

- 구조적 타이핑을 사용하기에, 값을 세밀하게 구분하지 못하는 경우가 발생한다.
  값을 구분하기 위해 공식 명칭이 필요하다면 상표를 붙이는 것도 좋다
