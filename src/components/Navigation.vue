<template>
    <nav class="navigation">
        <RouterLink
            v-for="(point) in Object.keys(cocktailsEnum.enum)"
            :key="point"
            :to="`/${point}`"
            :class="{ 'navigation__point_current': route.params.cocktail === point }"
            class="navigation__point"
        >
            {{ point }}
        </RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { cocktailsEnum } from '@/types/cocktails'

const route = useRoute()
</script>

<style scoped lang="scss">
.navigation {
    border-right: 1px solid black;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    &__point {
        padding: 0 10px;
        text-decoration: none;
        text-transform: capitalize;
        &_current {
            background-color: lightgray;
        }
    }
}
</style>