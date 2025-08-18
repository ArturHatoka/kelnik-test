import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Apartment {
	id: number
	rooms: number
	area: number
	floor: number
	price: number
	layout: string
}

interface Filters {
	rooms: number[]
	areaRange: [number, number]
	priceRange: [number, number]
	sortBy: 'area' | 'floor' | 'price'
	sortDir: 'asc' | 'desc'
}

export const useApartmentsStore = defineStore('apartments', () => {
	const allApartments = ref<Apartment[]>([])
	
	const visibleCount = ref(20)
	const perPage = ref(20)
	const isLoading = ref(false)
	
	const filters = ref<Filters>({
		rooms: [],
		areaRange: [33, 123],
		priceRange: [5_500_000, 18_900_000],
		sortBy: 'area',
		sortDir: 'desc',
	})
	
	const filteredApartments = computed(() => {
		return allApartments.value
			.filter(ap => {
				const roomsMatch = !filters.value.rooms.length || filters.value.rooms.includes(ap.rooms)
				const areaMatch = ap.area >= filters.value.areaRange[0] && ap.area <= filters.value.areaRange[1]
				const priceMatch = ap.price >= filters.value.priceRange[0] && ap.price <= filters.value.priceRange[1]
				return roomsMatch && areaMatch && priceMatch
			})
			.sort((a, b) => {
				const field = filters.value.sortBy
				const dir = filters.value.sortDir
				return dir === 'asc' ? a[field] - b[field] : b[field] - a[field]
			})
	})
	
	const visibleApartments = computed(() => filteredApartments.value.slice(0, visibleCount.value))
	const hasMore = computed(() => visibleCount.value < filteredApartments.value.length)
	
	const uniqueRooms = computed(() => new Set(allApartments.value.map(a => a.rooms)))
	const filterRoomsOptions = computed(() => [1, 2, 3, 4].map(n => ({ label: `${n}к`, value: n, disabled: !uniqueRooms.value.has(n) })))
	
	const loadData = async () => {
		if (allApartments.value.length) return
		
		isLoading.value = true
		
		await new Promise(res => setTimeout(res, 1500))
		const response = await fetch('/data/apartments.json')
		allApartments.value = await response.json()
		
		isLoading.value = false
	}
	
	const showMore = () => {
		visibleCount.value += perPage.value
	}
	
	const resetFilters = () => {
		filters.value = {
			rooms: [],
			areaRange: [33, 123],
			priceRange: [5_500_000, 18_900_000],
			sortBy: 'area',
			sortDir: 'desc',
		}
		
		visibleCount.value = perPage.value
	}
	
	function setSort(field: 'area' | 'floor' | 'price', dir: 'asc' | 'desc') {
		if (filters.value.sortBy !== field) {
			filters.value.sortBy = field
			filters.value.sortDir = 'asc'
		} else {
			filters.value.sortDir = dir
		}
	}
	
	return {
		allApartments,
		filteredApartments,
		visibleCount,
		perPage,
		isLoading,
		filters,
		loadData,
		showMore,
		resetFilters,
		visibleApartments,
		hasMore,
		filterRoomsOptions,
		setSort
	}
}, { persist: true })