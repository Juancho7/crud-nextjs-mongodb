import Link from 'next/link'

function Navbar () {
  return (
    <nav className='bg-gray-950 py-5 mb-2'>
      <div className='container flex justify-between px-10 md:px-0 mx-auto'>
        <Link href='/'>
          <h1 className='text-2xl font-bold hover:text-gray-300'>See All Tasks</h1>
        </Link>

        <ul className='flex gap-x-4'>
          <li>
            <Link href='/tasks/new' className='py-2 px-3 hover:text-gray-900 hover:bg-gray-300 bg-gray-800 rounded-md'>New Task</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
