1. tsconf.json을 통해 ts 설정을 할 수 있다
- tsc --init을 하면 생성된다


2. `noImplicitAny는 켜는게 좋다(any 사용 못하게 함)`
- any는 유용하지만 많이 사용하면 타입스크립트를 사용하는 의미가 없다
- 타입을 명시하지 않으면 기본이 any 타입이다. 타입을 명시하자


3. `strictNullChecks도 켜는게 좋다(null, undefined 허용하는지 체크)`
```ts
const x : number = null
// 키게 되면 이게 오류로 잡힘
// null 형식은 number 형식에 할당 할 수 없습니다
// 아래와 같이 유니온 타입으로 사용해야 함
const x: nulber | null = null;
```

`type narrowing을 통해 타입을 좁혀라`
```ts
const el = document.getElementById('status')
el.textContent = 'Ready'
// ~~ Object is possibly 'null'

//
if (el) {
  el.textContent = 'Ready' // OK, null has been excluded
}
el!.textContent = 'Ready' // OK, we've asserted that el is non-null

export default {}
```

### `타입 스크립트는 타입 정보를 가질 때 가장 효과적이므로 모든 변수에 타입을 명시하자`


### 요약
- tsconf를 통해서 설정을 할 수 있다(cli 보다 tsconf.json으로 설정하는게 좋다)
- noImplicitAny를 켜라 -> any를 사용하면 타입스크립트를 사용하는 의미가 없다
- strictNullChecks를 켜서 엄격한 타입 체크를 해라
