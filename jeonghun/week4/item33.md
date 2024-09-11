# string타입보다 더 구체적인 타입 사용

`string 타입은 범위가 매우 넓기 때문에 남발하는것은 좋지 않다.`

```ts
// 개선 전
interface Album {
  artist: string;
  title: string;
  release: string; //YYYY-MM-DD
  recordingType: string; // 예를 들어 "live" "studio"
}

// 개선 후
type RecordingType = "studio" | "live";
interface AlbumFix {
  artist: string;
  title: string;
  release: Date;
  recordingType: RecordingType;
}
```

- 타입을 최대한 좁혀 의도하지 않은 값이 설정되는 것을 미리 막는게 좋다

```ts
//underscore.js 함수의 pluck이라는 함수가 있다고함. 해당 함수는 아래와 같이 동작함.
var group: AlbumFix[] = [
  {
    artist: "Dreatm Threater",
    recordingType: "studio",
    release: new Date("1999-12-12"),
    title: "Dance of the eternity",
  },
  {
    artist: "Queen",
    recordingType: "studio",
    release: new Date("1990-10-12"),
    title: "Let me live",
  },
];
//pluck(group, 'artist'); //결과 ['Dreatm Threater', 'Queen']

// 여기서, pluck 함수의 시그니처를 정의하려면 어떤 방식이 이상적일까?

//비추천) key의 값이 string으로 T에서 허용하지 않는 key를 허용함.
// 반환 타입 any는 너무 넓기 때문에 반환 타입 좁히기 원칙에 어울리지 않는 설계임.
function pluck<T>(record: T[], key: string): any[] {
  return records.map((r) => r[key]);
}

//추천하는 방식
function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
  return records.map((r) => r[key]);
}
```

### 요약

- string도 범위가 넓기 때문에 남발하면 안된다. 최대한 구체적으로 타입 설계를 해라
- 객체 속성의 이름을 함수의 매개변수로 받을 때는 string보다 keyof T를 쓰는게 좋다
