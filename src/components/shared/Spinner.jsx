import spinner from '../assets/spinner.gif'

function Spinner() {
  return <img src={spinner} alt='Loading...' style={{width: '50px', margin: '3rem auto', display: 'block'}} />
}

export default Spinner