# 함수형 기법과 라이브러리로 타입 흐름 유지하지

`ts`에서 어떤 작업을 할때는 함수형, 절차형, 라이브러리(lodsh) 등이 있지만, 라이브러리를 사용하는게 가장 좋은 방법이다

- 로대시, 람다는 순수 자바스크립트로 구현되어 있다.
  타입 정보가 그대로 유지되면서 타입 흐름을 계속 전달되도록 하기 때문이다.

#### 함수형 vs 라이브러리

```ts
// csv 데이터 파싱 예제
// 데이터가 채워져 있다고 가정 ( 행("\n")과 열(",") )
const csvData = "";

// 행끼리 구분
const rawRows = csvData.split("\n");

// 헤더들 분리
const headers = rawRows[0].split(",");

// (1) 절차형: 헤더 제외한 모든 행 반복 ( forEach )
const rows1 = rawRows.slice(1).map((rowStr) => {
  // 각 행에 해당하는 열에 있는 데이터를 담을 객체
  const row = {};

  // 각 행의 각 열을 분리해서 반복
  rowStr.split(",").forEach((v, j) => {
    // 각 행의 각 열을 추가
    row[headers[j]] = v;
  });

  return row;
});

// (2) 함수형: 헤더 제외한 모든 행 반복 ( reduce )
const rows2 = rawRows.slice(1).map((rowStr) =>
  rowStr.split(",").reduce((row, v, i) => {
    row[headers[i]] = v;
    return row;
  }, {})
);

// (3) 라이브러리: 헤더 제외한 모든 행 반복 ( "lodash"의 "zip()" )
import _ from "lodash";
const rows3 = rawRows
  .slice(1)
  .map((rowStr) => _.zipObject(headers, rowStr.split(",")));
```

#### 배열 평탄화

`ts`에서 여러 배열을 합쳐 하나의 배열을 만드는 경우 `flat()`을 사용하면 좋다

```ts
type Player = {
  name: string;
  team: string;
  salary: number;
};
declare const rosters: { [team: string]: Player[] };

// (1)
let allPlayers1: Player[] = [];
for (const players of Object.values(rosters)) {
  allPlayers1 = allPlayers1.concat(players);
}

// (2) allPlayers2: Player[]
const allPlayers2 = Object.values(rosters).flat();
```

### 결론

- 라이브러리를 사용하면 좋은점
  - 타입 흐름 개선
  - 가독성 개선
- 직접 구현보다는 내장된 함수형 기법이나 로대시같은 유틸 라이브러리 사용해라
