export const useAuth = () => {
  //getting token from local storage
  const user = localStorage.getItem("token");
  console.log(user);
  //checking whether token is preset or not
  if (!user) {
    return localStorage.removeItem("token");;
  } else {
    return true;
  }
};
