import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Cocktails } from '@/types/cocktails'
import type { Cocktail } from '@/interfaces/cocktails'
import { cocktailsEnum } from '@/types/cocktails'

export const useCocktailsStore = defineStore('cocktails', () => {
    const cocktails = reactive<{
        [key in Cocktails]: Cocktail | undefined
    }>({
        [cocktailsEnum.enum.margarita]: undefined,
        [cocktailsEnum.enum.mojito]: undefined,
        [cocktailsEnum.enum.a1]: undefined,
        [cocktailsEnum.enum.kir]: undefined
    })

    return { cocktails }
})
