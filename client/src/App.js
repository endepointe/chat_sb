import React from 'react';
import Chat from './comps/chat/Chat';

const App = () => {
  const getAPI = () => {
   fetch('http://localhost:3001').then(res => res.json()).then((result) => console.log(result));
  };

  return (
    <div>
      <Chat />
      <button onClick={getAPI}>get api</button>
    </div>
  );
}

export default App;
