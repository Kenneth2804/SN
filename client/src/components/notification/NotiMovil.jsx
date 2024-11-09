import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Para enlaces a otras partes de la app
import { Sidebar } from '../menu/Sidebar';

export default function NotiMovil() {
  const notifications = useSelector((state) => state.notifications); // Obtener notificaciones del store

  return (
      <div className="p-4">
        <Sidebar></Sidebar>
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <img
                src={notification.sender?.picture}
                alt={notification.sender?.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-black truncate">
                  A {notification.sender?.name} le gustó tu nota
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No notifications</p>
        )}
      </div>
    </div>
  );
}
