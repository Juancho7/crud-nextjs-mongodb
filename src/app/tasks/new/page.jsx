'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

function FormPage () {
  const [newTask, setNewTask] = useState({
    title: '',
    description: ''
  })

  const router = useRouter()
  const params = useParams()

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`)
    const data = await res.json()
    console.log(data)
    setNewTask({
      title: data.title,
      description: data.description
    })
  }

  const createTask = async () => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()

      router.push('/')
      router.refresh()

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(newTask),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      if (window.confirm('Are you sure?')) {
        fetch(`/api/tasks/${params.id}`, {
          method: 'DELETE'
        })

        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!params.id) await createTask()
    else updateTask()
  }

  const handleChange = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value })

  useEffect(() => {
    if (params.id) {
      getTask()
    }
  }, [])

  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <header className='flex justify-between'>
          <h1 className='font-bold text-xl'>
            {
            params.id ? 'Update Task' : 'Create Task'
          }
          </h1>

          <button type='button' className='bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded-md' onClick={handleDelete}>
            Delete
          </button>
        </header>
        <input
          type='text' name='title' placeholder='Title' className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
          value={newTask.title} onChange={handleChange}
        />
        <textarea
          name='description' rows={3} placeholder='Description' className='bg-gray-800 border-2 w-full p-4 rounded-lg my-4'
          value={newTask.description} onChange={handleChange}
        />
        <button type='submit' className='bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg'>
          {!params.id ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export default FormPage
