import React from 'react';
import {Superzoom} from '../lib'

const App = () => {
    const [ view, setView ] = React.useState(true);

    return <>
    {!view && <>
    <button onClick={()=>setView(true)}>Open</button> 
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <small>
      <a href="https://github.com/despossivel">@despossivel</a>
    </small>
    </>}
    
    <Superzoom {...{
        modal: true,
        isOpen: view,
        allImagens: [ 
        {imageUrl:'https://i.pinimg.com/originals/ec/88/51/ec88519bfe56f4f03a65820458b46f46.jpg'},
        {imageUrl:'https://i.pinimg.com/originals/da/a1/a9/daa1a906574d2dbe16e290895e31c362.jpg'},
        {imageUrl:'https://i.pinimg.com/originals/18/23/4d/18234d15595f5627ef8ed25364673df2.jpg'},
        {imageUrl:'https://i.pinimg.com/originals/d3/41/54/d34154b22f5e04a9a63e77ffdecd31fc.jpg'}  ],
        setView: setView
    }}/>
    
    </>
} ;

export default App;
