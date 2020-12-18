import React from 'react';
import {Superzoom} from '../lib'

// import { Container } from './styles';

const src = () => <Superzoom {...{
    modal: true,
    isOpen: true,
    allImagens: [ 
    {imageUrl:'https://miro.medium.com/max/4800/1*G-d-F2A4UEJg0p5nIiATDg.png'},
    {imageUrl:'https://miro.medium.com/max/4800/1*G-d-F2A4UEJg0p5nIiATDg.png'},
    {imageUrl:'https://miro.medium.com/max/4800/1*G-d-F2A4UEJg0p5nIiATDg.png'},
    {imageUrl:'https://miro.medium.com/max/4800/1*G-d-F2A4UEJg0p5nIiATDg.png'},
    {imageUrl:'https://miro.medium.com/max/4800/1*G-d-F2A4UEJg0p5nIiATDg.png'},  ],
    setView: () => {}
}}/> ;

export default src;
