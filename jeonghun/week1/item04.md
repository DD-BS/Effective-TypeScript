# 구조적 타이핑
- 자바스크립트는 덕 타이핑 기반이다.
- 어떤 함수의 매개변수 값이 모두 제대로 주어진다면, 그 값이 어떻게 만들어졌는지 신경 쓰지 않는다.
- 이전에 정리한 내용 참고 : [링크](https://github.com/lionleeee/typescript-TIL/blob/main/24073002_Structural-Typing.md)

```ts
interface Vector2D {
  x: number
  y: number
}
//3.NamedVector가 Vector2D를 이루고 있는 속성을 모두 가지고 있기에 정상 작동
function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}
interface NamedVector {
  name: string
  x: number
  y: number
}
//1.NamedVector 인터페이스를 사용해서 v를 생성
const v: NamedVector = { x: 3, y: 4, name: 'Zee' }

//2.Vector2D를 매개변수로 받는 함수 호출
calculateLength(v) // OK, result is 5

export default {}

```

#### `NamedVector의 구조가 Vector2D와 호환 되기 때문에 사용이 가능`


아래 코드를 보자 
```ts
interface Vector2D {
  x: number
  y: number
}
function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}
interface NamedVector {
  name: string
  x: number
  y: number
}
interface Vector3D {
  x: number
  y: number
  z: number
}


function calculateLengthL1(v: Vector3D) {
  let length = 0
//1. axis는 y,x,z중에 하나
  for (const axis of Object.keys(v)) {
//2. x,y,z는 모두 number이므로 coord는 number가 와야함
    const coord = v[axis]
    // ~~~~~~~ 'string`'은 Vector3D 타입으 ㅣ인덱스로 사용할 수 없기에
    //         엘리먼트는 암시적으로 any 타입입니다.
    length += Math.abs(coord)
  }
  return length
}

export default {}
```

1. 여기서 Vector3D는 다른 속성이 없다는 것을 가정했다
2. 하지만 다음과 같이 작성을 할 수도 있다
```ts
const vec3D = { x: 3, y: 4, z: 1, address: '123 Broadway' }
calculateLengthL1(vec3D) // OK, returns NaN

```
`v는 어떤 속성이든 가질 수 있기 때문에 axis의 타입은 string이 될 수도 있다.`<br/>
구조적 타이핑 상으로 모든 속성을 가지고 있으면 사용이 가능하다.<br/>
`즉 이말은, x,y,z만 가지고 있으면 Vector3D에 대한 타입 체크는 통과한다`<br/>
Vector3D가 가지고 있지 않은 속성을 가지고 있으면? 타입 체크는 통과하고 루프를 돌 때 오류가 발생한다.<br/>
#### 그렇기에 타입스크립트는 여기에 뭐가 더 올 수도 있으니까~ 라고 가정하고 오류를 발생시킨다

이런 경우 loop보다는 각각 더하는 구현이 더 낫다
```ts
interface Vector3D {
  x: number
  y: number
  z: number
}
function calculateLengthL1(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z)
}

export default {}
```


#### 구조적 타이핑은 클래스에서도 비슷한 결과를 낸다
```ts
class C {
  foo: string
  constructor(foo: string) {
    this.foo = foo
  }
}


const c = new C('instance of C') // 값으로 사용
console.log(c instanceof C) //true

const d: C = { foo: 'object literal' } // OK, 타입으로 사용
console.log(d instanceof C) //false

//----------------------
class C {
  foo: string
  constructor(foo: string) {
    this.foo = foo
  }
method() {}
}
const d: C = { foo: 'object literal' } // error. 'method' 속성이 '{ foo: string; }' 형식에 없지만 'C' 형식에서 필수입니다.
const e: C = { foo: '', method() {} } // foo, method 속성이 모두 있으면 okay.
export default {}
```
d는 우리가 볼때 C 인스턴스가 아닌데, OK를 낸다. 즉, 이 말은 위에서 구현될 꺼 같은 인스턴스와 형태만 같으면 같다고 추정을 해버린다는 것이다<br/>
우리가 볼 때 d는 C 인스턴스가 아닌거 같은데...타입스크립트는 알빠노 하고 OK를 해버린다<br/>
구조적으로는 필요한 속성과 생성자가 존재하기에 문제는 없다.<br/>
하지만, 클래스에 메소드가 있으면 `생성자를 실행하지 않으르모 문제가 발생`



### 테스트에 유리하다
- 타입스크립트는 테스트 DB가 해당 인터페이스에 충족하는지 확인 함
- 테스크 코드는 실제 환경의 DB정보가 불필요함
- 추상화를 함으로써 로직과 테스트를 특정한 구현(PostgresDB)에서 분리
```ts
interface PostgresDB {
  runQuery: (sql: string) => any[]
}
interface Author {
  first: string
  last: string
}

// DB는 PostgresDB 구현체를 추상화
interface DB {
  runQuery: (sql: string) => any[]
}

//1.원래라면 PostgresDB 인터페이스를 사용해야 하지만 DB(추상화)를 이용해서 간략하게 사용이 가능하다
function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`)
  return authorRows.map(row => ({ first: row[0], last: row[1] }))
}
test('getAuthors', () => {
  const authors = getAuthors({
    runQuery(sql: string) {
      return [
        ['Toni', 'Morrison'],
        ['Maya', 'Angelou'],
      ]
    },
  })
  expect(authors).toEqual([
    { first: 'Toni', last: 'Morrison' },
    { first: 'Maya', last: 'Angelou' },
  ])
})

export default {}
```



### 요약
- 자바스크립트가 덕 타이핑 기반이기에 구조적 타이핑을 이해해야 함
- 클래스 역시 구조적 타이핑 규칙을 따름
- 구조적 타이핑을 사용하면 유닛 테스팅을 쉽게 할 수 있다
  
