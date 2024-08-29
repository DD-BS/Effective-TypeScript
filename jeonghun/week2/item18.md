# 매핑된 타입을 사용하여 값 동기화

```ts
type ScatterProps = {
  // data
  xs: number[];
  ys: number[];

  // display
  xRange: [number, number];
  yRange: [number, number];
  color: string;

  // // 특정 속성이 추가된 경우 (1)
  // name: string;

  // events
  onClick: (x: number, y: number, index: number) => void;
};
```

- 필요할 때만 차트를 다시 그릴 수 있따
- 데이터나 속성이 변경되면 다시 그려야하지만, 핸들러가 변경되면 다시 그릴 필요가 없다

### 보수적 접근법

- SactterProps에 새로운 속성이 추가 되면 실행마다 무조건 shouldUpdate()가 실행된다

```ts
// "React"의 "Hook"처럼 상태가 변하는지 감지 ( 최적화 방법 ) ( "useCallback"이라고 가정 )
// 변했다면 true를 리턴 ( 다시 생성 후 캐싱 )
// 변하지 않았다면 false리턴 ( 캐싱된 데이터 사용 )
const shouldUpdate = (oldProps: ScatterProps, newProps: ScatterProps) => {
  let key: keyof ScatterProps;

  for (key in oldProps) {
    // (2)
    if (oldProps[key] !== newProps[key]) {
      if (key !== "onClick") return true;
    }
  }

  return false;
};
```

- oldProps에는 추가된 name(1)이 들어 있지 않으니 (2)에서 반드시 true가 나와서 다른 데이터가 변경되지 않아도 항상 다시 생성 후 캐싱되는 과정을 거침
- 정확하게 잘 생성되지만, 너무 자주 재생성된다는 단점이 있다

### 이상적 해결법

- (1)이 추가 된다면 REQUIRES_UPDATE에서 먼저 타입 체커가 오류를 발생시킴
- 수동적으로 바꿔줘야 하지만, 실수하는 일은 없음

```ts
//ScatterProps의 각 속성에 대해 업데이트가 필요한지 여부를 나타냄
// true는 해당 속성이 변경되면 업데이트가 필요함을 의미
const REQUIRES_UPDATE: { [key in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false,
};

//old와 new를 비교하여 업데이트가 필요한지 결정
// old와 new 의 값이 다르고 update가 ture로 설정 되어있다면 업데이트가 필요
const shouldUpdate = (oldProps: ScatterProps, newProps: ScatterProps) => {
  let key: keyof ScatterProps;

  for (key in oldProps) {
    if (oldProps[key] !== newProps[key] && REQUIRES_UPDATE[key]) {
      if (key !== "onClick") return true;
    }
  }

  return false;
};
```

### 요약

- 불필요한 업데이트를 방지하는 것만으로도 충분한 최적화가 된다
- 타입체커를 통해서 오류를 방지하여 실수를 방지 할 수 있다
- 불필요한 속성의 업데이트를 하지 않게된다
