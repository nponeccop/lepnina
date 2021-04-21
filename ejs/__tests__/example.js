const foo = () => 42

const fooAsync = async () => 666

it('should return 42 in a sync test', () => {
  expect(foo()).toBe(42)
})

it('should return 666 in an async test', async () => {
  expect(await fooAsync()).toBe(666)
})
