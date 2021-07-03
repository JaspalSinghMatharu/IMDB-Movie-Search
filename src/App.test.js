import { render, screen } from '@testing-library/react';
import AutoComplete from './AutoComplete';
import Input from './components/Input';

test('render Input component', () => {
  const {wrapper} = render(<Input />);
  expect(wrapper).toMatchSnapshot();
});


test('render AutoComplete component', () => {
  const {wrapper} = render(<AutoComplete />);
  expect(wrapper).toMatchSnapshot();
});
