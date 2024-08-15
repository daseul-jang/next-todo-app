import { ITodoGroup } from '@/redux/slice/todo-slice';
import { formatDate } from '@/utils/date-utils';
import TodoList from './todo-list';

export default function TodoGroup({ date, todos }: ITodoGroup) {
  return (
    <div className='bg-orange-300/30 py-5 mb-5 rounded-2xl border border-orange-200'>
      <div className='text-xl font-semibold mb-4 px-5'>{formatDate(date)}</div>
      <div>
        {todos.map((todo, index) => (
          <TodoList
            key={todo.id}
            todo={todo}
            isLast={index === todos.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
