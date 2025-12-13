import { Outlet } from "react-router-dom";

function CommonLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default CommonLayout;
