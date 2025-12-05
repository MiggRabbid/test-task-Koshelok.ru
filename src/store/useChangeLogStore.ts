import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import type { IChangeLog, TypeChangeAction, TypeChangeLog } from "@/types";
import { useLocalStorage } from "@/hooks";
import { getTime } from "@/utils";

// Стор для хранения логов
export const useChangeLogStore = defineStore("changeLog", () => {
	const { localValue, setLocalStorage } =
		useLocalStorage<TypeChangeLog>("changeLog");

	const changeLog = ref<TypeChangeLog>([]);

	// Добавление записи в лог изменений
	const addChangeLog = (action: TypeChangeAction, taskTitle: string) => {
		const taskTitleShort =
			taskTitle.length > 15 ? `${taskTitle.slice(0, 15)}...` : taskTitle;
		const logEntry: IChangeLog = {
			id: getTime(),
			action,
			taskTitle: taskTitleShort,
			timestamp: new Date(),
		};

		changeLog.value.unshift(logEntry);
		setLocalStorage(changeLog.value);
	};

	onMounted(() => {
		if (localValue && localValue.length > 0) {
			changeLog.value = localValue;
		}
	});

	// Функция для обновления логов
	const updateChangeLog = (newChangeLog: TypeChangeLog) => {
		changeLog.value = newChangeLog;
		setLocalStorage(newChangeLog);
	};

	return {
		changeLog,
		addChangeLog,
		updateChangeLog,
	};
});
