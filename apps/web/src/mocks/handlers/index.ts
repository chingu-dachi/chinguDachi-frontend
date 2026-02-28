import { authHandlers } from './auth';
import { userHandlers } from './user';
import { uploadHandlers } from './upload';

export const handlers = [...authHandlers, ...userHandlers, ...uploadHandlers];
