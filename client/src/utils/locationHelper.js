let locationRef;

export const setLocation = (location) => {
  locationRef = location;
};

export const getCurrentPath = () => {
  return locationRef?.pathname || "/";
};
