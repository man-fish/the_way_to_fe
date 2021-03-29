# IsUnion

```
type IsUnionImpl<T, C extends T = T> = (T extends T ? C extends T ? true : unknown : never) extends true ? false : true;
type IsUnion<T> = IsUnionImpl<T>;
```

### Why does it work?

`type Distributive<T> = T extends T ? ConditionTrue<T> : never;` takes advantage of [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) to evaluate `ConditionTrue` separately for each value in a union type `T`. For example, `Distributive<string|number>` is evaluated as `ConditionTrue<string> | ConditionTrue<number>`. This works as `T extends MATCH ? ... : never` with any type `MATCH` for which the condition will always evaluate to true, such as `any` or `unknown`.

Let's re-write the solution with more details.

```
type DoubleDistribute<T, TRUE, FALSE, C = T> = T extends T ? C extends T ? TRUE : FALSE : never;
type IsUnionDetailed<T> = DoubleDistribute<T, true, unknown> extends true ? false : true;
```

`DoubleDistribute` has two distributive conditions: one for `T` and one for `C`, a copy of `T`. This effectively creates a nested loop where every type in the (potentially union) input type `T` is evaluated one by one against all others in `T` to return either `TRUE` or `FALSE`. The result of `DoubleDistribute` is then a union of all individual evaluations. Given that any type in `T` `extends` itself, a `TRUE` type is guaranteed in the resulting union. If `T` is a union type, each of its possible types will not `extends` all the others, leading to some `FALSE` types being included in the resulting union. Therefore, `DoubleDistribute` is either `TRUE` if `T` is a single (not union) type or `TRUE|FALSE` if `T` is a union.

`IsUnionDetailed` looks at the result of `DoubleDistribute` as either `true` or `true|unknown` (which resolves to simply `unknown`) and returns the expected `true` or `false` return type.

### Example for single type:

```
IsUnion<string>
=> IsUnionImpl<string, string>
=> (string extends string ? string extends string ? true : unknown : never) extends true ? false : true
=> (string extends string ? true : unknown) extends true ? false : true
=> (true) extends true ? false : true
=> false
```

### Example for union type:

```
IsUnion<string|number>
=> IsUnionImpl<string|number, string|number>
=> (string|number extends string|number ? string|number extends string|number ? true : unknown : never) extends true ? false : true
=> (
  (string extends string|number ? string|number extends string ? true : unknown : never) |
  (number extends string|number ? string|number extends number ? true : unknown : never)
) extends true ? false : true
=> (
  (string|number extends string ? true : unknown) |
  (string|number extends number ? true : unknown)
) extends true ? false : true
=> (
  (
    (string extends string ? true : unknown) |
    (number extends string ? true : unknown)
  ) |
  (
    (string extends number ? true : unknown) |
    (number extends number ? true : unknown)
  )
) extends true ? false : true
=> (
  (
    (true) |
    (unknown)
  ) |
  (
    (unknown) |
    (true)
  )
) extends true ? false : true
=> (true|unknown) extends true ? false : true
=> (unknown) extends true ? false : true
=> true
```