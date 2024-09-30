# 타입 커버리지를 추적하여 타입 안정성 유지

- noImplicitAny가 설정 되어 있어도, 명시적 any 또는 서드파티(@types) 타입 선언을 통해 any가 존재 할 수 있다

npm의 type-cover-age 패키지를 사용하면 얼마나 any가 사용되는지 확인 할 수 있다

```cmd
npx type-coverage
// 9958 / 10117 98.69%
// any를 사용 할 수록 백분율이 떨어진다

npx type-coverage --detail
//any를 사용한 파일을 볼 수 있다
```

### 요약

- 타입이 얼마나 잘 선언되었는지 추적해야한다.
- 추적함으로써 any의 사용을 줄여 나갈 수 있고 타입 안정성을 높일 수 있다
