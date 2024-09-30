<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { markers } from './_data'
import { useCommonStore } from '@/stores/common'

import MapInstance from '@/logics/MapInstance'

defineOptions({ name: 'MapView' })

const mapRef = useTemplateRef('map')
const mapInstance = new MapInstance(true)

const commonStore = useCommonStore()

function initMap() {
  if (mapRef.value == null) {
    console.warn('map element is not found')
    return
  }
  mapInstance.init(mapRef.value)
  // 渲染地图
  mapInstance.renderTile()
  // 缩放按钮
  //   mapInstance.renderZoomControl()
  setTimeout(() => {
    mapInstance.renderMarketLayer(markers.map((item) => item._custom.value) as any)
  }, 100)
}

onMounted(() => {
  initMap()
})

watch(
  () => commonStore.mapId,
  (id) => mapInstance.renderTile(id + '')
)
</script>

<template>
    <div class="map-wrapper" ref="map"></div>
</template>

<style lang="scss" scoped>
.map-wrapper {
  position: absolute;
  top: 0;
  left: 344px;
  width: calc(100% - 344px);
  height: 100%;
  z-index: 1;
}
</style>