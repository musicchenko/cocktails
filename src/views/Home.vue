<template>
    <div class="home">
        <Navigation />
        <Content
            v-if="!isNotFound"
            :loading="isLoading"
        />
        <NotFound
            v-else
            class="home__not-found"
        />
    </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCocktailsStore } from '@/stores/cocktails'
import { cocktailsEnum, type Cocktails } from '@/types/cocktails'
import Navigation from '@/components/Navigation.vue'
import Content from '@/components/Content.vue'
import NotFound from '@/components/NotFound.vue'
import { useCocktailsAPI } from '@/api/cocktails'

const route = useRoute()

const cocktailsAPI = useCocktailsAPI()

const { cocktails } = storeToRefs(useCocktailsStore())

const isLoading = ref(!cocktails.value[route.params.cocktail as keyof typeof cocktails.value])

const isNotFound = computed(() => !Object.keys(cocktailsEnum.enum).includes(route.params.cocktail as string))

watch(() => route.params.cocktail, async () => {
    if (!isNotFound.value && !cocktails.value[route.params.cocktail as keyof typeof cocktails.value]) {
        isLoading.value = true
        await cocktailsAPI.get(route.params.cocktail as Cocktails)
        isLoading.value = false
    }
}, { immediate: true })
</script>

<style scoped lang="scss">
.home {
    display: flex;
    width: 100%;
    max-width: $max-interface-width;
    min-width: $min-interface-width;
    border: 1px solid black;
    box-sizing: border-box;
    @include desktop {
        width: $max-interface-width;
    }
    &__not-found {
        width: 100%;
    }
}
</style>
