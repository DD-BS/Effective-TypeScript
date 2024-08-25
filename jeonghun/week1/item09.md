#타입선언과 타입단언
변수에 값을 할당하고 타입을 부여하는 두가지 방법이 존재함 
- interface, type, 제네릭은 타입선언
- as는 타입단언
`꼭 필요한 경우가 아니라면 타입 선언을 사용해야 함`
##### as 같은 타입 단언은 타입스크립트의 언어 서비스, 타입추론을 무시하고 해당 변수나 속성을 as뒤에 타입으로 간주라는것
##### 강제로 타입이 지정되며 타입체커에게 오류를 무시하라는 의미임

`const bob = <Person>{};은 {} as Person과 같은 타입단언 문법`

### 그럼 타입단언은 언제?
타입 체커가 추론한 타입보다 본인이 판단하는 타입이 더 정확할 때 사용<br/>
타입체커가 타입을 추론할 수 있도록 선언적으로 코드를 작성하는게 좋다


```ts
interface People {
  name: string;
}
const peopleNames = ["alice", "bob", "jan"];
const peopleList = peopleNames.map((name) => ({ name }));
```
타입추론을 보면 아래와 같음
```ts
const peopleList: {
    name: string;
}[];
```

리턴타입을 타입단언 할 경우
```ts
const peopleList = peopleNames.map((name) => ({ name } as People));
// const peopleList: People[]; //결과
```
오류가 없고 정상적으로 동작하는 것으로 보이지만 잉여속성체크를 하지 않고, 런타임에도 문제가 발생할 수 있음

```ts
const peopleList = peopleNames.map((name): People => ({ name }));
const peopleList2: People[] = peopleNames.map((name) => ({ name }));
```
![image](https://github.com/user-attachments/assets/844bf280-f47f-41d9-bfa6-51f9180aa358)
peopleList, peopleList2 모두 타입은 People[]이지만, 체이닝 기법을 이용해 코딩을 할 땐 첫 번째 방법이 더 좋음. 상황에 따라 판단


### 요약
- 타입 단언보다는 타입 선언을 사용해라
- 반환 타입을 명시하고 유효성 검사를 할 수 있게 해라
