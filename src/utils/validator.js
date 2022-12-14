
export const dataValidator = {
  userData: (data) => {
    if (data.name === '' || data.email === '') {
      return false;
    }
    return true;
  },
  restaurantData: (data) => {
    if (data.name === '') {
      return false;
    }
    return true;
  },
};
