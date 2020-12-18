import React, { memo, useCallback, useState, useMemo, useEffect, useRef} from 'react';
import $ from 'jquery'
import Buttons, {ButtonOpen} from './Buttons'
import ZoomImage, { actions } from './ZoomImage'
import ModalSuperzoom from './Modal';
import Minimap from './Minimap'

import './superzoom.global.css'

const Superzoom = ({isOpen = false, modal = false, allImagens = [], setView}) => {
  const [instanceZoom, setInsanceZoom] = useState(false);
  const [imageUrlCurrent, setImageUrlCurrent] = useState(false)
  const imageRef = useRef(0);
  
  
    useEffect(()=>{
    
      if(!isOpen) {
        setImageUrlCurrent(false)
        setInsanceZoom(false)

        return;
      };
      
      if(allImagens.length === 0) return;

        const [initialImage] = allImagens;
        const {imageUrl} = initialImage;

        setImageUrlCurrent(imageUrl)

    },[isOpen])


    const initialImage = useCallback((imageUrlReceive)=>{
      if(!isOpen && imageUrlCurrent) return;
      const shortSleeveZebra = new ZoomImage(imageUrlReceive ? imageUrlReceive : imageUrlCurrent, 803, 571);
      actions(shortSleeveZebra)
      setInsanceZoom(shortSleeveZebra)
    },[])

    useEffect(()=>initialImage(),[])

    useEffect(()=>initialImage(imageUrlCurrent), [isOpen, imageUrlCurrent])


    const close = useCallback(()=>{
        setView(false)
        setImageUrlCurrent(false)
    },[])

    const renderContent = useMemo(()=><div className="superzoom">
        {isOpen && allImagens.length > 0 &&  <Minimap {...{allImagens, setImageUrlCurrent}} />}
        <div className="wrapper">
          <div ref={imageRef}
          className="image">
            <Buttons  {...{
              shortSleeveZebra: instanceZoom,
              setView: close
            }} />
          </div>
        </div>
        </div>,[isOpen, allImagens])

  return isOpen ? (modal ? <ModalSuperzoom {...{
      isOpen,
      setView: close
    }}>{renderContent}</ModalSuperzoom> 
    : renderContent)
  : <ButtonOpen {...{setView }} />;



}

export {
  ButtonOpen
};

export default memo(Superzoom);