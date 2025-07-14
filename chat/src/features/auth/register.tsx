import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type IUser from '../../interfaces/user';
import { Link } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';

const schema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters'),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { register: registerUser, loading, error, response } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: IUser) => {
    registerUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Crear cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full px-4 py-2 rounded-xl border ${
                errors.email ? 'border-red-400' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario
            </label>
            <input
              id="username"
              {...register('username')}
              className={`w-full px-4 py-2 rounded-xl border ${
                errors.username ? 'border-red-400' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={`w-full px-4 py-2 rounded-xl border ${
                errors.password ? 'border-red-400' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          {/* Success Message */}
          {response && <p className="text-sm text-green-500 mt-1">{response?.message}</p>}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-md transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
