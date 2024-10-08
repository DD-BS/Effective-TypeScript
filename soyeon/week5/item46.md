### Item46 - 타입 선언과 관련된 세 가지 버전 이해하기

- 타입스크립트는 의존성 관리를 더 복잡하게 만든다.
- 왜냐하면 타입스크립트를 사용하면 다음 세 가지 사항을 추가로 고려해야 하기 때문이다.

1. 라이브러리의 버전
2. 타입 선언(@types)의 버전
3. 타입스크립트의 버전

- 세 가지 버전 중 하나라도 맞지 않으면, 의존성과 상관없어 보이는 곳에서 엉뚱한 오류가 발생할 수 있다.
- 따라서 타입스크립트 라이브러리 관리의 복잡한 매커니즘을 모두 이해해야 한다.
- 실제 라이브러리와 타입 정보의 버전이 별도로 관리되는 경우 다음과 같이 네 가지 문제점이 있다.

  - 라이브러리를 업데이트했지만 실수로 타입 선언은 업데이트 하지 않은 경우
    - 타입 선언도 함께 업데이트를 한다.
    - 타입 선언 버전이 준비되지 않은 경우 보강 기법을 활용해 타입 정보를 프로젝트 자체에 추가하고, 공개하여 커뮤니티에 기여한다.
  - 라이브러리보다 타입 선언의 버전이 최신인 경우
    - 라이브러리 버전을 올린다.
    - 타입 선언 버전을 내린다.
  - 프로젝트에 사용하는 타입스크립트 버전보다 라이브러리에서 필요로 하는 타입스크립트 버전이 최신인 경우
    - 프로젝트의 타입스크립트 버전을 올린다.
    - 라이브러리 타입 선언의 버전을 원래대로 내린다.
    - `declare module`선언으로 라이브러리의 타입 정보를 없앤다.
    - 타입스크립트의 특정 버전에 대한 타입 정보를 설치하려면 아래와 같이 실행한다.
    ```
    $npm install --save-dev @types/lodash@ts3.1
    ```
  - @types의존성이 중복되는 경우
    - @types/foo와 @types/bar에서 타입 선언이 중복될 경우 둘 중하나를 업데이트 해서 서로 버전이 호환되도록 한다.

- 타입스크립트로 작성된 일부 라이브러리들은 자체적으로 타입 선언을 포함(번들링)하게 된다.
- 자체적인 타입 선언은 보통 `package.json`의 `“types"`필드에서 `.d.ts`파일을 가리킨다.
- 번들링하여 타입 선언을 포함하는 경우 부수적인 네 가지 문제점이 있다.
  - 번들된 타입에 선언에 보강 기법으로 해결할 수 없는 경우
  - 프로젝트 내의 타입 선언이 다른 라이브러리의 타입 선언에 의존하면 문제가 된다.
  - 프로젝트의 과거 버전에 있는 타입 선언에 문제가 있는 경우, 과거 버전으로 돌아가서 패치 업데이트를 해야 한다.
  - 타입 선언의 패치 업데이트를 자주 하기 어렵다는 문제가 있다.
