### Item16 - number 인덱스 시그니처보다는 Array, 튜플, ArrayLink 사용하기

- 자바스크립트에서 배열은 `object`타입이다. `object`타입은 키와 값의 쌍으로 이루어져있으며 키는 string 또는 symbol타입만 가능하다. 따라서 배열의 key 또한 `number`타입으로 접근하는 것이 불가능하다
- 우리가 `arr[0]`과 같이 숫자로 접근할 수 있는 것은, 내부적으로 `arr['0']`으로 형변환되기 때문에 가능한 것이다.
- 일반적이지 않지만, 만약 string 대신 number로 인덱스할 항목을 지정할 것이라면 인덱스 시그니처가 아닌 Array 또는 튜플 타입을 대신 사용한다
- 어떤 길이를 가지는 배열과 비슷한 형태의 튜플을 사용하고 싶다면, `ArrayLike`타입을 사용할 수도 있다
- `ArrayLike`타입은 Array와 같이 number 타입의 key로 접근할 수 있으나, Array 프로토타입에 있는 메서드들이 필요 없을 때 사용한다.
  ```tsx
  function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
    if (i < xs.length) {
      return xs[i];
    }
    throw new Error(`배열의 끝을 지나서 ${i}에 접근하려고 했습니다.`);
  }
  ```
  `ArrayLike`를 사용해도 키는 여전히 문자열이다
