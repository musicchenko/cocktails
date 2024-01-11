<template>
    <div class="content">
        <h2
            v-if="loading"
            class="content__loading-title"
        >
            Loading...
        </h2>
        <template v-else-if="selectedCocktail">
            <div class="content__block">
                <div
                    v-for="(info, index) of infos"
                    :key="'info-' + index"
                    class="content__block"
                >
                    <h2
                        v-if="!index"
                        class="content__title content__title_without-top-margin"
                    >
                        {{ info.title }}
                    </h2>
                    <h3
                        v-else
                        class="content__title"
                    >
                        {{ info.title }}
                    </h3>
                    <p
                        v-for="(row, index) of info.rows"
                        :key="'info-row-' + index"
                        class="content__row"
                    >
                        {{ row }}
                    </p>
                </div>
                <div class="content__block">
                    <h3 class="content__title">List of ingredients:</h3>
                    <table>
                        <template
                            v-for="index in MEASURE_COUNT"
                            :key="'measure-' + index"
                        >
                            <tr
                                v-if="
                                    selectedCocktail[
                                        `strMeasure${index}` as keyof typeof selectedCocktail
                                    ]
                                "
                            >
                                <td>
                                    {{
                                        selectedCocktail[
                                            `strMeasure${index}` as keyof typeof selectedCocktail
                                        ]
                                    }}
                                </td>
                                <td>
                                    {{
                                        selectedCocktail[
                                            `strIngredient${index}` as keyof typeof selectedCocktail
                                        ]
                                    }}
                                </td>
                            </tr>
                        </template>
                    </table>
                </div>
            </div>
            <div
                v-if="!isImageLoaded"
                class="content__thumb-placeholder"
            />
            <img
                v-else
                :src="thumb?.src"
                class="content__thumb"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { MEASURE_COUNT } from '@/constants/cocktails'
import { useCocktailsStore } from '@/stores/cocktails'

defineProps<{ loading: boolean }>()

const route = useRoute()

const { cocktails } = storeToRefs(useCocktailsStore())

const isImageLoaded = ref(false)
const thumb = ref<HTMLImageElement>()

const selectedCocktail = computed(() => {
    return cocktails.value[route.params.cocktail as keyof typeof cocktails.value]
})

const infos = computed(() => {
    return [
        {
            title: selectedCocktail.value?.strDrink,
            rows: [
                selectedCocktail.value?.strCategory,
                selectedCocktail.value?.strAlcoholic,
                selectedCocktail.value?.strGlass
            ]
        },
        {
            title: 'Instructions:',
            rows: [selectedCocktail.value?.strInstructions]
        }
    ]
})

watch(
    () => selectedCocktail.value,
    () => {
        if (selectedCocktail.value) {
            thumb.value = new Image()
            thumb.value.onload = () => {
                isImageLoaded.value = true
            }
            thumb.value.src = selectedCocktail.value.strDrinkThumb
        }
    },
    { immediate: true }
)
</script>

<style scoped lang="scss">
.content {
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    padding: 20px;
    @media (max-width: #{calc($max-interface-width / 2)}) {
        flex-direction: column-reverse;
    }
    &__title {
        &_without-top-margin {
            margin-top: 0;
        }
    }
    &__loading-title {
        width: 100%;
        text-align: center;
    }
    &__row {
        margin: 0;
    }
    &__thumb {
        display: flex;
        width: $thumb-desktop-width;
        height: $thumb-desktop-height;
        @include mobile {
            width: $thumb-mobile-width;
            height: $thumb-mobile-height;
        }
    }
    &__thumb-placeholder {
        display: flex;
        background-color: lightgray;
        min-width: $thumb-desktop-width;
        height: $thumb-desktop-height;
        @include mobile {
            min-width: $thumb-mobile-width;
            max-width: $thumb-mobile-width;
            height: $thumb-mobile-height;
        }
    }
}
</style>
