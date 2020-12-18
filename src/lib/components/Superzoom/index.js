import React, { memo, useCallback, useState, useMemo, useEffect, useRef} from 'react';
import $ from 'jquery'
import Buttons, {ButtonOpen} from './Buttons'
import ZoomImage, { actions } from './ZoomImage'
import ModalSuperzoom from './Modal';

import './superzoom.global.css'

const Superzoom = ({isOpen = false, modal = false, allImagens = [], setView}) => {
  const [instanceZoom, setInsanceZoom] = useState(false);
  const [imageUrlCurrent, setImageUrlCurrent] = useState(false)
  const imageRef = useRef(0);
  
    useEffect(()=>{
      if(!isOpen && allImagens.length === 0) return;
        const [initialImage] = allImagens;
        const {imageUrl} = initialImage;
        setImageUrlCurrent(imageUrl)
    },[isOpen])

    useEffect(()=>{
      if(!isOpen && imageUrlCurrent) return;
      const shortSleeveZebra = new ZoomImage(imageUrlCurrent, 803, 571);
      actions(shortSleeveZebra)
      setInsanceZoom(shortSleeveZebra)
    }, [isOpen, imageUrlCurrent])

    const renderMinimap = useMemo(()=>isOpen && allImagens.length > 0 && allImagens
        .map(({imageUrl}, i)=><img key={i} 
        onClick={()=>setImageUrlCurrent(imageUrl)}
        src={imageUrl} />), [isOpen, allImagens, setImageUrlCurrent])

    const renderContent = useMemo(()=><div className="superzoom">
      <div className="minimap">{renderMinimap}</div>
        <div className="wrapper">
          <div ref={imageRef}
          className="image">
            <Buttons  {...{
              shortSleeveZebra: instanceZoom,
              setView
            }} />
          </div>
        </div>
        </div>,[renderMinimap])

  return isOpen ? (modal ? <ModalSuperzoom {...{
      isOpen,
      setView
    }}>{renderContent}</ModalSuperzoom> 
    : renderContent)
  : <ButtonOpen {...{setView}} />;
}


export {
  ButtonOpen
};

export default memo(Superzoom);