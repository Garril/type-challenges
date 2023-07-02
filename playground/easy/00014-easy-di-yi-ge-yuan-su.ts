/*
  14 - 第一个元素
  -------
  by Anthony Fu (@antfu) #简单 #array

  ### 题目

  实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

  例如：

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // 应推导出 'a'
  type head2 = First<arr2> // 应推导出 3
  ```

  > 在 Github 上查看：https://tsch.js.org/14/zh-CN
*/

/* _____________ 你的代码 _____________ */
/* extends限制为一个数组
  [infer F, ...infer _] 表示将数组类型 T 分解为首元素 F 和剩余元素（使用 _ 表示命名不重要）。
  F 表示首元素的类型。
  never 表示条件不满足时返回的类型。
 */
type First<T extends any[]> = T extends [infer F, ...infer _] ? F : never
/* 其他方法
// 利用isEmpty判断数组是否为空
法一：  Array.isEmpty(arr) ? undefined : arr[0];
=》   type First<T extends any[]> = T['length'] extends 0 ? never : T[0];

// 或者利用length判断数组是否为空
法二：  arr.length === 0 ? undefined : arr[0];
=》   type First<T extends any[]> = T extends [] ? never : T[0];
*/

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/14/answer/zh-CN
  > 查看解答：https://tsch.js.org/14/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
