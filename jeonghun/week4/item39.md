# any를 구체적으로 변형해서 사용하기

any는 모든 값을 아우르는 매우 큰 범위의 타입<br/>
반대로 말하면, 일반적으로 any보다 더 구체적으로 표현할 수 있는 타입이 존재 할 확률이 높다. 그렇기에 구체적인 타입을 찾아 타입의 안정성을 높이는게 좋다

```ts
function getlengthBad(array: any) {
  return array.length;
} // 이렇게 하지 맙시다.

// 함수가 호출될 때 매개변수가 배열인지 체크됩니다.
function getLength(array: any[]) {
  // 함수 내의 array.length 타입이 체크됩니다.
  return array.length; // 함수의 반환 타입이 any 대신 number로 추론됩니다.
}

getlengthBad(/123/); // 에러를 찾지 못함 undefined를 반환
getLength(/123/); // 배열이 아님을 찾아냄
```

#### 배열의 배열 형태라면 any[][]로 선언하면 된다.

함수의 매개변수가 객체이긴 하나 값을 알 수 없다면 {[key: string]: any} 처럼 선언

````ts
function hasTwelveLetterKey(o: { [key:string] :any } ) {
    for (const key in o) {
        if(key.length === 12) {
            return true
        }
    }
    return false
}

function hasTwelveLetterKey2(o: object) {
    for (const key in o) {
        if(key.length === 12) {
            console.log(key, o[key]);
						// '{}' 형식에 인덱스 시그니처가 없으므로 요소에 암시적(implicitly)으로 'any' 형식이 있습니다.
            return true;
        }
    }
    return false;
}```
````

타입을 object로 하는 경우 객체의 키를 열거할 수 있지만 속성에 접근할 수 없다는 점에서 다르다.<br/> 객체지만 속성에 접근할 수 없어야 한다면 unknown 타입이 필요한 상황일 수 있음.

### 요약

- any를 사용할 때는 정말로 모든 값이 허용 되어야만 하는지 면밀히 검토해야 합니다.
- any를 사용하더라도 구체적으로 모델링 할 수 있또록 any[] 등 구체적인 형태를 사용해야 한다.
