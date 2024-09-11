# 타입 주변에 null값 배치하기

```ts
interface UserInfo {
  name: string;
}
interface Post {
  post: string;
}
declare function fetchUser(userId: string): Promise<UserInfo>;
declare function fetchPostsForUser(userId: string): Promise<Post[]>;
class UserPosts {
  user: UserInfo | null;
  posts: Post[] | null;

  constructor() {
    this.user = null;
    this.posts = null;
  }

  async init(userId: string) {
    return Promise.all([
      async () => (this.user = await fetchUser(userId)),
      async () => (this.posts = await fetchPostsForUser(userId)),
    ]);
  }

  getUserName() {
    // ...?
  }
}
```

- 위 코드는 user와 null로 초기화가 되어있음
- Promise.all이 도는 동안 둘 다 null이거나, 둘 다 null이 아니거나 둘 중 하나만 null인 4가지 상태가 된다.

```ts
class UserPosts {
  user: UserInfo;
  posts: Post[];

  constructor(user: UserInfo, posts: Post[]) {
    this.user = user;
    this.posts = posts;
  }

  static async init(userId: string): Promise<UserPosts> {
    const [user, posts] = await Promise.all([
      fetchUser(userId),
      fetchPostsForUser(userId),
    ]);
    return new UserPosts(user, posts);
  }

  getUserName() {
    return this.user.name;
  }
}
```

- 위와 같이 개선을 하게되면 user, posts가 초기화 된 후 반환된다.
- 위와 같이 작성하면 null로 초기화를 해 줄 필요가 없다
  > 클래스를 만들 때 필요한 모든 값이 준비가 끝나고 생성하면 null이 존재하지 않아도 된다

`하지만 부분적으로 준비가 됐을 때 객체가 생성되어야 한다면 null, null이 아닌 상태를 다뤄야 한다`

### 요약

- null값 잘 걸러주고, undefined를 포함하지 마라
- 비동기 함수를 사용하는 경우 null을 허용하되 반환할 때는 null 값이 아니게 반환하라
- null 값인 변수와 아닌 변수가 섞이게 하지마라
- 한 값의 null 여부가 다른 값의 null 여부에 암시적으로 관련되록 설계하면 안된다
  - 두 값이 서로 독립적으로 null 여부를 가질 수 있도록 설계해야 한다
