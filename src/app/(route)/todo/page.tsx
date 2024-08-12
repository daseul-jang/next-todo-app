import TodoBody from './_components/todo-body';
import TodoHeader from './_components/todo-header';

export default function TodoPage() {
  return (
    <div className='w-full flex flex-col items-center gap-10 mt-[60px] pt-10'>
      <TodoHeader />
      <TodoBody />
    </div>
  );
}
