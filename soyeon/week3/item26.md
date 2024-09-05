### Item26 - 타입 추론에 문맥이 어떻게 사용되는지 이해하기

- 타입스크립트는 타입을 추론할 때 단순히 값만 고려하는 것이 아닌 값이 존재하는 문맥까지도 고려한다.

  ```tsx
  type Lang = 'JS' | 'TS' | 'Py';
  function setLang(lang: Lang) {...}

  setLang('JS') // 정상

  let lang = 'JS'
  setLang(lang) // 오류. 할당 시점에 타입을 string으로 추론했다
  ```

  이를 해결하기 위한 두 가지 방법

  1. 타입 선언에서 lang의 가능한 값을 제한한다. `let lang: Lang = 'JS'`
  2. const를 사용해 상수로 만든다. `const lang = 'JS'`
     사용되는 문맥으로부터 값을 분리했는데 이는 추후에 근본적인 문제를 발생시킬 수 있다.

  - 튜플에서 문제

    ```tsx
    function panTo(where: [number, number]) {...}
    panTo([10,20]) // 정상

    const loc = [10,20];
    panTo(loc) // 오류. number[]에는 [number,number]가 들어올 수 없습니다.
    ```

    1. 상수에 타입을 선언한다. `const loc: [number, number] = [10,20]`
    2. 상수 단언을 사용한다. `const loc = [10,20] as const`
       - 이 경우, `loc`타입이 `readonly[10,20]`으로 너무 정확하게 추론
       - 따라서 매개변수를 `where: readonly[number, number]`로 수정한다.
       - 만약 세번째 요소를 추가하게 된다면, 타입 정의가 아닌 호출되는 곳에서 발생하므로 근본적인 원인을 파악하기 어렵다

  - 객체에서 문제

    ```tsx
    type Lang = "JS" | "TS" | "Py";
    interface GovernedLang {
      lang: Lang;
      organization: string;
    }

    function complain(lang: GovernedLang);
    const ts = { lang: "TS", organization: "Microsoft" };
    complain(ts); // 오류
    ```

    객체에서도 마찬가지로 상수 타입을 선언(`const ts: GovernedLang`)하거나 상수 단언(`as const`)을 사용한다.

  - 콜백에서 문제

    ```tsx
    function callbackNumber(fn: (n1: number, n2: number) => void) {
      fn(Math.random(), Math.random());
    }

    const fn = (a, b) => {
      return a + b;
    };
    callbackNumber(fn);
    ```

    콜백함수를 상수로 뽑아내 사용하면 문맥이 소실되고 오류가 발생한다. 이런 경우 매개변수에 타입 구문을 추가해서 해결한다. `const fn = (a:number, b:number) ⇒ {}` 가능할 경우 전체 함수 표현식에서 타입 선언을 적용하는 것이 좋다.(item12)
