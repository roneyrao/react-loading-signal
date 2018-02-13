import styles from './styles';

test('emit json of className map from imported css', () => {
  expect(styles).toBeDefined();
  expect(styles.loading).toBeDefined();
});
test('className "composes" another', () => {
  expect(styles.local).toEqual(expect.stringContaining(styles.loading));
});
test('json full matches', () => {
  expect(styles).toMatchSnapshot();
});
