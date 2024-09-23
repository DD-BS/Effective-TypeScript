### Item48 - API 주석에 TSDocs 사용하기

- 주석을 작성할 때는 JSDoc 스타일의 주석으로 만드는 것이 좋다.
- 함수에 붙어 있는 JSDoc스타일의 주석을 편집기에서 툴팁으로 표시해주기 때문이다

  ```tsx
  /**
   * 인사말을 생성합니다
   * @param name 인사할 사람의 이름
   * @param title 그 사람의 칭호
   * @returns 사람이 보기 좋은 형태의 인사말
   * */
  function greet(name: string, title: string) {
    return `Hello ${title} ${name}`;
  }
  ```

  ![image](https://github.com/user-attachments/assets/f3d83938-a1c6-40df-9db9-05c1c2dcaab1)

<br/>

- 타입 정의에 TSDoc을 사용할 수도 있다.

  ```tsx
  /**
   * 이 인터페이스는 **세 가지 속성**을 가집니다.
   * 1. x
   * 2. y
   * 3. z
   */
  interface Vector3D {
    x: number;
    y: number;
    z: number;
  }

  /** 특정 시간과 장소에서 수행된 측정 */
  interface Measurement {
    /** 어디에서 측정? */
    position: Vector3D;
    /** 언제 측정? 초 단위로 */
    time: number;
    /** 츠정된 운동량 */
    momentum: Vector3D;
  }
  ```

- 굵은 글씨, 기울임, 글머리기호 목록 등을 사용할 수 있다.
- 주석을 장황하게 쓰지 않도록 주의한다.
