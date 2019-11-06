import { User } from './user/user.model';

export interface ContextType {
  req: {
    user: User;
  };
}
