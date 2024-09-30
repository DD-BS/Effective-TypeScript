### Item51 - 의존성 분리를 위해 미러 타입 사용하기

- CSV파일을 파싱하는 라이브러리 작성 예제

```tsx
function parseCSV(contents: string | Buffer): { [column: string]: string }[] {
  if (typeof contents === "object") {
    // 버퍼인 경우
    return parseCSV(contents.toString("utf8"));
  }
}
```

- CSV파일의 내용을 매개변수로 받고, 열 이름을 값으로 매핑하는 객체들을 생성해 배열로 반환
- NodeJS 사용자들을 위해 매개변수에 `Buffer`타입 허용
- Buffer타입 정의는 NodeJS타입 선언을 설치해서 얻는다

```
$ npm install --save-dev @types/node
```

- 만약, 위 CSV라이브러리를 공개하면 타입 선언도 포함하게 된다.
- 타입 선언은 `@types/node`에 의존하기 때문에 `@types/node`는 `devDependencies`에 포함한다.
- 그러나 다음 두 그룹의 라이브러리 사용자들에게 문제가 발생한다
  - `@types`와 무관한 자바스크립트 개발자
  - NodeJS와 무관한 타입스크립트 웹 개발자
- 두 그룹의 사용자들은 사용하지 않는 모듈이 포함되어 있어 혼란스러울 것
- 각자가 필요한 모듈만 사용할 수 있도록 구조적 타이핑을 적용한다.
- 즉, `@types/node`에 있는 `Buffer`선언을 사용하지 않고, 필요한 메서드와 속성만 별도로 작성한다.

```tsx
interface CsvBuffer {
	toString(encoding: string): string;
}

function parseCSV(contents: string|CsvBuffer): {[columns: string]: string}[] {...}
```

- 인코딩 정보를 매개변수로 받는 `toString`메서드를 가지는 인터페이스를 별도로 만들어서 사용한다.
- `CsvBuffer`는 Buffer인터페이스보다 훨씬 짧고 실제로 필요한 부분만을 떼어 내어 명시했다.
- 또한, 해당 타입이 Buffer와 호환되기 때문에 NodeJS프로젝트에서는 실제 Buffer인스턴스로 parseCSV를 호출하는 것이 가능하다.
- 따라서, 만약 작성 중인 라이브러리가 의존하는 라이브러리의 구현과 무관하게 타입에만 의존한다면, **필요한 선언부만 추출하여 작성 중인 라이브러리에 넣는 것(미러링)**을 고려해보는 것도 좋다.
- 다른 라이브러리의 타입이 아닌 구현에 의존하는 경우에도 동일한 기법을 적용할 수 있고, 타입 의존성을 피할 수 있다.
