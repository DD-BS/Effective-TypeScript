### Item40 - 함수 안으로 타입 단언문 감추기

- 프로젝트 전반에 위험한 타입 단언문이 드러나 있는 것보다, 제대로 타입이 정의된 함수 안으로 타입 단언문을 감추는 것이 더 좋은 설계다.
- 아래 코드는 객체가 같은지 체크하기 위해 객체를 순회하는 코드이다.

  ```tsx
  declare function shallowObjectEqual<T extends object>(a: T, b: T): boolean;

  function shallowObjectEqua<T extends object>l(a: any, b: any): boolean{
  	for(const [k, aVal] of Object.entries(a)) {
  		if(!(k in b) || aVal !== **b[k]**) { // 오류. '{}'형식에 인덱스 시그니처가 없으므로 요소에 암시적으로 any가 있습니다.
  			return false;
  		}
  	}
  	return Object.keys(a).length === Object.keys(b).length;
  }
  ```

  - 객체 매개변수 `a`와 `b`가 동일한 키를 가진다는 보장이 없기 때문에 구현할 때 주의한다.(아이템54)
  - `if`문에 있는 `k in b`체크로 `b`객체에 `k`속성이 있음을 확인했지만 `b[k]`부분에서 오류가 발생한다.
  - 이는 실제 오류가 아니라는 것을 알고 있기 때문에 `any`로 단언할 수 밖에 없다.

  ```tsx
  function shallowObjectEqua<T extends object>l(a: any, b: any): boolean{
  	for(const [k, aVal] of Object.entries(a)) {
  		if(!(k in b) || aVal !== (**b as any**)**[k]**) {
  			return false;
  		}
  	}
  	return Object.keys(a).length === Object.keys(b).length;
  }
  ```

  - `b as any` 타입 단언문은 안전하며(`k in b` 체크를 했으므로), 결국 정확한 타입으로 정의되고 제대로 구현된 함수가 된다.
  - 이처럼 단언문이 코드에 직접 들어가는 것보다, 앞의 코드처럼 별도의 함수로 분리하는 것이 훨씬 좋은 설계다.❓
