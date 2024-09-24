### Item43 - 몽키 패치보다는 안전한 타입을 사용하기

- 자바스크립트는 객체와 클래스에 임의의 속성을 추가할 수 있을 만큼 유연하다.
- DOM엘리먼트에 데이터를 추가하거나 내장 기능의 프로토타입에도 속성을 추가할 수도 있다.
- 그러나 전역 변수를 사용해 임의의 속성을 추가하는 것은 사이드 이펙트를 발생시킬 수 있으므로 좋은 설계가 아니다.
- 여기에 타입스크립트까지 더해지면 또 다른 문제가 발생한다.
  ```tsx
  document.monkey = "Tamarin"; // 오류. 'Documnet' 유형에 'monkey' 속성이 없음
  ```
  - 이를 해결하기 위해서는 any 단언문을 사용할 수 있다.
  ```tsx
  (document as any).monkey = "Tamarin"; // 정상
  ```
  - 타입 체커는 통과하지만, `any`를 사용함으로써 타입 안정성 상실. 언어 서비스 사용 불가능
- 만약 document 또는 DOM으로부터 데이터를 분리할 수 없다면 차선책 2가지가 있다.

  1. `interface`의 특수 기능 중 하나인 보강(argumentation)을 사용하기

     ```tsx
     interface Document {
       monkey: string;
     }

     document.monkey; // 정상
     ```

     - 타입이 더 안전하다. 타입 체커는 오타나 잘못된 타입의 할당을 오류로 표시한다.
     - 속성에 주석을 붙일 수 있다.
     - 속성에 자동완성을 사용할 수 있다.
     - 몽키패치가 어떤 부분에 적용되었는지 정확한 기록이 남는다.

     ```tsx
     export {};
     declare global {
       interface Document {
         monkey: string;
       }
     }
     document.monkey = "Tamarin"; // 정상
     ```

     - 모듈의 관점에서 제대로 동작하게 하려면 위와 같이 `global` 선언을 추가해야 한다.
     - 보강을 사용할 때 주의해야 할 점은 모듈 영역(scope)이다.
     - 보강은 전역적으로 적용되기 때문에 코드의 다른 부분이나 라이브러리로부터 분리할 수 없다.
     - 애플리케이션이 실행되는 동안 속성을 할당하면 실행 시점에서 보강을 적용할 방법이 없다.
     - 엘리먼트 조작 시, 어떤 엘리먼트는 속성이 있고 어떤 엘리먼트는 속성이 없을 수 있다.
     - 따라서 `string | undefined`로 선언할 수 있다.
     - 더 정확해지지만 다루기에는 더 불편해진다.

  2. 더 구체적인 타입 단언문을 사용

     ```tsx
     interface MonkeyDocument extends Document {
       monkey: string;
     }

     (document as MonkeyDocument).monkey = "Macaque"; // 정상
     ```

     - `MonkeyDocument`는 `Document`를 확장하기 때문에 타입 단언문은 정상이며 할당문의 타입은 안전하다.
     - `Document`타입을 건드리지 않고 별도로 확장하는 새로운 타입을 도입했기 때문에 모듈 영역 문제도 해결할 수 있다.
