export function splitBigNumber(bigNumber: number | string): string {
	return Number(bigNumber).toLocaleString('ru', { useGrouping: true })
}