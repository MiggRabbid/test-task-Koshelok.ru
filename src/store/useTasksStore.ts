import { defineStore } from "pinia";
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
	type ITask,
	type ITasksStats,
	TypeFilter,
	type TypeTasks,
} from "@/types";
import { useLocalStorage } from "@/hooks";
import { loadTasks } from "@/api";
import { useChangeLogStore } from ".";
import { getTime } from '@/utils';

// Стор для хранения задач
export const useTasksStore = defineStore("tasks", () => {
	// Создаем экземпляр store для логов
	const changeLogStore = useChangeLogStore();

	const { localValue, setLocalStorage } = useLocalStorage<TypeTasks>("tasks");

	const tasks = ref<TypeTasks>([]);
	const currentFilter = ref<TypeFilter>(TypeFilter.All);

	const pendingDeletions = ref<Set<number>>(new Set());
	const deletionTimers = ref<
		Record<number, { timerId: number; timeLeft: number }>
	>({});

	// При монтировании загружаем задачи
	onMounted(async () => {
		if (!localValue || localValue.length === 0) {
			const loadedTasks = await loadTasks();
			tasks.value = loadedTasks;
			changeLogStore.updateChangeLog([]);
		} else {
			tasks.value = localValue;
		}
	});

	const filteredTasks = computed(() => {
		switch (currentFilter.value) {
			case TypeFilter.Active:
				return tasks.value.filter((task) => !task.completed);
			case TypeFilter.Completed:
				return tasks.value.filter((task) => task.completed);
			default:
				return tasks.value;
		}
	});

	const taskStats = computed<ITasksStats>(() => {
		const total = tasks.value.length;
		const active = tasks.value.filter((task) => !task.completed).length;
		const completed = tasks.value.filter((task) => task.completed).length;
		const percentage = total > 0 ? ((completed / total) * 100).toFixed(1) : "0";
		return { total, active, completed, percentage };
	});

	const addTask = (title: string) => {
		if (!title.trim()) return;

		const newTask: ITask = {
			id: getTime(),
			title,
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			completedAt: null,
		};

		tasks.value.push(newTask);
		setLocalStorage(tasks.value);
		changeLogStore.addChangeLog("added", title);
	};

	const toggleTask = (id: number) => {
		const task = tasks.value.find((task) => task.id === id);
		if (task) {
			task.completed = !task.completed;
			task.updatedAt = new Date();
			task.completedAt = task.completed ? new Date() : null;
			setLocalStorage(tasks.value);
			changeLogStore.addChangeLog(
				task.completed ? "completed" : "updated",
				task.title,
			);
		}
	};

	const startDeletion = (id: number) => {
		pendingDeletions.value.add(id);
		const timerId = setInterval(() => {
			if (deletionTimers.value[id]) {
				deletionTimers.value[id].timeLeft--;
				if (deletionTimers.value[id].timeLeft <= 0) {
					const deletedTask = tasks.value.find((task) => task.id === id);
					tasks.value = tasks.value.filter((task) => task.id !== id);

					pendingDeletions.value.delete(id);
					clearInterval(deletionTimers.value[id].timerId);
					delete deletionTimers.value[id];

					setLocalStorage(tasks.value);
					changeLogStore.addChangeLog(
						"deleted",
						deletedTask ? deletedTask.title : "Неизвестная задача",
					);
				}
			}
		}, 1000);

		deletionTimers.value[id] = { timerId, timeLeft: 10 };
	};

	const cancelDeletion = (id: number) => {
		pendingDeletions.value.delete(id);
		const timer = deletionTimers.value[id];
		if (timer) {
			clearInterval(timer.timerId);
			delete deletionTimers.value[id];
		}
	};

	const setFilter = (filter: TypeFilter) => {
		currentFilter.value = filter;
	};

	onUnmounted(() => {
		Object.values(deletionTimers.value).forEach((timer) => {
			clearInterval(timer.timerId);
		});
	});

	return {
		tasks,
		currentFilter,
		filteredTasks,
		taskStats,
		setFilter,
		addTask,
		toggleTask,
		startDeletion,
		cancelDeletion,
		pendingDeletions,
		deletionTimers,
	};
});
