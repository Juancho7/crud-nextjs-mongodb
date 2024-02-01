import Link from 'next/link'

function TaskCard ({ task }) {
  return (
    <Link href={`/tasks/${task._id}`}>
      <div className='h-full p-10 text-gray-100 bg-gray-800 hover:bg-gray-700 rounded-md hover:cursor-pointer transition-colors'>
        <h3 className='text-2xl font-bold'>{task.title}</h3>
        <p className='text-slate-300'>{task.description}</p>
        <p className='text-slate-300 my-2'>
          <span className='mr-1'>Created At:</span>
          {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>
    </Link>
  )
}

export default TaskCard
