# 일관성 있는 별칭 사용하기

```ts
const borough = { name: "Brooklyn", location: [40.688, -79.233] };
const loc = borough.location;

// → 별칭의 값 변경 시 원래 속성값에서도 변경
loc[0] = 0;
borough.location; // [0, -79.233]
```

```ts
interface Coordinate {
  x: number;
  y: number;
}

interface BoundingBox {
  x: [number, number];
  y: [number, number];
}

interface Polygon {
  exterior: Coordinate[];
  holes: Coordinate[][];
  bbox?: BoundingBox;
}
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  //box와 bbox는 같은 값인데 다른 이름을 사용함
  //읽는 사람이 어려움
  const box = polygon.bbox;
  if (box) {
    if (
      pt.x < box.x[0] ||
      pt.x > box.x[1] ||
      pt.y < box.y[1] ||
      pt.y > box.y[1]
    ) {
      // OK
      return false;
    }
  }
  // ...
}
```

이럴 때에는 객체 비구조화를 사용

```ts
function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
  //box와 bbox는 같은 값인데 다른 이름을 사용함
  const { bbox } = polygon;
  if (bbox) {
    const { x, y } = bbox;
    if (pt.x < x[0] || pt.x > x[1] || pt.y < x[0] || pt.y > y[1]) {
      return false;
    }
  }
  // ...
}
```

### 요약

- 변수에 별칭을 사용할 때는 일관되게 사용해야함
- 비구조화 문법을 사용해서 일관된 이름을 사용하는 것도 좋다
