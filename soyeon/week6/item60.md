### Item60 - allowJS로 타입스크립트와 자바스크립트 같이 사용하기

- 대규모 프로젝트를 타입스크립트로 점진적 전환시에는 자바스크립트와 타입스크립트가 동시에 동작할 수 있도록 하는 `allowJS` 컴파일러 옵션이 있다.
- 번들러에 타입스크립트가 통합되어 있거나, 플러그인 방식으로 통합이 가능하다면 `allowJS`를 간단히 적용할 수 있다.
- `npm install —save-dev tsify`를 실행하고 `browserify`를 사용하여 플러그인을 추가한다.
  ```
  $ browserify index.ts -p [tsify --allowJS ] > bundle.js
  ```
- 대부분의 유닛 테스트 도구에는 동일한 역할을 하는 옵션이 있다.
- 예를 들어, `jest`를 사용하면 `ts-jest`를 설치하고 `jest.config.js`에 타입스크립트 소스를 지정한다.
