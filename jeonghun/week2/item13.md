## 타입과 인터페이스 차이점

- 타입과 인터페이스의 공통점
  - 제네릭 사용
  - 인덱스 시그니처 사용
  - 함수 타임 정의 가능
  - 서로 확장 가능
  - 클래스 구현 때 둘 다 사용 가능

※주의 할 점

- 인터페이스는 유니온 타입 같은 복잡한 타입을 확장하지 못함
- 복잡한 타입을 확장하고 싶다면 타입과 &를 사용해야함

```ts



type TState = {
  name: string;
  capital: string;
};
interface IState {
  name: string;
  capital: string;
}
interface IStateWithPop extends TState {
  population: number;
}

//IState가 먼저 충족되는지 검사 후 population 검사
type TStateWithPop = IState & { population: number };

const s2: IStateWithPop = {
  // name, capital 속성이 없습니다
};

const s3: IStateWithPop = {
  name :'a';
  capital : 'b';
  //population속성이 없습니다.
};

export default {};
```

### 인터페이스는 보강이 된다

- 속성을 확장하는 것을 `선언 병합`이라고 함
- 동일한 이름의 인터페이스가 두 개 있을 때마다 속성을 공유하는 단일 인터페이스로 병합

```ts
interface IState {
  name: string;
  capital: string;
}
interface IState {
  population: number;
}
const wyoming: IState = {
  name: "Wyoming",
  capital: "Cheyenne",
  population: 500_000,
}; // OK

export default {};
```

### 요약

- 복잡한 타입(유니온 등)을 다뤄야 한다면 타입을 사용
- 두가지 모두 사용 가능하다면?
  - 일관성과 보강 관점에서 고려해야함
  - 인터페이스를 사용하는 코드베이스라면 인터페이스를 사용
  - 일관하게 타입을 사용한다면 타입을 사용
