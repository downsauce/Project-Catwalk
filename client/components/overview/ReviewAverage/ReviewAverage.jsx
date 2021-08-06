import React from 'react';
import parser from 'html-react-parser';
const ReviewAverage = (props) => {
  let total = 0;
  let average = props.average
  average = Math.round(average/0.25) * 0.25;
  const handleStar = (num) => {
    let htmlString = '';
    for ( var i = 0; i < 5; i++) {
      if (num >= 1) {
        num--;
        htmlString += '<svg alt="star" width="20.25" height="18" viewBox="0 0 536 512" version="1.1" id="svg4" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs8" /> <path fill="currentColor" d="M 240.55,19.3625 178.01214,152.86735 29.15,173.0625 c -26.2000001,3.8 -36.7000001,36.1 -17.7,54.6 l 105.7,103 -25,145.5 c -4.5,26.3 23.2,46 46.4,33.7 l 130.7,-68.7 130.7,68.7 c 23.2,12.2 50.9,-7.4 46.4,-33.7 l -25,-145.5 105.7,-103 c 19,-18.5 8.5,-50.8 -17.7,-54.6 l -146.1,-21.3 -65.3,-132.4 c -11.7,-23.6 -45.6,-23.9 -57.4,0 z" id="path2" /> </svg>';
      } else if (num == .75) {
        num -= .75
        htmlString += '<svg width="20.25" height="18" viewBox="0 0 152.4 135.46667" version="1.1" id="svg5" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs2" /> <g id="layer1" transform="matrix(11.134956,0,0,11.134956,5.1983489,-2.9402188)"> <path fill="currentColor" d="M 12.056763,4.340331 8.6059305,3.8336296 7.0635665,0.68399262 c -0.2763501,-0.5614157 -1.0770567,-0.56855233 -1.3557688,0 L 4.1654335,3.8336296 0.71460045,4.340331 C 0.09576518,4.4307284 -0.15224131,5.1991067 0.2965323,5.6391995 L 2.793131,8.089446 2.2026394,11.550715 C 2.0963508,12.176361 2.7506156,12.645 3.2985918,12.352398 l 3.0870903,-1.634292 3.0870901,1.634292 c 0.5479748,0.290223 1.2022408,-0.176037 1.0959518,-0.801683 L 9.9782333,8.089446 12.474832,5.6391995 C 12.923606,5.1991067 12.675599,4.4307284 12.056763,4.340331 Z M 8.7618204,7.6897937 9.3216071,10.982163 6.3856821,9.4287551 7.8548698,10.467954 V 8.7182117 7.7908546 L 7.8548253,4.8779578 6.3856821,1.8805692 7.8548253,4.8779578 11.137959,5.3584916 Z" id="path17" style="stroke-width:0.0237041" /> </g> </svg>';
      } else if (num === .5) {
        num -= .5;
        htmlString += '<svg width="20.25" height="18" viewBox="0 0 576 512" version="1.1" id="svg4" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs8" /> <path fill="currentColor" d="M 530.3083,171.51 383.9383,150.2 318.5283,17.81 C 312.6483,5.98 301.1783,0 289.7083,0 c -11.4,0 -22.79,5.9 -28.69,17.81 l -65.43,132.38 -146.38,21.29 c -26.25,3.8 -36.77,36.09 -17.74,54.59 l 105.89,103 -25.06,145.48 c -3.56,20.78 13.03,37.45 31.61,37.45 4.93,0 10,-1.17 14.87,-3.75 l 130.95,-68.68 130.94,68.7 c 4.86,2.55 9.92,3.71 14.83,3.71 18.6,0 35.22,-16.61 31.66,-37.4 l -25.03,-145.49 105.91,-102.98 c 19.04,-18.5 8.52,-50.8 -17.73,-54.6 z m -121.74,123.2 -18.12,17.62 4.28,24.88 19.52,113.45 -102.13,-53.59 -22.38,-11.74 0.03,-317.19 51.03,103.29 11.18,22.63 25.01,3.64 114.23,16.63 z" id="path2" /> </svg>'
      } else if (num === .25) {
        num -= .25;
        htmlString += '<svg width="20.25" height="18" viewBox="0 0 141.81667 135.46667" version="1.1" id="svg5" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs2" /> <g id="layer1"> <path fill="currentColor" d="M 134.51533,45.421362 95.801759,39.777285 78.498555,4.6939455 c -3.100258,-6.2535267 -12.083084,-6.3330212 -15.209848,0 L 45.985515,39.777285 7.2719505,45.421362 C 0.32947771,46.428286 -2.4528121,54.987133 2.5818006,59.889263 L 30.590182,87.182195 23.965689,125.73676 c -1.192416,6.96898 6.147526,12.18907 12.295064,8.92984 l 34.632878,-18.20415 34.632889,18.20415 c 6.14753,3.23274 13.48746,-1.96086 12.29507,-8.92984 l -6.62451,-38.554565 28.00839,-27.292932 c 5.03461,-4.90213 2.25232,-13.460977 -4.69014,-14.467901 z m -36.964705,37.309177 6.280015,36.673211 -32.937009,-17.30318 -32.937008,17.30318 16.352874,-8.42976 0.102412,-59.564081 v 0 l 16.481752,-33.387471 16.481751,33.387471 36.832218,5.352589 z" id="path17" style="stroke-width:0.26498" /> </g> </svg>'
      } else if (num === 0) {
        htmlString += '<svg  width="20.25" height="18" viewBox="0 0 141.81667 135.46667" version="1.1" id="svg5" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"> <defs id="defs2" /> <g id="layer1"> <path fill="currentColor" d="M 134.51533,45.421362 95.801759,39.777285 78.498555,4.6939455 c -3.100258,-6.2535267 -12.083084,-6.3330212 -15.209848,0 L 45.985515,39.777285 7.2719505,45.421362 C 0.32947771,46.428286 -2.4528121,54.987133 2.5818006,59.889263 L 30.590182,87.182195 23.965689,125.73676 c -1.192416,6.96898 6.147526,12.18907 12.295064,8.92984 l 34.632878,-18.20415 34.632889,18.20415 c 6.14753,3.23274 13.48746,-1.96086 12.29507,-8.92984 l -6.62451,-38.554565 28.00839,-27.292932 c 5.03461,-4.90213 2.25232,-13.460977 -4.69014,-14.467901 z M 97.550625,82.730539 103.83064,119.40375 70.893631,102.10057 37.884518,119.55117 44.924075,83.652264 20.641541,57.109415 54.411909,51.409909 v 0 l 16.481752,-33.387471 16.481751,33.387471 36.832218,5.352589 z" id="path17" style="stroke-width:0.26498" /> </g> </svg>'
      }
    }
    return htmlString;
  }
  return (
    <div>
      {parser(handleStar(average))}
    </div>
  )
}
export default ReviewAverage;