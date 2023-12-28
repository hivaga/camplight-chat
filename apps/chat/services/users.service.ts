export type IUser = {
  name: string;
  lastPing: number;
}

const activeUsers: IUser[] = [];
