import React, {memo} from 'react';

import iconZoomPlus from '../../../assets/icon-zoom-plus.svg'
import iconZoomMinus from '../../../assets/icon-zoom-minus.svg'
import iconZoomClose from '../../../assets/icon-close.svg'

const ButtonOpen  = memo(({ setView }) => <button 
className="button-superzoom opacity" 
onClick={setView} >
  <img src={iconZoomPlus}  alt="Abrir supersoom"/>
</button>);
                                
export {
  ButtonOpen
};

const Buttons = ({instanceZoom, setView}) => <div className="container-buttons">         
<div className="buttons">
  <button className="close" onClick={()=>setView(true)}>
    <img src={iconZoomClose} alt="Fechar superzoom"/>
  </button>
    <button onClick={()=>instanceZoom.renderZoom()} className="zoom">
        <img src={iconZoomPlus} alt="Mais zoom" />
    </button>
    <button onClick={()=>instanceZoom.render()} className="reset">
        <img src={iconZoomMinus} alt="Menos zoom"/>
    </button>
  </div>
  </div>;

export default  memo(Buttons);