# 사용할 때는 너그럽게, 생성은 엄격하게

- 아래 코드는 대부분 타입을 옵셔널로 만들어서 유연하게 동작하도록 만들었음.

```ts
declare function calculateBoundingBox(
  f: Feature
): [number, number, number, number];
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;
declare function setCamera(camera: CameraOptions): void;

type Feature = any;
type CameraOptions = {
  center?: LngLat;
  zoom?: number;
  bearing?: number;
  pitch?: number;
};
type LngLat =
  | { lng: number; lat: number }
  | { lon: number; lat: number }
  | [number, number];
type LngLatBounds =
  | { northeast: LngLat; southwest: LngLat }
  | [LngLat, LngLat]
  | [number, number, number, number];

function focusOnFeature(f: Feature) {
  const bounds = calculateBoundingBox(f);
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  // (1) Error: 'LngLat | undefined' 형식에 'lat' 속성이 없습니다.
  // viewportForBouns의 리턴값이 옵셔널이므로 lat, lng이 undefined 유니온이 됨
  const {
    center: { lat, lng },
    zoom,
  } = camera;
  zoom; // number | undefined
  window.location.search = `?v=@${lat},${lng}z${zoom}`;
}
```

반환되는 타입인 `CameraOptions`이 옵셔널로 유연하게 되어 있기에 (1)에서 타입을 확정 지을 수 없음

이럴경우 복잡해 보일 수는 있지만, 아래와 같이 엄격한 타입과 유연한 타입을 만드는게 좋다

## 매개변수 타입은 넓게, 반환 타입은 좁게

- 가능하다면 매개변수 타입은 알아서 하고, 반환 타입은 좁게하는게 좋다.
- 반환 타입을 옵셔널로 넓게 잡으면 (1)과 같은 문제가 발생하여 받는 쪽에서 분기를 나눠서 타입이 뭔지 구분해야 하는 불편함이 발생한다.

```ts
declare function calculateBoundingBox(
  f: Feature
): [number, number, number, number];
// (3)
declare function viewportForBounds(bounds: LngLatBounds): Camera;
declare function setCamera(camera: CameraOptions): void;

type Feature = any;
// (2) 기본 타입을 만들고 옵셔널 타입을 만들었음
type LngLat = { lng: number; lat: number };
type LngLatLike = LngLat | { lon: number; lat: number } | [number, number];

// (2) 기본 타입을 만들고 Partial을 이용해서 옵셔널 타입을 만들고, Omit을 사용해서 center 속성을 지움
// 그리고 & 연산자로 center의 타입을 LngLatLike로 바꿔줌
type Camera = { center: LngLat; zoom: number; bearing: number; pitch: number };
type CameraOptions = Omit<Partial<Camera>, "center"> & {
  center?: LngLatLike;
};
type LngLatBounds =
  | { northeast: LngLatLike; southwest: LngLatLike }
  | [LngLatLike, LngLatLike]
  | [number, number, number, number];

function focusOnFeature(f: Feature) {
  const bounds = calculateBoundingBox(f);
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  // (4)
  const {
    center: { lat, lng },
    zoom,
  } = camera;
  zoom; // number
  window.location.search = `?v=@${lat},${lng}z${zoom}`;
}
```

### 요약

- 바로 위에 처럼 매개변수와 반환 타입을 위해 기본 타입을 만들고 가공해서 유연한 타입을 만드는게 좋다
