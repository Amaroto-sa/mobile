import {apiFetch} from './client';
import {endpoints} from './endpoints';
import {NotificationItem} from './types';

export const fetchNotifications = () =>
  apiFetch<NotificationItem[]>(endpoints.notifications.list, {method: 'GET'});

export const markNotificationRead = (id: number) =>
  apiFetch<null>(endpoints.notifications.markRead, {
    body: JSON.stringify({id}),
    headers: {'Content-Type': 'application/json'},
  });

export const markAllNotificationsRead = () =>
  apiFetch<null>(endpoints.notifications.markAll, {method: 'POST'});
