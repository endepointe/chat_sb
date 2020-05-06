import React from 'react';
import Chat from './comps/chat/Chat';
//<button onClick={getAPI}>get api result in console</button>
const App = () => {
  const getAPI = () => {
    fetch('/').then(res => res.json()).then((result) => console.log(result));
  };

  return (
    <div>
      <Chat />
    </div>
  );
}

export default App;
