### Item11 - 잉여 속성 체크의 한계 인지하기

- 타입이 명시된 변수에 **객체 리터럴을 할당하는 경우** 타입스크립트는 해당 타입의 속성이 있는지, 그 외의 속성은 없는지 확인한다.
- 이 때(객체 리터럴을 할당한 경우) 해당 속성이 없다면 오류가 발생한다
- 구조적 타이핑 관점으로 생각해보면 오류가 발생하지 않아야 한다.

  ```tsx
  interface Room {
    numDoors: number;
  }

  const r: Room = {
    numDoor: 1,
    height: 10, // 오류 발생
  };

  const obj = {
    numDoor: 1,
    height: 10,
  };

  const r2: Room = obj; // 정상
  ```

  변수 `r`에서는 잉여 속성 체크 과정이 수행되었다.

  그러나 변수 `r2`와 같이 잉여 속성 체크 과정이 수행되지 않을 때도 있다는 것을 알아야 한다.

  따라서 잉여 속성 체크와 할당 가능 검사는 별도의 과정임을 알아두자

    <br/>

- 또한 잉여 속성 체크 과정이 수행되지 않으면, 타입이 넓이지는 문제가 발생한다

  ```tsx
  interface Options {
    title: string;
  }

  const o1: Options = document;
  const o2: Options = new HTMLAnchorElement();
  ```

  `document`와 `new HTMLAnchorElement`의 인스턴스에는 모두 `string`타입인 title속성을 가지고 있다. 따라서 두 변수 `o1`, `o2`에 있는 할당문은 정상이다.

  이러한 문제를 방지하기 위해서는 객체 리터럴에 알 수 없는 속성을 허용하지 않는 ‘엄격한 객체 리터럴 체크’를 통해 잉여 속성 체크를 해야한다.

  <br/>

- 잉여 속성 체크는 타입 단언문을 사용할 때도 적용되지 않는다.

  ```tsx
  const o = { darkmode: true, title: "Ski" } as Options; // 정상
  ```

  위 예문은 단언문보다 선언문을 사용해야 하는 이유 중 하나다.

  <br/>

- 잉여 속성 체크를 원치 않는다면, 인덱스 시그니처를 사용해서 타입스크립트가 추가적인 속성을 예상하도록 할 수 있다

  ```tsx
  interface Options {
    darkMode: boolean;
    [otherOptions: string]: unknown;
  }
  const o: Options = { darkmode: true }; // 정상
  ```

  <br/>

- 선택적 속성만 가지는 ‘약한’ 타입에도 비슷한 체크가 동작한다

  ```tsx
  interface LineChartOptions {
    logscale?: boolean;
    invertYAxis?: boolean;
    areaChart?: boolean;
  }
  const opts = { logScale: true };
  const o: LineChartOptions = opts; // 오류
  ```

  `LineChartOptions`는 모든 속성이 선택적이므로 구조적 관점에서 모든 객체를 포함할 수 있다.
  그러나 이런 약한 타입에서 타입스크립트는 값 타입과 선언 타입에 공통된 속성이 있는지 별도의 체크를 수행한다
  공통 속성 체크는 잉여 속성 체크와 마찬가지로 오타를 잡는 데 효과적이며 구조적으로 엄격하지 않다
  그러나 잉여 속성 체크와는 다르게 약한 타입과 관련된 할당문마다 수행된다.
  임시 변수를 제거하더라도 공통 속성 체크는 여전히 동작한다

  <br/>

- 잉여 속성 체크는 한계가 있다. 임시 변수를 도입하면 잉여 속성 체크를 건너뛸 수 있다는 점을 명심하자
