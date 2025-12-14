import { Outlet } from "react-router-dom";

function CommonLayout() {
  return (
    <div className="bg-gray-50">
      <Outlet />
    </div>
  );
}

export default CommonLayout;
