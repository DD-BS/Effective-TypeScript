# 다른 타입에는 다른 변수 사용하기

- ts에서는 하나의 변수에 다른 타입을 사용 할 수 없다
- 이 말은 처음 number로 타입을 지정하면 number만 넣을 수 있다

```ts
let v = 10;

//오류 발생
v = "string";
```

하지만, 유니온 타입의 경우에는 여러 타입을 넣을 수 있다

```ts
declare function fetchProduct(id: string): void;
declare function fetchProductBySerialNumber(id: number): void;

let id: string | number = "123456";
fetchProduct(id);

id = 123456;
fetchProductBySerialNumber(id);
```

### - 요약

- 변수는 바뀔 수 있지만, 타입은 바뀌지 않는다
- 타입이 다른 값을 다룰 때에는 각각의 다른 타입의 변수를 사용하는 것이 좋다
