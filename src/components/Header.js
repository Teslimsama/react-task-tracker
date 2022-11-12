import PropTypes from 'prop-types';
import Button from './Button';

const Header = ({ title, onAdd ,showAdd }) => {
  // const onClick = () => {
  //   console.log('click')
  // }
  return (
    <header className='header'>
      <h1> {title}</h1>
      <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
    </header>
  )
}
// const style = {
//  color: 'red', backgroundColor:" black"
// }
Header.defaultProps = {
  title: 'Task Tracker',
}
Header.protoType = {
  title :PropTypes.string.isRequired
}
export default Header
