## 타입이 값들의 집합이라고 생각하기
타입스크립트가 오류를 체크하는 순간에는 `타입`을 가지고 있음.<br/>
`할당 가능한 값들의 집합`이 타입. 즉, 집합은 타입의 범위
ex) 모든 숫자값의 집합은 number.

가장 작은 집합은 아무 값도 포함하지 않은 공집합이며 이는 `never`타입.

그 다음으로 작은 집합은 `한 가지 값만 포함하는 타입` 유닛 타입이라고 불리는 리터럴
```ts
type A ='A`;
type twelve = 12;
```

여러 개로 묶으면 유니온 타입
```ts
type AB =A` |'B';
type AB12 ='a'|'b'| 12;
```
유니온 타입은 값 집합들의 `합집합`

`tip : const로 선언한 값은 변경이 불가능해서 그대로 타입으로 적용됨`

### & 연산자
![image](https://github.com/user-attachments/assets/9ad6ad91-267f-423b-9100-f6fb592babb5)
<br/>
두 타입의 교집합을 계산하는 연산자<br/>
허나 person과 lifespan은 공통으로 가지는 속성이 없기 때문에 공집합(never 타입)으로 예상 할 수 있으나
<br/>
타입 연산자는 `인터페이스의 속성이 아닌, 값의 집합에 적용됨`
추가적으로 속성이 가지는 값도 여전히 그 타입에 속함 그래서 person과 lifespan을 둘 다 가지는 값은 인터섹션 타입에 속하게 됨
????



### 서브타입
```ts
interface Vector1D {x:number}
interface Vector2D extends Vecotr1D {x:number}
```
어떤 집합이 다른 집합의 부분집합이라는 의미
Vector2D는 Vector1D의 서브타입



### 요약
- 타입을 값의 집합이라고 생각하기


## 추후 다시 학습하고 정리
