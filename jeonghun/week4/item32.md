# 유니온의 인터페이스보다는 인터페이스의 유니온을 사용하기

유니온 타입의 속성을 가지는 인터페이스를 작성중이라면, `인터페이스의 유니온 타입`을 사용하는 것이 더 알맞지 않은지 검토해보는게 좋다.

아래 코드를 보면 `개선 전`코는 `무효한 상태`가 발생한다.

- Layout이 LineLayout이면서 paint이 FillPaint 상태가 발생 할 가능성이 있다

`개선 후` 코드를 보면 잘못된 조합으로 섞이는 경우를 방지하여 `유요한 상태`만을 표현했다

```ts
//개선 전
interface Layer {
  Layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}
//----------------------
// 개선 후
interface FillLayer {
  layout: FillLayout;
  paint: FillPaint;
}
interface LineLayer {
  layout: LineLayout;
  paint: LinePaint;
}
interface PointLayer {
  layout: PointLayout;
  paint: PointPaint;
}

//여기에서 type은 태그 유니온으로 런타임 시에 타입을 확인 할 수 있다
type Layer = FillLayer | LineLayer | PointLayer;
```

## 태그된 유니온

- 태그된 유니온은 상황에 따라 인터페이스를 분리 한 후 인터페이스들을 type을 이용하여 유니온으로 사용한다
- 런타심 시에 타입의 범위를 줄일 수 있다

> 분기별 처리가 필요할 시

- 태그를 참고하여 Layer의 타입의 범위를 줄일 수 있다.
- 각 타입의 속성들 간의 관계를 제대로 모델링하면, 코드의 정확성을 체크하는데 도움이 된다

```ts
interface Layer {
  type: 'fill' | 'line' | 'point'
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}

interface FillLayer {
  type: 'fill' // tag
  layout: FillLayout;
  paint: FillPaint;
}

interface LineLayer {
  type: 'line' // tag
  layout: LineLayout;
  paint: LinePaint;
}

interface PointLayer {
  type: 'point' // tag
  layout: PointLayout;
}

function drawLayer(layer: Layer) {
   if (layer.type === 'fill') {	// 태그를 이용하여 분기 처리
       const { layout, paint } = layer // 타입은 FillLayout, FillPaint
   } else if (layer.type ==== 'Line') {
       const { layout, paint } = layer // 타입은 LineLayout, LinePaint
   }
}

```

### 요약

- 유니온 타입의 속성을 여러개 가지는 인터페이스는 속성간의 관계가 분명하지 않아 `실수`가 자주 발생
- `유니온의 인터페이스`보다 `인터페이스의 유니온`이 더 정확하고 이해가 좋다
- 타입스크립트가 제어 흐름을 분석할 수 있또록 타입에 태그를 넣는것을 고려해 보는것도 좋다
