import { render, screen } from '@testing-library/react';
import Input from './components/Input';

test('render Input component', () => {
  const {wrapper} = render(<Input />);
  expect(wrapper).toMatchSnapshot();
});
