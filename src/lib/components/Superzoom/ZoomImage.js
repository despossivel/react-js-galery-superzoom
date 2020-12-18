import $ from 'jquery'

const actions = (instanceZoomImage) => $(()=> {
  $('.image').css(instanceZoomImage.render()); //metodo de inicializacao
  $('.zoom').on('click', () =>  $('.image').css(instanceZoomImage.renderZoom()));
  $('.reset').on('click', ()=> $('.image').css(instanceZoomImage.render()));
  $('.image').on('mousedown', instanceZoomImage.pan());
});

export {
  actions
}

//function to get element's 'background-position-x' (no firefox support)
function getBackgroundX(elem) {
  const vals = elem.css('background-position').split(' ');
  return parseInt(vals[0], 10);
}

//function to get element's 'background-position-x' (no firefox support)
function getBackgroundY(elem) {
  const vals = elem.css('background-position').split(' ');
  return parseInt(vals[1], 10);
}


 
 // define new function object
 class ZoomImage {
  constructor(imageUrl, width, height) {
    this.imageUrl = imageUrl;
    this.width = width || 1000;
    this.height = height || 1000;
    this.zoomLeftEdge = 0;
    this.zoomTopEdge = 0;
    this.zoomRightEdge = -(this.width*2); // this is *3 *2/3 which equals *2
    this.zoomBottomEdge = -(this.height*2);
    this.zoomed; //stores if the image is zoomed
  }


  getFullImageUrl = () => this.imageUrl + '?w=' + this.width + '&h=' + this.height;


  getZoomImageUrl = () =>  this.imageUrl + '?w=' + (this.width*3) + '&h=' + (this.height*3);


  // render the image as a background
  render(){
    this.zoomed = false; //sets our zoomed state
    return {
      'background-image' : 'url(\'' + this.getFullImageUrl() + '\')',
      'background-repeat': 'no-repeat',
      'background-position' : 'center',
      'background-size': 'contain',
      'width' : this.width + 'px',
      'height' : this.height + 'px',
      'cursor' : 'default'
    }  
  } //render

  //renders the zoomed version of the image, trying to save page load by not requesting a large image until the 'zoom' button is hit
  renderZoom(){
    this.zoomed = true; //sets our zoomed state
    return {
      'background-image' : 'url(\'' + this.getZoomImageUrl() + '\')',
      'background-repeat': 'no-repeat',
      'background-position' : -(this.width/2) + 'px ' + (-(this.width/2)) + 'px', // keeps the image centered
      'background-size': 'auto',
      'width' : this.width + 'px',
      'height' : this.height + 'px',
      'cursor' : 'move'
    }  
  } //renderZoom

  //funtion for panning, returns another function
  pan(){
    //pass the ZoomImage object into the nested function
    const self = this;

    return function(pos) {
      // if the image is not zoomed, break out
      if (!self.zoomed)  return;
      
      //collect some starting data, as we don't know where this image might be rendered
      const startX = pos.pageX;
      const startY = pos.pageY;
      
      //find out where the image is, in case it has already been dragged
      const initialX = getBackgroundX($(this));
      const initialY = getBackgroundY($(this));

      //this is the dragging part
      $(this).mousemove(function(e){
        
        //get the current position by taking the mouse position minus the starting postion of the render, then adding the initial background position
        const currentX = (e.pageX - startX + initialX);
        const currentY = (e.pageY - startY + initialY);

        //console log for debugging
        //console.log(currentX +' '+ currentY);
        
        //limit the panning, by only continuing if it's within the edges of the viewport
        if ((currentX <= self.zoomLeftEdge) && (currentX >= self.zoomRightEdge) && (currentY <= self.zoomTopEdge) && (currentY >= self.zoomBottomEdge)) {
          $(this).css(
            {
              'background-position' : currentX + 'px ' + currentY + 'px'
            });
        } 

         //if the mouse button is raised or the mouse moves out of the viewport, then unbind the mousemove and stop panning
      }).on('mouseup mouseout', () => $(this).unbind('mousemove'))

    }; //returned function
  
  } //pan


 }


  export default ZoomImage;