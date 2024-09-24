# devDependencies에 typescript와 @types 추가하기

- dependencies
  - 현재 프로젝트를 실행하는데 필수적인 라이브러리들이 포함됨
- devDependencies
  - 프로젝트를 개발하고 테스트하는데는 필요하지만, 런타임에는 필요없는 라이브러리들이 포함됨
- peerDependencies
  - 런타임에 필요하긴 하지만, 의존성을 직접 관리하지 않는 라이브러리들이 포함됨

<br/>

> 타입스크립트와 관련된 라이브러리는 일반적으로 devDependencies에 포함

1. 타입스크립트 자체 의존성을 고려해야함

- ts를 시스템 레벨로 설치 할 수 있지만 다음과 같은 이슈가 발샐 할 수 있음
  - 팀원 모두가 동일한 버전으로 설치한다는 보장이 없음
  - 프젝트 셋업 시에 별도의 단계가 추가됨
- 따라서 TS는 devDependencies에 포함되어 npm install로 동일한 버전 다운이 가능하도록 하는게 좋다

2. 타입 의존성(@types)을 고려해야 한다.

- `@types는 타입 정보만 가지고 있고 구현체는 포함하지 않는다`
- 원본 라이브러리 자체가 dependencies에 있다고 하더라도 @types 의존성은 devDependencies에 있어야 한다

### 요약

- 시스템 레벨에 타입스크립트를 설치하는건 멍청한 짓이다.
