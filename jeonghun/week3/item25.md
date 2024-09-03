# 비동기 코드에는 콜백 대신 async 사용

### ES2015 이전

- 과거 비동기 동작을 처리하리 위해 콜백을 사용했다
- 콜백 지옥으로 너무 힘들었따

```ts
fetchURL(url1, function (response1) {
  fetchURL(url2, function (response2) {
    fetchURL(url3, function (response3) {
      // ...
      console.log(1);
    });
    console.log(2);
  });
  console.log(3);
});
console.log(4);

// 실행
4;
3;
2;
1;
```

### ES2015(ES6)- Promise

- Promise 개념을 도입해서 콜백 지옥에서 벗어났다
- future라고 부르기도 한다

```ts
const pagePromise = fetch(url1);
pagePromise
  .then((response1) => {
    return fetch(url2);
  })
  .then((response2) => {
    return fetch(url3);
  })
  .then((response3) => {
    // ...
  })
  .catch((error) => {
    // ...
  });
```

### ES2017(ES8) - async & await

```ts
async function fetchPages() {
  const response1 = await fetch(url1);
  const response2 = await fetch(url2);
  const response3 = await fetch(url3);
  // ...
}
```

#### await

- `await`은 각각의 프로미스가 처리(resolve)될 때까지 fetchPages 함수의 실행을 멈춘다.
- `async` 함수 내에서 await 중인 프로미스가 거절(reject)되면 예외를 던진다.
- 이를 통해 일반적인 `try/catch` 구문을 사용할 수 있다

#### Callback보다 Promise 또는 async/await를 사용하는게 좋다

- Callback 보다는 Promise가 코드 작성하기 쉽다.
  - 병렬로 api call을 하고싶다면 Promise.all을 사용해서 Promise 조합하면 된다.
  - 이런 경우는 await와 구조 분해 할당이 찰떡궁합이다.
- Callback 보다는 Prmoise가 타입 추론하기 쉽다.
  - 입력된 Promise들 중 첫 번째가 처리될 때 완료되는 Promise.race도 타입 추론과 잘 맞는다.
  - Promise.race를 사용하여 프로미스에 타임아웃을 추가하는 방법은 흔하게 사용되는 패턴이다.

```ts
async function fetchWithTimeout(url: string, ms: number) {
      return Promise.race([fetch(url), timeout(ms)]);
```

#### 프로미스를 생성하기 보다는 asycn/await가 좋다

- 일반적으로 더 간결하고 직관적이다
- async 함수는 항상 Promise를 반환하도록 강제한다
  - 어떤 함수가 Promise를 반환하면 async를 사용하여 항상 비동기 코드를 작성하자

```ts
// async 사용
const getNumber = async () => 42; //  type: () => Promise<number>;
// Promise 직접 생성
const getNumber = () => Promise.resolve(42);

//function getNumber() : Promise<number>
async function getNumber() {
  return 42;
}
```

### 요약

- 가능하면 프로미스를 생성하여 사용하기 보다는 async와 await를 사용하는게 좋다.
  - 훨씬 직관적이다
- 어떤 함수가 프로미스를 반환한다면 async로 선언하는게 좋다
