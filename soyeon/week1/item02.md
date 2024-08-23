### 아이템2 - 타입스크립트 설정 이해하기

- 동료들도 알 수 있도록 `tsconfig.json`파일을 사용해 타입스크립트를 설정하는 것이 좋다.
- `noImplicitAny`옵션: 변수들이 미리 정의된 타입을 가져야 하는지 여부를 제어한다.
  - `true`: any 타입이라도 명시적으로 타입을 선언해줘야 한다.
  - `false`: 타입을 설정하지 않으면 타입스크립트가 any 타입으로 추론하여 오류를 뱉지 않는다.
  - 따라서 되도록이면 `true`로 설정한다.
- `strictNullChecks`옵션: `null`과 `undefined`가 모든 타입에서 허용되는지 확인하는 설정
  - `true`
    ```tsx
    const x: number = null; // ~'null' 형식은 'number'에 할당할 수 없습니다.
    ```
  - `false`
    ```tsx
    const x: number = null; // 정상
    ```
  - `strictNullChecks`옵션을 설정하려면 먼저 `noImplicitAny`옵션을 설정해야 한다.
- 이외에도 엄격한 체크를 하고 싶다면 `strict`를 설정해 대부분의 오류를 잡아낼 수 있다.
