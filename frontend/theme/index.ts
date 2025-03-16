export let colors = {
  bg: "#10302A",
  primary: "#DBE49A",
  secondary: "#FC4C40",
};

export const changeTheme = (newColors: typeof colors) => {
  colors = newColors;
};
