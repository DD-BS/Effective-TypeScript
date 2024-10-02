### Item59 - 타입스크립트 도입 전에 @ts-check와 JSDoc으로 시험해보기

- 타입스크립트로 전환하기 전에 !
- `@ts-check`지시자를 사용해 타입 체커가 파일을 분석하고, 발견된 오류를 보고하도록 지시한다.
- `@ts-check`는 매우 느슨한 타입 체크를 수행하는데, `noImplicitAny`설정을 해제한 것보다 가벼운 체크를 수행한다.
  ```tsx
  // @ts-check
  const person = { first: "Grace", last: "Hopper" };
  2 * person.first; // 오류. 산술 연산 오른쪽은 any, number, bigint 또는 열거형이어야 한다
  ```
- 자바스크립트임에도 불구하고 `@ts-check`덕분에 타입 체크가 동작했다.
- 이외에도 선언되지 않은 전역 변수를 찾을 수 있다.
- 서드파티 라이브러리를 사용하는 경우, 서드파티 라이브러리의 타입 정보를 알아야 한다.
- `@ts-check`지시자를 통해 해당 라이브러리의 타입이 있는지 확인할 수 있다.
- `DOM`엘리먼트 관련된 부분에서 오류를 표시하게 되는데 이때 `JSDoc`을 활용한다.
  ```tsx
  //@ts-check
  const ageEl = document.getElementById("age");
  ageEl.value = "12"; // 오류. HTMLElement 유형에 value 속성이 없음
  ```
- `HTMLInputElement`타입에는 value속성이 있지만, `getElementById`는 `HTMLElement`타입을 반환하는 것이 오류의 원인이다.
- 타입스크립트가 아니기 때문에 타입 단언문을 사용할 수 없으므로 JSDoc을 사용한다.
  ```tsx
  //@ts-check
  const ageEl = /** @type {HTMLInputElement} */ document.getElementById("age");
  ageEl.value = "12"; // 정상
  ```
- `JSDoc`의 `@type`구문 사용시 타입을 감싸는 중괄호가 필요하다.
- `@ts-check`를 활성화하면 이미 존재하던 `JSDoc`에서 부작용이 발생할 수 있으므로 주의한다.
- `@ts-check`와 `JSDoc` 주석은 점진적 마이그레이션 과정 중에 유용하지만, 장기간 사용하는 것은 좋지 않다.
- 마이그레이션의 최종 목표는 `.ts`로 된 타입스크립트임을 명시하자.
