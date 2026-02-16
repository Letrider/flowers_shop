// Конфигурация API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const config = {
	apiUrl: API_BASE_URL,
	apiEndpoint: `${API_BASE_URL}/api`,
};

// Вспомогательная функция для формирования полных URL
export const getFullUrl = (path: string) => {
	if (path.startsWith('http')) return path;
	return `${API_BASE_URL}${path}`;
};
