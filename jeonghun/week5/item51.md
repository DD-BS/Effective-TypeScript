# 의존성 분리를 위해 미러 타입 사용하기

미러링 : 사용하는 라이브러리의 구현과 무관하게 타입에만 의존한다면, 필요한 선언부만 추출하여 작성중인 곳에 넣는것 `구조적 타이핑`을 이용한 방법

```ts
function parseCSV(contents: string | Buffer): { [column: string]: string } {
  if (typeof contents === "object") {
    //버퍼인 경우
    return pasrseCSV(contents.toString("utf-8"));
  }
}
```

Buffer의 타입 정의는 `@types/node`를 설치해야만 얻을 수 있음

> npm install --save-dev @types/node

- 위 파싱 라이브러리를 공개하려면 타입 선언도 포함하게 된다.
- 그리고 타입 선언이 @tpyes/node에 의존하므로 devDependencies에 포함되어야 한다.

그렇게 되면 다음 사용자들에게 문제가 생긴다

- @types와 무관한 자바스크립트 개발자
- NodeJS와 무관한 타입스크립트 개발자

이럴때 미러링을 사용하여 필요한 선언만 파일에 추가하면 해결된다

```ts
interface CsvBuffer {
  toString(encoding: string): string;
}

function parseCSV(contents: string | CsvBuffer): { [column: string]: string } {
  if (typeof contents === "object") {
    return pasrseCSV(contents.toString("utf-8"));
  }
}
```

Buffer 대신 우리가 새롭게 선언한 CsvBuffer를 사용하였다.
추후에 node js 개발자가 Buffer를 사용하는 경우, Buffer 타입 또한 toString 속성을 가지고 있으므로 CsvBuffer 타입에 포함되며 마찬가지로 parseCSV 함수를 사용할 수 있게 된다.
parseCSV(new Buffer('wowowowo'))

### 요약

- 필수가 아닌 의존성을 분리할 때는 구조적 타이핑을 사용하면 된다.
- 라이브러리를 공개 할 때는 자바스크립트 개발자가 타입 의존성을 가지게 하면 안된다
