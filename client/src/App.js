import React from 'react';
import Chat from './comps/chat/Chat';
//<button onClick={getAPI}>get api</button>
const App = () => {
  const getAPI = () => {
    fetch('http://localhost:3000').then(res => res.json()).then((result) => console.log(result));
  };

  return (
    <div>
      <Chat />
      <button onClick={getAPI}>get api result in console</button>
    </div>
  );
}

export default App;
