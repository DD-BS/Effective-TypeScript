심벌(symbol)은 타입 공간이나 값 공간 중의 한 곳에 존재


1. interface
인터페이스는 런타임에는 사라짐. 타입으로만 존재함
```ts
interface Cylinder { 
    radius: number;
    height: number;
};
const Cylinder = (radius: number, height: number) => ({radius, height});
```
`interface Cylinder`는 타입으로 쓰이고, `const Cylinder` 값으로 쓰이며 둘은 아무 관련이 없음

```ts
function calculateVolume(shape: unknown) {
    if (shape instanceof Cylinder) {
        // shape.radius     // 에러
    }
}
```
`shape instaceof Cylinder`가 `const Cylinder`를 가리키고있어 에러가 발생합니다. `instanceof는 런타임 연산자`이고, 값에 대해서 연산을 함



2. enum과 class
   class, enum은 상황에 따라 타입과 값 두 가지 모두 가능한 예약어
```ts
class Cylinder {
  radius = 1;
  height = 1;
}
function calculateVolume(shape: unknown) {
  if (shape instanceof Cylinder) {
    console.log(shape);
    console.log(shape.radius);
    console.log(shape.height);
  }
}
calculateVolume(new Cylinder());
```
if문 안의 코드가 실행됨.<br/>
클래스가 타입으로 쓰일 때는 형태(속성과 메서드)가 사용되고, 값으로 쓰일 때는 생성자가 사용됨


