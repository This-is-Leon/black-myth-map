import type {MapListItem} from '@/types'
import {getMapList, getMapInfo} from '@/api'

export const useCommonStore = defineStore('common', () => {
    const mapId = ref(48)
    const mapList = ref<MapListItem[]>([])
    const mapInfo = ref<any>()

    const selectedMarkCatalogs = ref<number[]>([])

    function changeMapAction(id: number) {
        mapId.value = id
        // Todo：出发地图切换事件
        // 切换地图更新数据
        loadMapInfoAction()
    }

    function addMarkCatalogAction(id: number) {
        selectedMarkCatalogs.value = [...selectedMarkCatalogs.value, id]
        // 触发加载地图标点
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
 

    return {
        mapId,
        mapList,
        mapInfo,
        selectedMarkCatalogs,
        changeMapAction,
        loadMapListAction,
        loadMapInfoAction,
        addMarkCatalogAction,
        removeMarkCatalogAction
    }
})
