import React, { useMemo, memo, useCallback, useState} from 'react';

// import { Container } from './styles';

const Minimap = ({allImagens, setImageUrlCurrent}) => {

    const renderMinimap = useMemo(()=>allImagens
    .map(({imageUrl}, i)=><img key={i} 
    onClick={()=>setImageUrlCurrent(imageUrl)}
    src={imageUrl} />), [allImagens, setImageUrlCurrent])


  return <div className="minimap">{renderMinimap}</div>;
}

export default memo(Minimap);