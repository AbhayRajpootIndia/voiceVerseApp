import axios from 'axios';
import mime from 'mime';
import {Platform} from 'react-native';

const WEB_ROUTE_URL = 'https://192.168.189.112:5000';

export const extractEmotionFromAudio = async fileUri => {
  const filePath = Platform.select({
    ios: fileUri.replace('file://', ''),
    android: fileUri,
  });

  const formData = new FormData();

  formData.append('file', {
    uri: filePath,
    type: mime.getType(filePath),
  });

  const config = {
    method: 'POST',
    url: WEB_ROUTE_URL + '/extract_emotion',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    data: formData,
  };

  console.log(config);

  return axios.request(config);
};
