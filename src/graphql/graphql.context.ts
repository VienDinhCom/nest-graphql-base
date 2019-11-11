import { User } from './user/models';

export interface ContextType {
  req: {
    user: User;
  };
  res: {};
}
