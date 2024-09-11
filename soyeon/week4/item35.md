### Item35 - 데이터가 아닌, API와 명세를 보고 타입 만들기

- 명세를 참고해 타입을 생성하면 타입스크립트는 사용자가 실수를 줄일 수 있도록 도와준다.
- 반면에 예시 데이터를 참고해 타입을 생성하면 눈 앞에 있는 데이터들만 고려하게 되므로 예기치 않은 곳에서 오류가 발생할 수 있다.
- 특히 API 명세로부터 타입을 생성할 수 있다면 그렇게 하는 것이 좋다.
- GraphQL API는 타입스크립트와 비슷한 타입 시스템을 사용하여, 가능한 모든 쿼리와 인터페이스를 명세하는 스키마로 이루어진다.

  ```graphql
  query {
  	repository(owner: "Microsoft", name: "TS") {
  		createdAt
  		description
  	}
  }

  # 결과
  {
  	"data": {
  		"repository": {
  			"createdAt": "2024-09-10T11:11:39Z",
  			"description": "TS is a superset of JS"
  		}
  	}
  }

  # 오픈소스 라이선스를 조회하는 쿼리
  query getLicense($owner:String!, $name:String!) {
  	repository(owner:$owner, name:$name) {
  		description
  		licenseInfo {
  			spdxId
  			name
  		}
  	}
  }
  ```

  타입스크립트의 문법과 비슷하다는 것을 확인할 수 있다.

  <br/>

- GraphQL 쿼리를 타입스크립트로 변환해주는 도구들이 있는데 그 중 하나는 `Apollo`이다.
- 쿼리에서 타입을 생성하려면 GraphQL 스키마가 필요하다. 이를 통해 쿼리 매개변수와 응답 모두 인터페이스가 생성되며, 편집기에서 확인할 수 있도록 주석은 JSDoc으로 변환된다.
- 만약 명세 정보나 공식 스키마가 없다면 데이터로부터 타입을 생성해야 한다. 이를 위해서는 `quicktype`과 같은 도구를 사용할 수 있으나 생성된 타입이 실제 데이터와 일치하지 않을 수도 있다.
