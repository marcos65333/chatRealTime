import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import type { IMessage } from '../interfaces/message'
import type IUser from '../interfaces/user'
import useUser from '../hooks/useUser'
import { toast } from 'react-toastify'
import { BadgeX, Smile } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import type { EmojiClickData } from 'emoji-picker-react'
import { ENDPOINT } from '../config/config'

const socket = io('http://localhost:5000', {
  auth: {
    token: localStorage.getItem('jwt')
  }
})

export default function ChatPage() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { isLogged, logout } = useUser()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const topRef = useRef<HTMLDivElement>(null)
  const isFetching = useRef(false)

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      if (!response.ok) {
        throw new Error('Error fetching user info')
      }
      const data = await response.json()
      setUser(data)
    } catch (error) {
      console.error('Error fetching user info:', error)
      toast.error('Error al obtener la información del usuario')
    }
  }

  const loadMessages = async (page: number) => {
    if (isFetching.current || !hasMore) return
    isFetching.current = true
    try {
      const res = await fetch(`${ENDPOINT}/messages?page=${page}&limit=20`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      const data: IMessage[] = await res.json();

      if (data.length === 0) {
        setHasMore(false)
      } else {
        // Insertar al inicio, invertimos para mantener orden ASC
        setMessages(prev => [...data.reverse(), ...prev])
      }
    } catch (err) {
      console.error('Error cargando mensajes:', err)
    } finally {
      isFetching.current = false
    }
  }

  useEffect(() => {
    const container = document.getElementById('chat-container')
    if (!container) return

    const handleScroll = () => {
      if (container.scrollTop < 50 && hasMore) {
        setPage(prev => prev + 1)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [hasMore])

  useEffect(() => {
    loadMessages(page)
  }, [page])



  useEffect(() => {
    fetchUserInfo()
    if (!isLogged) {
      window.location.href = '/'
    }

    socket.on('chat message', (msg: IMessage) => {
      setMessages(prev => [...prev, msg])
    })

    return () => {
      socket.off('chat message')
    }
  }, [])

  useEffect(() => {
    socket.on('delete message', (id: number) => {
      setMessages(prev => prev.filter(msg => msg.id !== id))
    })

    return () => {
      socket.off('delete message')
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return
    socket.emit('chat message', newMessage)
    setNewMessage('')
    setShowEmojiPicker(false)
  }

  const handleDeleteMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id))
    socket.emit('delete message', id)
    toast.success('Mensaje eliminado')
  }

  const getNameColor = (username: string) => {
    const colors = ['text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-600', 'text-orange-600']
    const index = username.charCodeAt(0) % colors.length
    return colors[index]
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji)
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl flex flex-col h-[85vh]">
        <header className="bg-blue-600 text-white text-center py-4 rounded-t-2xl shadow">
          <h1 className="text-xl font-semibold">💬 Chat en Tiempo Real</h1>
        </header>

        <div
          id="chat-container"
          style={{ scrollBehavior: 'smooth' }}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50"
        >
          <div ref={topRef} />
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.userId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                  className={`flex flex-col text-start text-sm rounded-lg p-3 shadow-md border w-fit max-w-[80%] min-w-[250px] 
                  ${msg.userId === user?.id
                    ? 'bg-blue-100 border-blue-300 text-right'
                    : 'bg-white border-gray-200 text-left'}
                `}
              >
               <div className='relative'>
                     {msg.userId === user?.id && (
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="self-end text-red-500 hover:text-red-700 absolute top-1 right-1 cursor-pointer"
                    title="Eliminar mensaje"
                  >
                    <BadgeX size={16} />
                  </button>
                )}

               </div>
                <div className={`${getNameColor(msg.User?.username || 'Anon')} font-medium`}>
                  {msg.User?.username || 'Anon'}
                </div>
                <div className="text-gray-800">{msg.content}</div>
                <div className="text-gray-400 text-xs self-end">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t bg-white flex gap-2 items-center relative">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-500 hover:text-blue-600"
            title="Insertar emoji"
          >
            <Smile size={24} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-16 left-4 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow"
          >
            Enviar
          </button>
        </div>
      </div>
      <button
        onClick={logout}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow"
        title="Cerrar sesión"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
