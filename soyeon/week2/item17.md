### Item17 - 변경 관련된 오류 방지를 위해 readonly 사용하기

- 자바스크립트의 배열은 내용을 변경할 수 있기 때문에 의도치 않은 동작이 발생할 수 있다.
- 타입 스크립트의 `readonly`접근 제어자를 사용해 변경하지 않는다고 선언해 오류의 범위를 줄일 수 있다.

  - 배열의 요소를 읽을 수 있지만, 쓸 수 없다.
  - length를 읽을 수 있지만, 바꿀 수 없다
  - 배열을 변경하는 `pop`과 같은 메서드를 호출할 수 없다.

  ```tsx
  function arraySum(arr: readonly number[]) {
    let sum = 0,
      num;
    while ((num = arr.pop()) !== undefined) {
      // 오류. readonly number[]형식에 'pop'속성이 없습니다.
      sum += num;
    }
  }
  ```

  만약 함수가 매개변수를 변경하지 않는다면 `readonly`로 선언하는 것이 좋다. 만약 라이브러리에 있는 함수를 호출하는 경우라면 타입 선언을 바꿀 수 없으므로 타입 단언문을 사용해야 한다.

  <br/>

- `readonly`는 얕게 동작하므로 깊은 Readonly제너릭을 만들거나, `DeepReadonly`라이브러리를 사용하는 것이 좋다.
  ```tsx
  const dates: readonly Date[] = [new Date()];
  dates.push(new Date()); // 오류
  dates[0].setFullYear(2037); // 정상
  ```
  위 예제 코드처럼 얕은 `readonly`는 push를 사용하는 동작은 막아주지만 객체 내에 속성을 바꾸는 동작까지는 막지 못한다
