let navigateFunction;

export const setNavigator = (navigate) => {
  navigateFunction = navigate;
};

export const navigateTo = (path) => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    console.warn("navigateTo was called before navigator was set");
  }
};