/*
  11 - 元组转换为对象
  -------
  by sinoon (@sinoon) #简单 #object-keys

  ### 题目

  将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

  例如：

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > 在 Github 上查看：https://tsch.js.org/11/zh-CN
*/

/* _____________ 你的代码 _____________ */
/* T[number] 表示通过索引访问类型 T 的元素。它的类型为 T 数组中的元素类型的联合类型。
例如:
  对于 ['a', 'b', 'c'] 这样的数组，T[number] 的类型会是 'a' | 'b' | 'c' */
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [t in T[number]]: t
}
/* 等价于：
  直接用ts内置的类型PropertyKey, 类型定义是declare type PropertyKey = string | number | symbol;
  type TupleToObject<T extends readonly PropertyKey[]> = {
    [K in T[number]]: K
  }
  keyof操作符是用于提取后面对象键的操作，那么keyof any，
  意思就是提取一个any类型的对象键，但是对象键只可能是 string number symbol，
  所以即使对于any，也就是任何类型进行keyof提取对象键，
  只可能出现这三种类型:
      let a: any;
      a['a'] //ok
      a[0] // ok
      a[Symbol()] //ok
      a[{}] // error
*/

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const tupleMix = [1, '2', 3, '4'] as const

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: 'tesla'
        'model 3': 'model 3'
        'model X': 'model X'
        'model Y': 'model Y'
      }
    >
  >,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<
    Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4' }>
  >
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/11/answer/zh-CN
  > 查看解答：https://tsch.js.org/11/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
