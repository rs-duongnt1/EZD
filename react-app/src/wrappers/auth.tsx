import { Outlet, Navigate } from 'umi';

export default () => {
  const isLogin = localStorage.getItem('isLogin');
  console.log(isLogin);
  if (isLogin) {
    return (
      <div className="authentication">
        <Outlet></Outlet>
      </div>
    );
  } else {
    return (
      <div className="non-authentication">
        <Navigate to="/login" />
      </div>
    );
  }
};
