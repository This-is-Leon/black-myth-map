<script setup lang="ts">
import MapSelect from '@/components/MapSelect.vue'

defineOptions({ name: 'UiView' })
</script>

<template>
    <div class="scollbar-view">
        <div class="filter-container">
            <map-select />
        </div>
    </div>
</template>