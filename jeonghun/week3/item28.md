# 유효한 상태만 표현하는 타입을 지향하기

## 유효한 상태와 무효한 상태를 같이 처리하는 타입

- 다음은 페이지 로딩에 대한 타입임

```ts
// (1)
type State = {
  pageText: string;
  isLoading: boolean;
  error: string;
};

function renderPage(state: State) {
  if (state.error) {
    return `error`;
  } else if (state.isLoading) {
    return `loading`;
  }
  return `done`;
}
/*
- 위 코드는 분기 조건이 명확히 분리되어 있지 않다.
- loading이 true이고 동시에 error값이 존해하면 로딩인지 오류인지 구분이 불가능하다
*/

const changePage = async (state: State, newPage: string) => {
  state.isLoading = true;

  try {
    const response = await fetch(newPage);

    if (!response.ok) {
      throw new Error("failed fetch");
    }

    const text = await response.text();
    state.pageText = text;
  } catch (error) {
    state.error = "" + error;
  } finally {
    state.isLoading = false;
  }
};
/*
- 위 코드는 error가 발생한 이후 로딩을 false로 설정하는 로직이 빠져있음
- state.error를 초기화하지 않았기에, 페이지 전환 중에 로딩 메시지 대신 과거의 오류 메시지를 보여주게 됨
- 문제는 상태 값의 두 가지 속성이 동시에 정보가 부족하거나, 충돌이 발생하여 무효한 상태를 허용하게 됨
  - 둘 다 true이거나 둘다 false일 때
*/
```

## 유효한 상태와 무효한 상태를 나눠서 처리

- 유니온을 사용하면 상태에 맞는 값을 명시적으로 가질 수 있음
- 아래 예시는 로딩이나 에러, 성공의 값을 가질 수 있는 반면 태그된 유니온을 사용하여 값을 명확히 나눌 수 있음
- 코드는 길어졌지만 모든 요청의 상태를 명시적으로 모델링하였음

```ts
ype RequestPending = {
  state: "pending";
};
type RequestSuccess = {
  state: "success";
  pageText: string;
};
type RequestFailure = {
  state: "failure";
  error: string;
};
type RequestState = RequestPending | RequestSuccess | RequestFailure;
type State = {
  currentPage: string;
  request: { [page: string]: RequestState };
};

const chagePage = async (state: State, newPage: string) => {
  state.currentPage = newPage;
  state.request[newPage] = { state: "pending" };

  try {
    const response = await fetch(newPage);

    if (!response.ok) {
      throw new Error("failed fetch");
    }

    const pageText = await response.text();
    state.request[newPage] = { state: "success", pageText };
  } catch (error) {
    state.request[newPage] = { state: "failure", error: "" + error };
  }
};
```

### 요약

- 하나의 상태에 유효한 상태와 무효한 상태를 둘 다 표현하는 타입은 피해라
- 유효한 상태와 무효한 상태를 분리하자 ( 코드가 길어지더도 월씬 명확해진다)
