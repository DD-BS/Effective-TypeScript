# API 주석에 TSDoc 사용하기

아이템 48: API 주석에 TSDoc 사용하기
함수 주석에 // ... 대신 JSDoc 스타일의 /** ... **/ 을 사용하면 대부분의 편집기는 함수 사용부에서 주석을 툴팁으로 표시해 줌
타입스크립트 관점의 TSDoc

```ts
/**
 * Generate a greeting
 * @param name Name of the person to greet
 * @param title ...
 * returns ...
 */
function greetFullTSDoc(name: string, title: string) {
  return `Hello ${title} ${name}`;
}
```

타입 정의에 TSDoc 사용하기

```ts
/** 특정 시간과 장소에서 수행된 측정 */
interface Measurement {
  /** 어디에서 측정되었나? */
  position: Vector3D;

  /** 언제 측정되었나? */
  time: number;

  /** 측정된 운동량 */
  momentum: Vector3D;
}

// Measurement 객체의 각 필드에 마우스를 올려 보면 필드별로 설명을 볼 수 있음
```

`타입스크립트에서는 타입 정보가 코드에 있기 때문에 TSDoc에서는 타입 정보를 명시하면 안 됨(주의)`
