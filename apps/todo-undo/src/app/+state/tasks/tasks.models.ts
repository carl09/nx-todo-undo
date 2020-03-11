export interface Task {
  id: string;
  text: string;
  createdDate: Date;
  compleated: boolean;
}

export interface TasksState {
  ids: string[];
  entities: { [id: string]: Task };
}
