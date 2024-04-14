import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const ProfileIcon = props => (
  <Svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 11.3C14.2091 11.3 16 9.50914 16 7.3C16 5.09086 14.2091 3.3 12 3.3C9.79086 3.3 8 5.09086 8 7.3C8 9.50914 9.79086 11.3 12 11.3ZM12 21.3C15.866 21.3 19 19.5091 19 17.3C19 15.0909 15.866 13.3 12 13.3C8.13401 13.3 5 15.0909 5 17.3C5 19.5091 8.13401 21.3 12 21.3Z"
      fill={props.color || 'white'}
    />
  </Svg>
);
export default ProfileIcon;