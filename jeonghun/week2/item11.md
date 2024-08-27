# 잉여 속성 체크 한계 인지

```ts
interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
  // Room에는 elephant가 없다 라는 오류 발생
  //
};

export default {};

interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
//변수에 넣고 할당하면 오류가 발생하지 않음
const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: "present",
};
//obj 타입을 추론하면서 구조적 타이핑이 됨
const r: Room = obj; // OK

export default {};
```

- 객체 리터럴을 변수에 할당하게되면 잉여 속성 체크가 수행됨

```ts
const inter = { darkmode: true };
const o: Options = inter;
```

- 위 코드는 객체 리터럴이 아님. 따라서 `잉여 속성 체크가 안되고 오류가 사라짐`

```ts
const inter = { darkmode: true } as Options;
```

- 위 단언문도 잉여 속성 체크가 안됨. 즉, 오류가 발생하지 않음
- 단언문 보다 선언문을 사용해야 하는 이유
  <br/>

### 요약

- 객체 리터럴나 함수 매개변수로 전달할 때 잉여속성 체크가 수행됨
- 단언문보단 선언문을 사용해라
