import Link from 'next/link';

export default function Welcome({ name }: { name: string }) {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-3xl'>
        <span className='text-orange-400'>{name}</span> 님, 환영합니다!
      </p>
      <div className='w-full text-right'>
        <Link
          href='/todo'
          className='text-neutral-600 hover:text-neutral-800 hover:underline'
        >
          TO DO 작성하기
        </Link>
      </div>
    </div>
  );
}
