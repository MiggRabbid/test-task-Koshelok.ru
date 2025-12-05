export interface ITask {
	id: number;
	title: string;
	completed: boolean;
	createdAt: Date;
	updatedAt?: Date;
	completedAt: Date | null;
}

export type TypeTasks = ITask[];

export enum TypeFilter {
	All = "all",
	Active = "active",
	Completed = "completed",
}

export type TypeUserFilter = Exclude<TypeFilter, TypeFilter.Completed>;

export interface IDeletionTimer {
	timerId: number;
	timeLeft: number;
}

export interface DeletionTimer {
	timerId: number;
	timeLeft: number;
}

export interface ITasksStats {
	total: number;
	active: number;
	completed: number;
	percentage: string;
}

export type TypeChangeAction = "added" | "completed" | "deleted" | "updated";

export interface IChangeLog {
	id: number;
	action: TypeChangeAction;
	taskTitle: string;
	timestamp: Date;
}

export type TypeChangeLog = IChangeLog[];
