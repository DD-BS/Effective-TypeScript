### Item32 - 유니온의 인터페이스보다는 인터페이스의 유니온을 사용하기

- 아래 예시 코드 확인

  ```tsx
  interface Layer {
    layout: FillLayout | LineLayout | PointLayout;
    paint: FillPaint | LinePaint | PointPaint;
  }
  ```

  `layout`이 `LineLayout` 타입이면서 `paint`가 `FillPaint` 타입인 것은 말이 되지 않는다. 오류는 물론 인터페이스를 다루기도 어려워질 것이다

  <br/>

- 각각 타입의 계층을 분리된 인터페이스로 설정한다.

  ```tsx
  interface FillLayer {
  	type: 'fill';
  	layout: FillLayout;
  	paint: FillPaint;
  }
  interface LineLayer {
  	type: 'line';
  	layout: LineLayout;
  	paint: LinePaint;
  }
  interface PointLayer {
  	type: 'point';
  	layout: PointLayout;
  	paint: PointPaint;
  }
  type Layer = FillLayer | LineLayer | PointLayer;

  function drawerLayer(layer: Layer) {
  	if(layer.type === 'fill') {...}
  }
  ```

  이런 형태로 `Layer`를 정의하면 `layout`과 `paint` 속성이 잘못된 조합으로 섞이는 경우를 방지할 수 있다. 또한, `태그된 유니온을` 사용해 `Layer`의 타입 범위를 좁힐 수도 있다.

  <br/>

- 여러 개의 선택적 필드가 동시에 값이 있거나 동시에 `undefined`인 경우 태그된 유니온 패턴을 사용한다.

  ```tsx
  interface Person {
    name: string;
    placeOfBirth?: string;
    dateOfBirth?: Date;
  }
  ```

  선택적 필드인 두 값을 동시에 있거나 없다고 표현하기 위해서는 하나의 객체로 모으는 것이 좋다.

  ```tsx
  interface Person {
    name: string;
    birth?: {
      place: string;
      date: Date;
    };
  }
  ```

  <br/>

- 타입의 구조를 손 댈 수 없는 상황(예를 들면 API 결과)에서는 인터페이스의 유니온을 사용해 속성 사이의 관계를 모델링할 수 있다.

  ```tsx
  interface Name {
    name: string;
  }
  interface PersonWithBirth extends Name {
    placeOfBirth: string;
    dateOfBirth: Date;
  }
  type Person = Name | PersonWithBirth;

  function eulogize(p: Person) {
    if ("placeOfBirth" in p) {
      p; // 타입 PersonWithBirth
      const { dateOfBirth } = p; // 정상 동작
    }
  }
  ```

  이렇게 하면 중첩된 객체에서도 동일한 효과를 볼 수 있다.
