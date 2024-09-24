# 공개 API에 등장하는 모든 타입을 export 하기

라이브러리 제작자는 프로젝트 초기에 타입 익스포트부터 작성해야 함

타입을 익스포트하지 않았을 경우

```ts
// 해당 라이브러리 사용자는 SecretName 또는 SecretSanta 를 직접 임포트할 수 없고, getGift만 임포트할 수 있음
interface SecretName {
  first: string;
  last: string;
}

interface SecretSanta {
  name: SecretName;
  gift: string;
}

export function getGift(name: SecretName, gift: string): SecretSanta {
  // ...
  return { name: { first: "", last: "" }, gift: "" };
}

type MySanta = ReturnType<typeof getGift>; // SecretSanta
type MyName = Parameters<typeof getGift>[0]; // SecretName
```

Parameters와 ReturnType을 이용해 추출

```ts
type MySanta = ReturnType<typeof getGift>; // SecretSanta
type MyName = Parameters<typeof getGift>[0]; // SecretName
```

### 요약

- 어짜피 공개 API에 사용된 타입은 오픈되니 그냥 export 시켜라
