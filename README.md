
# react-js-gallery-superzoom

  

A library of React components created using `create-react-app`.

  

## Installation

  

Run the following command:

  

`npm install react-js-gallery-superzoom`

  

or

  

`yarn add react-js-gallery-superzoom`

  
  

## Props and their types

|Props|types |

|--|--|

|modal | boolean |

|isOpen | boolean |

|setView | function |

|allImagens | [ { imageUrl:'' }] |

  

### Example use

```js

<Superzoom  {...{
	modal:  false,
	isOpen: view,
	setView: setView,
	allImagens:  [
	{imageUrl:'https://i.pinimg.com/originals/ec/88/51/ec88519bfe56f4f03a65820458b46f46.jpg'},
	{imageUrl:'https://i.pinimg.com/originals/da/a1/a9/daa1a906574d2dbe16e290895e31c362.jpg'},
	{imageUrl:'https://i.pinimg.com/originals/18/23/4d/18234d15595f5627ef8ed25364673df2.jpg'},
	{imageUrl:'https://i.pinimg.com/originals/d3/41/54/d34154b22f5e04a9a63e77ffdecd31fc.jpg'}  ],
}}/>

```



[@despossivel](https://github.com/despossivel)