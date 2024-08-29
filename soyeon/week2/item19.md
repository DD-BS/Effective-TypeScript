### Item19 - 추론 가능한 타입을 사용해 장황한 코드 방지하기

- 타입스크립트는 타입 추론 덕분에 많은 명시적 타입 구문은 사실 불필요하다
- 비구조화 할당문을 사용해 모든 지역 변수의 타입이 추론되도록 하는 것이 낫다.
- 이상적인 타입스크립트 코드는 함수나 메서드 시그니처에 타입 구문을 포함하지만, 함수 내에서 생성된 지역 변수에는 타입 구문을 넣지 않는다. 코드를 읽는 사람이 구현 로직에 집중할 수 있게 하는 것이 좋기 때문이다.
- 특히, 타입 정보가 있는 라이브러리에서 불필요한 타입 선언은 필요하지 않다.

  ```tsx
  // express HTTP 서버 라이브러리 사용시
  ❌ app.get('/health', (request: express.Request, response: express.Response) => {...})

  ✅ app.get('/health', (request, response) => {...})
  ```

<br/>

- 타입을 명시해야 하는 상황 중 하나는 **객체 리터럴을 사용**할 때이다.

  ```tsx
  interface Product {
    id: number;
    name: string;
    price: number;
  }

  function logProduct(product: Product) {
    const { id, name, price } = product;
  }

  const furby = {
    name: "Furby",
    id: 12345,
    price: 35,
  };

  logProduct(furby); // 오류 발생
  ```

  `furby`에 타입을 사용하지 않는다면 잉여 속성 체크가 동작하지 않고, 객체를 선언한 곳이 아니라 객체가 사용되는 곳에서 타입 오류가 발생한다. 따라서 `furby: Product`타입을 명시해서 사용한다.

<br/>

- 타입을 명시해야 하는 또 다른 상황은 **함수를 반환하는 경우**이다.
  ```tsx
  const cache: {[ticker: string]: number} = {};
  function getQuote(ticker: string) {
  	if(ticker in cache) {
  		return cache[ticker];
  	}
  	return fetch(`https://..?q=${ticker}`).then(res => res.json())...
  }
  ```
  위 코드를 보면 `getQuote`함수는 항상 `Promise`를 반환하므로 if구문은 `cache[ticker]`가 아니라 `Promise.resolve(cache[ticker])`가 반환되도록 해야 한다. 이를 실행하면 오류는 `getQuote`함수 내부가 아니라 호출한 코드에서 발생하게 된다. 따라서, 타입 추론이 가능할지라도 구현상의 오류가 함수를 호출한 곳까지 영향을 미치지 않도록 하기 위해 타입 구문을 명시하는 것이 좋다.
  - 이외에도 함수의 반환 타입을 명시하면 함수의 입력과 출력 타입이 무엇인지 미리 알 수 있으므로 함수 구현에 도움이 된다.
  - 또한, 명명된 타입을 사용해 반환 타입을 명시하면 더욱 직관적인 표현이 될 수 있어 다른 사용자가 혼란을 겪지 않아도 된다.
  - 린터를 사용하고 있다면 eslint 규칙 중 `no-inferrable-types`를 사용해 모든 타입 구문이 정말로 필요한지 확인할 수 있다
