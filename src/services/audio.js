import axios from 'axios';
import mime from 'mime';
import {Platform} from 'react-native';

const WEB_ROUTE_URL = 'http://localhost:3001/v1/user';

export const extractEmotionFromAudio = async fileUri => {
  const filePath = Platform.select({
    ios: fileUri.replace('file://', ''),
    android: 'file:///' + fileUri
  });

  const formData = new FormData();

  formData.append('file', {
    uri: filePath,
    type: mime.getType(filePath),
    name: filePath.split('/').pop()
  });

  console.log('fileUri', fileUri);
  console.log('filePath', filePath);
  console.log('path', mime.getType(filePath));

  const config = {
    method: 'post',
    url: 'http://localhost:3001/v1/user',
    headers: {
      accept: 'application/json',
      'content-type': 'multipart/form-data'
    },
    data: formData
  };

  console.log(config);

  return axios.request(config);
};

export const welcome = async fileUri => {
  const config = {
    method: 'get',
    url: 'http://localhost:3001/v1/welcome',
    headers: {
      accept: 'application/json'
    }
  };

  console.log(config);

  return axios.request(config);
};
