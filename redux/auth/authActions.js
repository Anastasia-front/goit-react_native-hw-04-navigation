export const savePhoto = (photo) => {
  return {
    type: "SAVE_PHOTO",
    payload: photo,
  };
};

export const saveName = (name) => {
  return {
    type: "SAVE_NAME",
    payload: name,
  };
};

export const saveEmail = (email) => {
  return {
    type: "SAVE_EMAIL",
    payload: email,
  };
};
