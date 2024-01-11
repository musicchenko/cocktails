import axios from 'axios'
import type { Cocktail } from '@/interfaces/cocktails'
import type { Cocktails } from '@/types/cocktails'
import { useCocktailsStore } from '@/stores/cocktails'

export const useCocktailsAPI = () => {
    async function get (name: Cocktails) {
        const { data } = await axios.get<{ drinks: Cocktail[] }>(`${import.meta.env.VITE_API_URI}${name}`)
        const cocktailsStore = useCocktailsStore()
        cocktailsStore.cocktails[name] = data.drinks[0]
    }

    return {
        get
    }
}