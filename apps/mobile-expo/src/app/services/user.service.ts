import api from './api';
import { User } from '../types/user'; // Assume User type

export const userService = {
  getProfile: async (): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Fetching user profile');
    return { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
  },
};
