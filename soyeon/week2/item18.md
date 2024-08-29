### Item18 - 매핑된 타입을 사용하여 값을 동기화하기

- UI를 그리는 컴포넌트가 있을 때 매번 렌더링하며 UI를 다시 그릴 필요 없는 경우가 있다. 그런 경우를 위해 최적화를 해보자

  - 첫 번째 방법은 새로운 속성이 추가되는 경우에만 차트를 다시 그리는 것이다. 이를 **‘보수적 접근법’** 또는 **‘실패에 닫힌 접근법’** 이라고 한다

  ```tsx
  interface ScatterProps: {
  	xs: number[];
  	ys: number[];
  	xRange: [number, number];
  	yRange: [number, number];
  	onClick: (x:number, y:number, index:number) => void;
  }

  function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  	let k: keyof ScatterProps
  	for(k in oldProps) {
  		if(oldProps[k] !== newProps[k]) {
  			if(k !== 'onClick') return true;
  		}
  	}
  	return false;
  }
  ```

  `shouldUpdate`함수는 `onClick`을 제외한 모든 프로퍼티 값들을 비교해서 같지 않으면 업데이트를 하고, 같다면 업데이트를 진행하지 않는다. 이 방식을 이용하면 차트가 정확하지만 너무 자주 그려질 가능성이 있다.

  - 두 번째 방법은 **‘실패에 열린’** 접근법을 사용한다.

  ```tsx
  function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
    return (
      oldProps.xs !== newProps.xs ||
      oldProps.ys !== newProps.ys ||
      oldProps.xRange !== newProps.xRange ||
      oldProps.yRange !== newProps.yRange ||
      oldProps.color !== newProps.color
    );
  }
  ```

  `onClick`을 제외한 나머지 프로퍼티들을 비교하고, 논리 연산자를 사용해 하나라도 변경되었다면 업데이트를 한다. 이는 불필요하게 다시 그리는 단점을 해결했지만, 실제로 차트를 다시 그려야 할 경우에 누락되는 일이 생길 수 있다.

  - 앞선 두 가지 최적화 방법 모두 이상적이지 않다. 새로운 속성이 추가될 때 타입 체커가 동작하도록 코드를 개선해보자

  ```tsx
  const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false,
  };

  function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
    let k: keyof ScatterProps;
    for (k in oldProps) {
      if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
        return true;
      }
    }
    return false;
  }
  ```

  핵심은 매핑된 타입과 객체를 사용하는 것이다. `[k in keyof ScattersProps]`은 타입 체커에게 `REQUIRES_UPDATE`가 `ScatterProps`와 동일한 속성을 가져야 한다는 정보를 제공하여 속성을 추가/삭제/이름을 변경한 경우에 오류를 정확히 잡아낸다.

<br/>

- 매핑된 타입은 한 객체가 또 다른 객체와 정확히 같은 속성을 가지게 할 때 이상적이다.
- 매핑된 타입을 사용해 타입스크립트가 코드에 제약을 강제하도록 할 수 있다.
