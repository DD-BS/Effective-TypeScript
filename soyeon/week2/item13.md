### Item13 - 타입과 인터페이스의 차이점 알기

- 명명된 타입을 정의하는 방법은 두 가지가 있다
  - `Type`
  - `Interface`
- 공통점1: 추가 속성을 함께 할당하게 되면 오류가 발생한다
- 공통점2: 인덱스 시그니처를 사용할 수 있다

  ```tsx
  type TDict = { [key: string]: string };
  interface IDict {
    [key: string]: string;
  }
  ```

- 공통점3: 함수 타입도 인터페이스나 타입으로 정의할 수 있다.

  ```tsx
  type TFnWithProperties = {
  	(x:number): number;
  	prop: string;
  }
  interface IFnWithProperties {
  	(x:number) => number;
  	prop: string;
  }
  ```

- 공통점4: 둘 다 제너릭이 가능하다

  ```tsx
  type TPair<T> = {
    first: T;
    second: T;
  };
  interface IPair<T> {
    first: T;
    second: T;
  }
  ```

- 공통점5: 확장이 가능하다. 인터페이스는 타입을, 타입은 인터페이스를 확장할 수 있다
  ```tsx
  interface IStateWithPop extends TState {
    population: number;
  }
  type TStateWithPop = IState & { population: number };
  ```
  다만, 인터페이스는 유니온 타입 같은 복잡한 타입을 확장하지는 못한다. (차이점1)
- 공통점6: 클래스를 구현하는 경우에도 타입과 인터페이스를 둘 다 사용할 수 있다

  ```tsx
  class StateT implements TState {
    name: string = "";
  }
  class StateI implements IState {
    name: string = "";
  }
  ```

- 차이점1: 유니온 타입은 있지만, 유니온 인터페이스라는 개념은 존재하지 않는다. `type`키워드를 사용해 유니온 타입을 정의할 수 있다.
  ```tsx
  type AorB = "a" | "b";
  ```
  유니온 타입의 확장이 필요한 경우, `type`을 사용해 확장할 수 있다.
  ```tsx
  type Tperson = (Input | Output) & { address: string };
  const val: Tperson = {
    name: "example",
    age: 23,
    birth: 201212,
    address: "st",
  };
  ```
  타입 `TPerson`은 `Input` 또는 `Ouput`타입에 `&`연산자를 통해 `address`속성을 추가하여 확장했다. 따라서 `TPerson`은 address 속성을 반드시 가지게 된다.
- 차이점2: 튜플과 배열 타입은 type키워드로 더 간결하게 표현할 수 있다
  ```tsx
  type Pair = [number, number];
  type StringList = string[];
  type NamedNums = [string, ...number[]];
  ```
  인터페이스도 튜플과 비슷하게 구현할 수 있으나 `concat()`과 같은 메서드를 사용할 수 없다.
- 차이점3: 인터페이스는 타입 ‘보강’ 기능이 있다
  ```tsx
  interface IState {
    name: string;
  }
  interface IState {
    age: number;
  }
  const val: IState = {
    name: "sam",
    age: 27,
  };
  ```
  이를 ‘선언 병합(declaration merging)’이라 하며, 사용하기 위해서는 반드시 인터페이스를 사용해야 한다. 예를 들어 API에 대한 타입 선언을 작성한다면 인터페이스를 사용해 새로운 필드를 병합할 수 있도록 하는 것이 유용하다.
