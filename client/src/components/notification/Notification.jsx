import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../redux/actions';

const Notifications = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const userId = useSelector((state) => state.homeData?.id);

  useEffect(() => {
    if (userId) {
      dispatch(getNotifications(userId));
    }
  }, [dispatch, userId]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-6 right-44">
      <div className="relative">
        <button
          onClick={handleToggleDropdown}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <BellIcon className="w-6 h-6 text-gray-700" />
          <span className="sr-only">Notifications</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-[400px] bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
      
            </div>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center gap-3">
                    <img
                      src={notification.picture} 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{notification.message}</p>
                    </div>
                    <p className="text-sm text-gray-500">{notification.createdAt}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No notifications</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
