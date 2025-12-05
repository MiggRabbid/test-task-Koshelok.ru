// Fake-функция для загрузки задач
const loadTasks = async () => {
	await new Promise((resolve) => setTimeout(resolve, 300));
	return [
		{
			id: 1,
			title: "Изучить Vue 3 Composition API",
			completed: true,
			createdAt: new Date("2024-01-15"),
			updatedAt: new Date("2024-01-20"),
			completedAt: new Date("2024-01-20"),
		},
		{
			id: 2,
			title: "Написать тестовое задание",
			completed: false,
			createdAt: new Date("2024-02-01"),
			updatedAt: new Date("2024-02-01"),
			completedAt: null,
		},
		{
			id: 3,
			title: "Рефакторинг legacy кода",
			completed: false,
			createdAt: new Date("2024-02-10"),
			updatedAt: new Date("2024-02-10"),
			completedAt: null,
		},
		{
			id: 4,
			title: "Изучить Pinia и лучшие практики",
			completed: true,
			createdAt: new Date("2024-01-25"),
			updatedAt: new Date("2024-01-30"),
			completedAt: new Date("2024-01-30"),
		},
	];
};

export { loadTasks };
