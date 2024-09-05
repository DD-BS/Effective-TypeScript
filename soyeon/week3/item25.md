### Item25 - 비동기 코드에는 콜백 대신 async 함수 사용하기

- 콜백보다는 프로미스가 코드를 작성하기 쉽다.
- 콜백보다는 프로미스가 타입을 추론하기 쉽다.
  ```tsx
  async function fetchPages() {
    const [res1, res2, res3] = await Promise.all([
      fetch(url1),
      fetch(url2),
      fetch(url3),
    ]);
  }
  ```
  타입스크립트는 타입 구문 없이도 각`res`의 타입을 `Response`로 잘 추론한다.
- 프로미스를 반환해야 하는 경우, `async/await`을 사용하자.
  - 일반적으로 더 간결하고 직관적인 코드가 된다
  - async 함수는 항상 프로미스를 반환하도록 강제한다.
  - 콜백이나 프로미스를 사용하게 되면 실수로 반(half)동기 코드를 작성할 수 있지만, async를 사용하면 항상 비동기 코드를 작성한다.
- async함수에서 프로미스를 반환하면 또 다른 프로미스로 래핑되지 않는다.
  - `Promise<Promise<T>>`가 아닌 `Promise<T>`로 반환
