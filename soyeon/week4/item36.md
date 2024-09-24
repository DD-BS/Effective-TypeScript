### Item36 - 해당 분야의 용어로 타입 이름 짓기

- 잘못 선택한 타입 이름은 코드의 의도를 왜곡하고 잘못된 개념을 심어준다.

  ```tsx
  interface Animal {
    name: string;
    endangered: boolean;
    habitat: string;
  }
  const leopard: Animal = {
    name: "Snow Leopard",
    endangered: false,
    habitat: "tundra",
  };
  ```

  - `name`은 매우 일반적인 용어다. 동물의 학명인지 구분할 수 없다.
  - `endangered`속성이 멸종위기를 표현하기 위한 속성인지, 이미 멸종된 동물인지 구분할 수 없다.
  - 서식지를 나타내는 `habitat`은 범위가 너무 넓은 `string`타입이다. 뿐만 아니라 서식지라는 뜻 자체도 불분명하다.
  - 객체의 변수명이 `leopard`이지만, name속성은 `Snow Leopard`이다. 이것이 다른 의도로 사용된 것인지 불분명하다.

- 수정된 코드 - 전문 분야 용어를 사용

  ```tsx
  interface Animal {
  	commonName: string;
  	genus: string;
  	species: string;
  	status: ConservationStatus;
  	climates: KoppenClimate[];

  }
  type ConservationStatus = 'EX'|'EW'|'CR'|'EN'|'VU'|'NT'|'LC';
  type KoppenClimate = 'Af'|'Am'|'As'|'Aw'|'BSh'|'Bsk'|'Bwk'| ...;

  const snowLeopard: Animal = {
  	commonName: 'Snow Leopard',
  	genus: 'Panthera',
  	species: 'Unica',
  	status: 'VU',
  	climates: ['Af','Am','As'];
  }
  ```

  - `name`은 `commonName`, `genus`, `species` 등 더 구체적인 용어로 대체했다.
  - `endangered`는 동물 보호 등급에 대한 분류 체계인 `ConservationStatus`타입의 status로 변경했다.
  - `habitat`은 기후를 뜻하는 `climates`로 변경되었으며, 쾨펜 기후 분류를 사용했다.

- 코드로 표현하고자 하는 모든 분야에 전문 용어를 사용함으로써 사용자와의 소통에 유리하며 타입의 명확성을 높일 수 있다.
- 전문 분야의 용어는 정확하게 사용한다. 그렇지 않다면 더 혼란을 줄 수 있다.

- 변수명 지을 때 명심할 것
  - 동일한 의미를 나타낼 때는 같은 용어를 사용한다. 특히 코드에서는 동의어(의미가 같지만 다른 단어) 사용은 좋지 않다.
  - `data`, `info`, `thing`, `item`, `object`, `entity`와 같이 모호하고 의미 없는 이름은 피한다. 만약 `entity`가 용어가 해당 분야에서 특별한 의미를 가진다면 괜찮다.
  - 이름을 지을 때는 포함된 내용이나 계산 방식이 아니라 데이터 자체가 무엇인지를 고려한다.
    - `INodeList`보다 `Directory`가 더 의미 있는 이름이다.
