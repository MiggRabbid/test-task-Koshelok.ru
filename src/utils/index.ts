export const formatDate = (date: Date | null) => {
	if (!date) return "—";
	return new Intl.DateTimeFormat("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(date));
};

export const getTime = (date?: Date) => {
	if (!date) {
		const date = new Date();
		return date.getTime();
	} 
	return date.getTime();
};
