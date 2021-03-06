import axios from 'axios';
import { ROOT_URL } from '../../config/constants';
import { normalize } from 'normalizr';
import { circleListSchema } from '../../store/schema';
import { healthCardSections } from '../../testData/testUser2';

export const fetchUserCircles = async (uid) => {
  try {
    const url = ROOT_URL + `/users/${uid}/circles`;
    let response = await axios.get(url);
    //const normalized_response = normalize(response.data.circles, circleListSchema);
    return response.data.circles;
  } catch(e) {
    return e;
  }
}

export const addCircle = async (uid, name, description) => {
  try {
    const url = ROOT_URL + `/circles`;
    const circle = {
      uid,
      name,
      description,
    };
    let response = await axios.post(url, circle);
    return response;
    // const normalized_response = normalize(response.data.posts, postListSchema);
    // return normalized_response.entities.posts;
  } catch(e) {
    return e;
  }
}

//TODO: Hook up to backend
export const fetchHealthCards = (uid) => {
  return new Promise(resolve => setTimeout(() => resolve(healthCardSections), 1000));
}

