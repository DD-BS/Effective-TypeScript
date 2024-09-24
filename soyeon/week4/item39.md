### Item39 - any를 구체적으로 변형해서 사용하기

- `any`는 `undefined`나 `null`, `DOM엘리먼트`도 포함할 수 있는 매우 큰 범위이므로 사용할 때 정말 모든 값이 허용되어야만 하는지 면밀하게 검토해야 한다.
- `any`타입을 정규식이나 함수에 넣는 것은 권장되지 않는다.
  ```tsx
  function getLengthBad(array: any) {
    return array.length;
  }

  function getLength(array: any[]) {
    return array.length;
  }
  ```
  - `any`보다 `any[]`를 사용하는 `getLength`함수가 더 좋다.
  - 함수 내의 `array.length`체크가 가능하다.
  - 함수 반환 타입이 `any`대신 `number`로 추론된다.
  - 함수가 호출될 때 매개변수가 배열인지 체크된다.
  - 배열이 아닌 값을 넣어 실행하면 `getLengthBad`는 오류를 잡지 못하는 반면에 `getLength`는 제대로 오류를 표시한다.
- 함수의 매개변수가 객체이긴 하지만 값을 알 수 없다면 `{[key: string]: any}` 와 같이 선언한다.

  ```tsx
  function hasTwelveLetterKey(o: { [key: string]: any }) {
    for (const key in o) {
      if (key.length === 12) {
        return true;
      }
    }
    return false;
  }
  ```

- 객체인 경우 `object`타입을 사용할 수도 있다.

  ```tsx
  function hasTwelveLetterKey(o: object) {
    for (const key in o) {
      if (key.length === 12) {
        console.log(key, o[key]); // 오류. {}형식에 암시적으로 any형식이 있습니다.
        return true;
      }
    }
    return false;
  }
  ```

  `object`타입은 객체의 키를 열거할 수는 있지만 속성에 접근할 수 없다는 점에서 `{[key: string]: any}`와 다르다.

- 함수의 타입에도 단순히 `any`를 사용하면 안된다. 최소한 아래와 같이 구체화한다.
  ```tsx
  type Fn0 = () => any; // 매개변수 없이 호출 가능한 모든 함수
  type Fn1 = (arg: any) => any; // 매개변수 1개
  type Fn2 = (...args: any[]) => any; // 모든 개수의 매개변수. "Function"타입과 동일

  // 특히 함수에서도 배열을 사용할 때 any[]를 쓴다.
  const numArgsBad = (...args: any) => args.length; // any 반환
  const numArgsGood = (...args: any[]) => args.length; // number 반환
  ```
