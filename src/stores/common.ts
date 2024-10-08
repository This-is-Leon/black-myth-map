import type {MapListItem, MarkerItem} from '@/types'
import {getMapList, getMapInfo, getMarkList} from '@/api'

export const useCommonStore = defineStore('common', () => {
    const mapId = ref(48)
    const mapList = ref<MapListItem[]>([])
    const mapInfo = ref<any>()
    const markers = ref<MarkerItem[]>([])

    const selectedMarkCatalogs = ref<number[]>([])

    function changeMapAction(id: number) {
        mapId.value = id
        // 每次清空进来的标点数据
        selectedMarkCatalogs.value = []
        // Todo：出发地图切换事件
        // 切换地图更新数据
        loadMapInfoAction()
        // 获取标点数据
        loadMarkerListAction()
    }

    function addMarkCatalogAction(id: number) {
        selectedMarkCatalogs.value = [...selectedMarkCatalogs.value, id]
        // 触发加载地图标点
        loadMarkerListAction()
    }
    function removeMarkCatalogAction(id: number) {
        selectedMarkCatalogs.value = selectedMarkCatalogs.value.filter(item => item!==id)
        // 触发加载地图标点
    }

       // 选择哪副地图
    async function loadMapInfoAction() {
        mapInfo.value = await getMapInfo( mapId.value)
    }

    // 一幅大地图由很多张小图组成
    async function loadMapListAction() {
        mapList.value = await getMapList()
    }
    // 加载地图图标
    async function loadMarkerListAction() {
        markers.value = await getMarkList()
    }
 

    return {
        mapId,
        mapList,
        mapInfo,
        markers,
        selectedMarkCatalogs,
        changeMapAction,
        loadMapListAction,
        loadMapInfoAction,
        addMarkCatalogAction,
        removeMarkCatalogAction,
        loadMarkerListAction
    }
})
