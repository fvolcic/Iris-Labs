import './App.css';
import { Component, useEffect } from 'react';
import { IrisEditor } from './iris-editor';

function App() {

  return (
    <div className="App">
      <header>
      </header>
      <div className="iris-app">
        <IrisEditor />
      </div>
    </div>
  )

  // return (
  //   <div className="App">
  //     <header>
  //     </header>
  //     <div className="iris-app">
  //       <div className="iris-app-chip" >
  //         <div className="iris-app-split-view">
  //           <div className="iris-app-split-view-item-1">
  //           </div>
  //           <div className="iris-app-split-view-item-2">
  //             <div className="iris-app-action-tile">
  //               <p>Light action 1</p>
  //             </div>
  //             <div className="iris-app-action-tile"> <p>Light action 1</p></div>
  //             <div className="iris-app-action-tile"> <p>Light action 1</p></div>
  //             <div className="iris-app-action-tile"> <p>Light action 1</p></div>
  //             <div className="iris-app-action-tile"> <p>Light action 1</p></div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
