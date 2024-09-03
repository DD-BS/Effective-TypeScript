# 타입 추론에 문맥이 어떻게 사용되는지 이해하기

> TS가 타입을 추론하는 방식 : 값 고려 → 값이 존재하는 곳의 문맥 고려

문맥을 고려해 타입 추론 시 종종 이상한 결과 발생
-> 타입 추론에 문맥이 어떻게 사용되는지 이해함으로써 대처

동일한 코드

```ts
// 인라인 형태
setLanguage("Javascript");

// 참조 형태
let language = "Javascript";
setLanguage(language);

// 타입스크립트에서의 리팩터링
function setLanguage(language: string) {
  /* ... */
}
setLanguage("Javascript"); // 정상

let language = "Javascript";
setLanguage(language); // 정상
```

인라인 형태에서 TS는 함수 선언을 통해 매개변수가 Language 타입임을 알고 있음
이 값을 변수로 분리해내면, `TS는 할당 시점에 타입 추론`

```ts
type Language = "JavaScript" | "TypeScript" | "Python";

function setLanguage(language: Language) {
  console.log(language);
}

setLanguage("JavaScript"); // inline

let language = "JavaScript";
setLanguage(language); // variable
//          ~~~~~~~~ 'string' 형식의 인수는 'Language' 형식의 매개변수에 할당될 수 없습니다.
```

`string`으로 추론 -> `Language`타입으로 할당이 불가능하므로 오류 발생

### 해결 방법

1. 타입 선언에서 `language`의 가능한 값을 제한

```ts
let language: Language = "Javascript";
setLanguage(language); // 정상
```

2. `language`를 상수로 만드는 방법

```ts
const language = "Javascript";
setLanguage(language); // 정상
```

문맥으로부터 값을 분리함 → 근본적 문제 발생의 원인

### 튜플 사용 시 주의사항

> 해당 문제의 발생 원인 : const는 얕게(shallow) 동작

```ts
function panTo(where: [number, number]) {
  console.log(where);
}
panTo([10, 20]); // inline

const loc = [10, 20]; // 문맥에서 값 분리
panTo(loc);
```

`loc`는 문맥에서 값을 분리하여 할당 시점에 `number[]`(길이를 알 수 없는 숫자의 배열)로 추론됨

- TS가 정확히 파악 할 수 있도록 타입 선언을 제공

```ts
//1.
const loc: [number, number] = [10, 20];
panTo(loc); // 정상

// 2. '상수 문맥'을 제공
const loc = [10, 20] as const;
panTo(loc);
//    ~~~ 'readonly [10,20] 형식은 'readonly'이며
//         변경 가능한 형식 '[number, number]'에 할당할 수 없습니다.

//3. readonly 구문 추가
function panTo(where: readonly [number, number]) {
  console.log(where);
}
const loc = [10, 20] as const;
panTo(loc);
```

1번 : const는 단지 값이 가리키는 참조가 변하지 않는 얕은(shallow) 상수
2번 : as const는 그 값이 내부까지(deeply) 상수라는 사실을 TS에 알려줌
3번 : readonly를 사용하여 as const 오류를 막을 수 있음

3번 상세설명

- as const는 ts에게 loc 상수의 값을 리터럴 타입으로 간주하도록 지시함.
- 즉, loc의 타입은 [10,20]이라는 튜플 타입
- readonlay [number,number] 타입은 두 개의 숫자를 요소로 갖는 튜플이며, 각 readonly이기에 변경 할 수 없음

`문제의 원인`

- readonly가 없을 경우, where의 타입은 [number,number]가 됨
- 그러나 loc의 타입은 [10,20] as const에 의해 [10,20]이라는 리터럴 튜플 타입이며, 이는 readonly[10,20]으로 해석이 됨

### 요약

- 변수를 뽑아 별도로 선언할 때 오류 발생하면 타입 선언 추가
- 변수가 정말 상수인 경우라면 as const 사용
  - 상수 단언 사용 시 정의한 곳이 아닌 사용한 곳에서 오류가 발생 할 수 있으므로 주의
