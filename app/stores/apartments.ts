import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Apartment {
	id: string
	rooms: number
	area: number
	floor: number
	totalFloors: number
	price: number
	layout: string
}

export const useApartmentsStore = defineStore('apartments', () => {
	const allApartments = ref<Apartment[]>([])
	const filteredApartments = ref<Apartment[]>([])
	const visibleCount = ref(20)
	const perPage = ref(20)
	const isLoading = ref(false)
	const filters = ref({
		rooms: [] as number[],
		areaRange: [33, 123] as [number, number],
		priceRange: [5500000, 18900000] as [number, number],
		sortBy: 'area' as 'area' | 'floor' | 'price',
		sortDir: 'desc' as 'asc' | 'desc',
	})
	const uniqueRooms = computed(() =>  new Set(allApartments.value.map(ap => ap.rooms)))
	
	const loadData = async () => {
		if (allApartments.value.length > 0) return
		isLoading.value = true
		setTimeout(async () => {
			const response = await fetch('/data/apartments.json')
			allApartments.value = await response.json()
			isLoading.value = false
			console.log(uniqueRooms.value.has(1))
		}, 1500)
		applyFilters()
	}
	
	const applyFilters = () => {
		let filtered = allApartments.value.filter(ap => {
			const roomsMatch = filters.value.rooms.length === 0 || filters.value.rooms.includes(ap.rooms)
			const areaMatch = ap.area >= filters.value.areaRange[0] && ap.area <= filters.value.areaRange[1]
			const priceMatch = ap.price >= filters.value.priceRange[0] && ap.price <= filters.value.priceRange[1]
			return roomsMatch && areaMatch && priceMatch
		})
		
		filtered.sort((a, b) => {
			let valA = a[filters.value.sortBy]
			let valB = b[filters.value.sortBy]
			return filters.value.sortDir === 'asc' ? valA - valB : valB - valA
		})
		
		filteredApartments.value = filtered
		visibleCount.value = perPage.value
	}
	
	const showMore = () => {
		visibleCount.value += perPage.value
	}
	
	const resetFilters = () => {
		filters.value.rooms = []
		filters.value.areaRange = [33, 123]
		filters.value.priceRange = [5500000, 18900000]
		filters.value.sortBy = 'area'
		filters.value.sortDir = 'desc'
		applyFilters()
	}
	
	const visibleApartments = computed(() => filteredApartments.value.slice(0, visibleCount.value))
	const hasMore = computed(() => visibleCount.value < filteredApartments.value.length)
	
	const filterRoomsOptions = computed(() => [
		{ label: '1к', value: 1, disabled: !uniqueRooms.value.has(1) },
		{ label: '2к', value: 2, disabled: !uniqueRooms.value.has(2) },
		{ label: '3к', value: 3, disabled: !uniqueRooms.value.has(3) },
		{ label: '4к', value: 4, disabled: !uniqueRooms.value.has(4) },
	])
	
	
	return {
		allApartments,
		filteredApartments,
		visibleCount,
		perPage,
		isLoading,
		filters,
		loadData,
		applyFilters,
		showMore,
		resetFilters,
		visibleApartments,
		hasMore,
		filterRoomsOptions
	}
}, { persist: true })