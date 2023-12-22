import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('')
  const [input2, setInput2] = useState('')
  const [jsResponse, setJsResponse] = useState([])
  const [jsResponseSimi, setJsResponseSimi] = useState([])

  const [url, setUrl] = useState()
  const getSuggestions = () => {
    const url = 'https://api.datamuse.com/sug?';
    const queryParams = 's=';

  fetch(`${url}${queryParams}${input}`, {cache: 'no-cache'})
    .then(response => response.json())
    //.then(response => JSON.stringify(response, null, 2))
    .then(response => setJsResponse(response))
    .catch(err => console.error(err));
  }
  const getSimilar = () => {
    const url = 'https://api.datamuse.com/words?';
    const queryParams = 'ml=';
    fetch(`${url}${queryParams}${input2}`, {cache: 'no-cache'})
      .then(response => response.json())
      //.then(response => JSON.stringify(response, null, 2))
      .then(response => setJsResponseSimi(response))
      .catch(err => console.error(err));
    }
    function handleChange(e){
      setInput(e.target.value)
    }
    function handleChange2(e){
      setInput2(e.target.value)
    }
    function handleSubmit(e){
      e.preventDefault();
      return(
        getSuggestions()
      )
    }
    function handleSimilar(e){
      e.preventDefault();
      return(
        getSimilar()
      )
    }
    function reset(){
      return(
        setInput(''),
        setInput2(''),
        setJsResponse(''),
        setJsResponseSimi('')
      )
      
    }
  return (
    <div className="App">
      <header className="App-header">
      <button onClick={reset} className='reset'>RESET</button>
        <form onSubmit={handleSubmit} className='form'>
          <label htmlFor='input'>Chose words</label>
          <input type='text' id='input' onChange={handleChange} value={input}/>
          <input type='submit' value='Get Suggestions' className='button'/>
          <ol className='result'>
            {jsResponse ? jsResponse.map((item) => <li key={item.word}>{item.word}</li>) : ''}
          </ol>
        </form>
        <form onSubmit={handleSimilar} className='form'>
          <label htmlFor='input'>Chose words</label>
          <input type='text' id='input' onChange={handleChange2} value={input2}/>
          <input type='submit' value='Get similar' className='button'/>
          <ol className='result'>
            {jsResponseSimi ? jsResponseSimi.map((item) => <li key={item.word}>{item.word}</li>) : ''}
          </ol>
        </form>
        
      </header>
    </div>
  );
}

export default App;
