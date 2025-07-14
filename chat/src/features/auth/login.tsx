import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type ILogin from '../../interfaces/login';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters'),
});

export default function Login() {
  const { login,error,isLogged,isLoginLoading,logout,hasLoginError } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/chat');
    }
  }, [isLogged, navigate]);
 
  

  const onSubmit = (data: ILogin) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 px-4 w-f">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          {hasLoginError && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow-md transition"
          >
            Ingresar
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
