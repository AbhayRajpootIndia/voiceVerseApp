import * as React from 'react';
import Svg, {Path, Circle, Line} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="800px"
    height="800px"
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
    {...props}>
    <Path
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M1,32c0,0,11,15,31,15s31-15,31-15S52,17,32,17 S1,32,1,32z"
    />
    <Circle
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={32}
      cy={32}
      r={7}
    />
    {props.crossed && (
      <Line
        fill="none"
        stroke="#000000"
        strokeWidth={2}
        strokeMiterlimit={10}
        x1={9}
        y1={55}
        x2={55}
        y2={9}
      />
    )}
  </Svg>
);
export default SVGComponent;