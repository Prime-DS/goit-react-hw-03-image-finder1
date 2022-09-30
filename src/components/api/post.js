import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const LIMIT = 12;
const KEY_API = '29398467-8a653d7b4fed816ab704a6050';
const instance = axios.create({
  baseURL: URL,
  params: {
    per_page: LIMIT,
    key: KEY_API,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});
export const getImage = async (_page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      _page,
    },
  });
  return data;
};

export const searchImages = async (q, _page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      _page,
      q,
    },
  });
  return data;
};

// const KEY_API = '29398467-8a653d7b4fed816ab704a6050';
// export const searchImages = async (q, page = 1) => {
//   try {
//     const response = await axios.get(URL, {
//       params: {
//         key: KEY_API,
//         q: q,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         per_page: LIMIT,
//         page: page,
//       },
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const instance = axios.create({
//   baseURL: URL,

//   params: {
//     per_page: LIMIT,
//     key: '29398467-8a653d7b4fed816ab704a6050',
//     image_type: 'photo',
//     orientation: 'horizontal',
//   },
// });
