### Item31 - 타입 주변에 null 값 배치하기

- 값이 전부 null이거나 전부 null이 아닌 경우로 분명히 구분된다면, 값이 섞여 있을 때보다 다루기 쉽다.

  ```tsx
  function extent(nums: number[]) {
    let min, max;
    for (const num of nums) {
      if (!min) {
        min = num;
        max = num;
      } else {
        min = Math.min(min, num);
        max = Math.max(max, num);
      }
    }

    return [min, max];
  }

  extent([0, 1, 2]); // [1,2]
  ```

  위 코드를 `strictNullChecks`없이 실행하면 `!min`에 의해 0값이 덧씌워진다. 즉, `[0,2]`가 아닌 `[1,2]`가 반환된다. 만약 배열이 비어있다면 `[undefined, undefined]`가 반환될 것이다. `strictNullChecks`를 키고 실행하게 되면 `max`에서 오류가 나는데 이는 `min`에서만 `undefined`를 걸러냈기 때문이다. 따라서 `max`에 대한 체크를 추가하기보단 아래 코드와 같이 두 값을 한 객체에 넣고 `null`이거나 `null`이 아니게 한다.

  ```tsx
  function extent(nums: number[]) {
    let result: [number, number] | null = null;
    for (const num of nums) {
      if (!result) {
        result = [num, num];
      } else {
        result = [Math.min(num, result[0]), Math.max(num, result[1])];
      }
    }

    return result;
  }
  ```

- API 작성 시에도 반환 타입을 큰 객체로 만들고 반환 타입 전체가 `null`이거나 `null`이 아니게 만든다.
- `strictNullChecks`옵션은 `null`값과 관련된 문제점을 찾아낼 수 있기에 반드시 필요하다.
