# 모르는 타입의 값에는 nay대신 unknow을 사용

unknown은 any 대신 사용할 수 있는 안전한 타입이다. `어떠한 값이 있지만 그 타입을 알지 못하는 경우`라면 unknown을 사용함으로써 타입 단언문이나 타입 체크를 사용하도록 강제할 수 있게 된다. (any일때는 타입체크가 안걸릴것이다.)

unknown과 반대되는 타입으로 `never`가 있음.
never 타입은 어떤 타입도 할당 할 수 없음

- unknown 타입은 그대로 값을 사용할 수 없기 때문에 타입 단언을 사용해야한다.

```ts
const parseYamL = (text: string): any => ({});

const book = parseYamL(`name: Jane 
                        author: Char`);
// book이 any가 되므로 아래 코드는 어떠한 타입에러도 나지 않고 런타임에서 에러가 발생
console.log(book.title);
book();

const safetyParseYamL = (text: string): unknown => ({});

const book2 = safetyParseYamL(`name: Jane 
                                author: Char`);
// 객체 타입이 'unknown'입니다
console.log(book2.title);
// 객체 타입이 'unknown'입니다
book2();

//unknown타입은 아래와 같이 타입 단언을 해야함
const book3 = safetyParseYamL(`name: Jane 
                                author: Char`) as Book;

//Book에 Title 속성이 없습니다.
console.log(book3.title);
```

### 요약

- 사용자가 타입 단언이나 타입 체크를 사용하도록 강제하려면 unknown을 사용해라
- `unknown은 모든 타입의 상위`이고 반대로 `never는 모든 타입의 하위 타입`이다. 이 말인 즉 `unknown 타입은 모든 타입이 될 수 있으며 모든 타입은 unknown이 될 수 없다`. 반대로 `never 타입은 모든 타입이 될 수 없고 모든 타입은 never가 될 수 있다.`

### 추가정리

1. {} (Empty Object Type)

- 기본적으로 null과 undefined를 제외한 모든 값을 허용함. 숫자, 문자열, 배열, 객체, 함수 등.
-     빈 객체가 아니라, “빈 타입”으로 해석되기 때문에 모든 속성을 가질 수 있는 타입.

2. object (Object Type)

- object는 객체만을 나타내는 타입. 즉, null, undefined, number, string, boolean 등 원시 타입은 허용되지 않고, 객체 리터럴, 배열, 함수 같은 객체 타입만 허용

3. unknown

- unknown은 타입을 알 수 없거나 미리 정의할 수 없는 경우에 사용하는 타입
- 어떤 타입이든 할당 가능하지만, 사용하려면 타입을 좁히는 타입 가드가 필요
