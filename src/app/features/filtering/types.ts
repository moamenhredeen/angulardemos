
export type Task = {
  user_id: string;
  id: string;
  project_id: string;
  section_id: string;
  parent_id: string;
  added_by_uid: string;
  assigned_by_uid: string;
  responsible_uid: string;
  labels: string[];
  deadline: {
    property1: string;
    property2: string;
  };
  duration: {
    property1: number;
    property2: number;
  };
  checked: boolean;
  is_deleted: boolean;
  added_at: string;
  completed_at: string;
  updated_at: string;
  due: Record<string, any>;
  priority: number;
  child_order: number;
  content: string;
  description: string;
  note_count: number;
  day_order: number;
  is_collapsed: boolean;
}

export type TasksResponse = {
  results: Task[];
  next_cursor: string;
}
