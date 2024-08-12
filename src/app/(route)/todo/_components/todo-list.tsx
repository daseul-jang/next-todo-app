import { ITodoItem } from './todo-body';

export default function TodoList({
  id,
  title,
  isChecked,
  createdAt,
}: ITodoItem) {
  return (
    <div className='flex flex-col'>
      {id} : {title}
    </div>
  );
}
