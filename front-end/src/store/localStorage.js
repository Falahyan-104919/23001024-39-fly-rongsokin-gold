export default function getUserProps() {
  if (localStorage.getItem('user_traits')) {
    return localStorage.getItem('user_traits');
  }
  const item = {
    isLoggedIn: false,
    user: {
      userId: '',
      fullname: '',
      email: '',
      phoneNumber: '',
      role: '',
      token: '',
      profileImg: '',
    },
  };
  return item;
}
