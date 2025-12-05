// Хук для работы с localStorage
const useLocalStorage = <T extends Array<unknown>>(
	key: "tasks" | "changeLog",
) => {
	const setLocalStorage = (value: T) =>
		localStorage.setItem(key, JSON.stringify(value));

	const getLocalStorage = (): T | null => {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	};

	const localValue = getLocalStorage();

	return {
		localValue,
		setLocalStorage,
		getLocalStorage,
	};
};

export default useLocalStorage;
