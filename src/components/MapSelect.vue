<script setup lang="ts">
import type { MapListItem } from '@/types'

interface Item {
  id: number
  name: string
  regionName: string
}

defineOptions({ name: 'MapSelect' })

defineProps<{
  items: MapListItem[]
  selectedId: number
}>()

const emit = defineEmits<{
  (e: 'select', id: number): void
}>()
</script>
<template>
    <div class="map-select">
        <div v-for="item in items" class="map-select-item" :class="{cur:item.id === selectedId}" :key="item.id" @click="emit('select', item.id)">
            {{ item.regionName }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.map-select {
  display: grid;
  grid-gap: 16px 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 20px;
  padding-top: 40px;
  .map-select-item {
    height: 32px;
    text-align: center;
    line-height: 32px;
    background: #46464c;
    color: #d7d7d9;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    &.cur {
      background: #eac27e;
      color: #222;
    }
  }
}
</style>