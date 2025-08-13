interface Apartment {
	id: string
	rooms: number
	area: number
	floor: number
	totalFloors: number
	price: number
	layout: string
}

interface State {
	allApartments: Apartment[]
	filteredApartments: Apartment[]
	visibleCount: number
	perPage: number
	loading: boolean
	filters: {
		rooms: number[]
		areaRange: [number, number]
		priceRange: [number, number]
		sortBy: 'area' | 'floor' | 'price'
		sortDir: 'asc' | 'desc'
	}
}

export const useApartmentsStore = defineStore('apartments', {
	state: (): State => ({
		allApartments: [],
		filteredApartments: [],
		visibleCount: 20,
		perPage: 20,
		loading: false,
		filters: {
			rooms: [],
			areaRange: [33, 123],
			priceRange: [5500000, 18900000],
			sortBy: 'area',
			sortDir: 'desc',
		},
	}),
	persist: true, // Save to localStorage
	actions: {
		async loadData() {
			if (this.allApartments.length > 0) return
			const response = await fetch('/data/apartments.json')
			this.allApartments = await response.json()
			this.applyFilters()
		},
		applyFilters() {
			this.loading = true
			setTimeout(() => {
				let filtered = this.allApartments.filter(ap => {
					const roomsMatch = this.filters.rooms.length === 0 || this.filters.rooms.includes(ap.rooms)
					const areaMatch = ap.area >= this.filters.areaRange[0] && ap.area <= this.filters.areaRange[1]
					const priceMatch = ap.price >= this.filters.priceRange[0] && ap.price <= this.filters.priceRange[1]
					return roomsMatch && areaMatch && priceMatch
				})
				
				// Sort
				filtered.sort((a, b) => {
					let valA = a[this.filters.sortBy]
					let valB = b[this.filters.sortBy]
					return this.filters.sortDir === 'asc' ? valA - valB : valB - valA
				})
				
				this.filteredApartments = filtered
				this.visibleCount = this.perPage
				this.loading = false
			}, 21500)
		},
		showMore() {
			this.visibleCount += this.perPage
		},
		resetFilters() {
			this.filters.rooms = []
			this.filters.areaRange = [33, 123]
			this.filters.priceRange = [5500000, 18900000]
			this.filters.sortBy = 'area'
			this.filters.sortDir = 'desc'
			this.applyFilters()
		},
	},
	getters: {
		visibleApartments: (state) => state.filteredApartments.slice(0, state.visibleCount),
		hasMore: (state) => state.visibleCount < state.filteredApartments.length,
	},
})