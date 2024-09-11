# 해당 분야의 용어로 타입 이름 짓기

> 이름 짓기 역시 타입 설계에서 중요한 부분

- 잘못 선택한 타입 이름은 코드의 의도를 왜곡하고 잘못된 개념을 심어주게 된다

```ts
interface Animal {
  name: string; //1. name은 일반적인용어로 동물의 학명인지 일반적인 명칭인이 알 수 없다
  endangered: boolean; //2. 멸종위기를 표한하기 위해 boolean인게 이상하다. 이미 멸종된 것은 true인가?
  habitat: string; //3. 서식지를 나타내는 habitat 속성은 너무 범위가 넓고 뜻 자체도 불분명하다
}

//4. 변수명이 leopard이지만 속성 이름은Snow Leopard이다. 객체의 이름과 속성의 name이 다른 의오로 사용된 것인지 모르겠다
const leopard: Animal = {
  name: "Snow Leopard",
  endangered: false,
  habitat: "tundra",
};



//------------------
//개선된 코드
interface Animal {
  commonName: string
  genus: string
  species: string
  status: ConservationStatus
  climates: KoppenClimate[]
}
type ConservationStatus = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC'
type KoppenClimate =
  | 'Af'
  | 'Am'
  | 'As'
  | 'Aw'
  | 'BSh'
	...
const snowLeopard: Animal = {
  commonName: 'Snow Leopard',
  genus: 'Panthera',
  species: 'Uncia',
  status: 'VU', // 취약종 (vulnerable)
  climates: ['ET', 'EF', 'Dfd'], // 고산대(alpine) or 아고산대(subalpine)
}

```

`자체적으로 용어를 만들어 내려고 하지말고, 해당 분야에 이미 존재하는 용어를 사용해야한다.`

⇒ 사용자와 소통에 유리하며 타입의 명확성을 올릴 수 있다.
⇒ 전문분야의 용어는 정확하게 사용해야한다.

1. 동일한 의미를 나타낼 때는 같은 용어를 사용
   정말로 의미적으로 구분이 되어야하는 경우에만 다른 용어를 사용해야한다.

2. 같은 의미에 다른 이름을 붙이면 안된다. 특별한 의미가 있을 때만 용어를 구분해라
