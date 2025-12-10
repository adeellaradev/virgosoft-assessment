import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const user = ref(null);
const token = ref(localStorage.getItem('auth_token') || null);

export function useAuth() {
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  const setAuthData = (userData, authToken) => {
    user.value = userData;
    token.value = authToken;
    localStorage.setItem('auth_token', authToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  };

  const clearAuthData = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const register = async (formData) => {
    try {
      const response = await axios.post('/api/register', formData);
      setAuthData(response.data.user, response.data.token);
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || {},
      };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/login', credentials);
      setAuthData(response.data.user, response.data.token);
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors || {},
      };
    }
  };

  const logout = async () => {
    try {
      if (token.value) {
        await axios.post('/api/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
      router.push({ name: 'Login' });
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      user.value = response.data.data;
      return { success: true, data: response.data.data };
    } catch (error) {
      if (error.response?.status === 401) {
        clearAuthData();
        router.push({ name: 'Login' });
      }
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch profile',
      };
    }
  };

  // Initialize auth token in axios if it exists
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  }

  return {
    user,
    token,
    isAuthenticated,
    register,
    login,
    logout,
    fetchProfile,
    setAuthData,
    clearAuthData,
  };
}
