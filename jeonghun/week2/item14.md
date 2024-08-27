# 타입 연산과 제네릭 사용으로 반복 줄이기

### 타입도 중복하지 말아야 한다

- DRY 원칙은 타입에도 적용이 되어야 한다

중복되는 타입은 아래와 같이 수정해서 중복을 없앨 수 있다

```ts
function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export default {};
/*--------------------------*/

interface Point2D {
  x: number;
  y: number;
}
function distance(a: Point2D, b: Point2D) {
  /* ... */
}
```

아래와 코드는 TopNavState가 State의 부분 집합인 것을 확인 할 수 있음. <br/>
이럴 경우TopNavState를 extends하여 State를 구성하는 것보다
부분집합으로 정의하는게 더 바람직 하다. 매핑된 타입을 사용하는게 좋다

```ts
interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}

interface TopNavState {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
}

type TopNavState = {
  [k in "userId" | "pageTitle" | "recentFiles"]: State[k];
};
```

매핑된 타입은배열의 필드를 루프 도는 것돠 같은 방식

#### Pick

[참고링크](https://github.com/lionleeee/typescript-TIL/blob/main/24072202_Pick.md)

- 제네릭 타입으로 원하는 타입만 뽑을 수 있음

```ts
interface User {
  name: string;
  age?: number;
}
//User에서 name만 가지고 온다
const userName: Pick<User, "name"> = "정훈";
```

# 요약

- 타입도 DRY 원칙을 지켜라
- 제네릭 타입과 keyof, typeof 등 잘 활용해라

[keyof_typeof 정리글](https://github.com/lionleeee/typescript-TIL/blob/main/2408270001_keyof_typeof.md)
