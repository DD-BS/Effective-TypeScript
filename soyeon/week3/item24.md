### Item24 - 일관성 있는 별칭 사용하기

- 별칭을 남발해서 사용하면 제어 흐름을 분석하기 어렵다.

  ```tsx
  const borough = { name: "b", location: [40, 20] };
  const loc = borough.location;
  loc[0] = 0;
  // borough.location = [0,20]
  ```

  별칭의 값을 변경하면 원래 속성값에서도 변경되므로 별칭은 신중하게 사용해야 한다.

  <br/>

- 별칭을 만드는 대신에 객체 비구조화 문법을 활용하여 일관된 이름을 사용하도록 한다.
- 그러나 비구조화 문법을 활용해 생성한 별칭은 타입 체커뿐만 아니라 런타임에도 혼동을 줄 수 있다.
  ```tsx
  const { bbox } = polygon;
  if (!bbox) {
    calcBbox(polygon); // polygon.bbox가 채워지는 코드
  }
  ```
  위 코드에서 변수로 선언된 `bbox`는 falsy한 값(예를 들어 `undefined`)이라 치면, if문 내의 함수가 동작한 후에도 여전히 `undefined`이지만 `polygon.bbox`는 더이상 `undefined`가 아니게 된다. 즉, `ploygon.bbox`와 `bbox`는 다른 값을 참조하게 된다. 따라서 `ploygon.bbox`가 아닌 지역 변수 `bbox`를 뽑아내 사용하게 된다면 `bbox`의 타입은 정확히 유지되지만, 값은 같게 유지되지 않을 수 있다.
  이 요점은 비구조화로 인해 생성된 변수와 원래 객체의 속성이 서로 독립적이라는 사실을 명확히 인식해야 한다는 것이다. 이를 인지하지 못하면, 코드가 예상치 못한 방식으로 동작할 수 있다.
