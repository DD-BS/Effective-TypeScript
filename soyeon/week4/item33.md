### Item33 - string 타입보다 더 구체적인 타입 사용하기

- `string`의 타입 범위는 매우 넓다
- 타입 범위가 넓어지면 잘못 사용하더라도 오류로 드러나지 않는다.
- 이러한 경우를 ‘문자열을 남발하여 선언되었다(stringly typed)’라고 표현하기도 한다.
  ```tsx
  interface Album {
    artist: string;
    title: string;
    releaseDate: string;
    recordingType: string;
  }
  ```
  ```tsx
  /** 녹음이 어떤 환경에서 이루어졌는지 */
  type RecordingType = "studio" | "live";

  interface Album {
    artist: string;
    title: string;
    releaseDate: Date;
    recordingType: RecordingType;
  }
  ```
  위와 같은 변경된 방식에는 세가지 장점이 있다.
  - 타입을 명시적으로 정의함으로써 다른 곳으로 값이 전달되어도 타입 정보가 유지된다.
  - 타입을 명시적으로 정의하고 해당 타입의 의미를 설명하는 주석을 달 수 있다. 이는 편집기에서 확인할 수 있다.
  - `keyof`연산자로 더욱 세밀하게 객체의 속성 체크가 가능하다.
    ```tsx
    function pluck<T>(records: T[], key: keyof T): T[keyof T][] {
      return records.map((r) => r[key]);
    }
    ```
    제너릭을 사용해 코드를 개선했다. `T[keyof T][]`는 T객체 내의 가능한 모든 타입이다. 그러나 key의 값으로 하나의 문자열을 넣게 되면, 범위가 너무 넓어진다.
    ```tsx
    const releaseDates = pluck(records, "releaseDate"); // 타입 (string | Date)[]
    ```
    string에 비하면 좁지만 그래도 여전히 넓다. 따라서 범위를 . 더좁히기 위해 keyof T의 부분 집합으로 두 번째 제너릭 매개변수를 도입한다.
    ```tsx
    function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
      return records.map((r) => r[key]);
    }
    ```
