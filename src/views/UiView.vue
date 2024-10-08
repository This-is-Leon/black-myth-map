<script setup lang="ts">
import { useCommonStore } from '@/stores/common'
import MapSelect from '@/components/MapSelect.vue'
import MarkerGroup from '@/components/MarkerGroup.vue'

defineOptions({ name: 'UiView' })

const commonStore = useCommonStore()
const markCatalogGroups = computed(() => commonStore.mapInfo?.landmarkCatalogGroups ?? [])

function handleMarkerGroupSelect(id: number) {
  if (commonStore.selectedMarkCatalogs.includes(id)) {
    commonStore.removeMarkCatalogAction(id)
    return
  }
  commonStore.addMarkCatalogAction(id)
}

onMounted(() => {
  commonStore.loadMapListAction(), commonStore.loadMapInfoAction()
})
</script>

<template>
    <div class="scollbar-view">
        <div class="filter-container">
            <div class="navigator-logo">
                <img src="@/assets/logo.png" alt="logo">
            </div>
            <map-select :items="commonStore.mapList" :selected-id="commonStore.mapId" @select="commonStore.changeMapAction($event)" />
            <template v-if="markCatalogGroups">
                <marker-group v-for="group in markCatalogGroups" :key="group.id" :title="group.groupName" :items="group.landmarkCatalogs"
                    :selected-ids="commonStore.selectedMarkCatalogs" @select="handleMarkerGroupSelect" />
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.scollbar-view {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 344px;
  height: 100%;
  background-color: #222226;
  .filter-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .navigator-logo {
    margin-bottom: 20px;
    width: 100%;
    height: auto;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}
</style>