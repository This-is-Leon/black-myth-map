import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import ejs from 'ejs'
import { getMarkerTmpl, getPopupTmpl } from '@/api'

import type { MarkerItem} from '../types'

// 缩放等级的限制
const ZOOM_LIMIT = { maxZoom: 12, minZoom: 9 } as const
const TILE_UTL_TEMP_01 = 'maps/{id}/{z}/{x}/{y}.webp' as const
const TILE_UTL_TEMP_02 = 'maps/{id}/{z}/{x}_{y}.webp' as const
const DEFAULT_MAP_ID = '48' as const

const TileUrlTempMap = new Map([
  ['48', TILE_UTL_TEMP_01],
  ['49', TILE_UTL_TEMP_01],
  ['61', TILE_UTL_TEMP_02],
])

export class MapInstance {
    private map: L.Map | void = void 0

    private tileLayer: L.TileLayer | void = void 0
    private zoomcontrol: L.Control.Zoom | void = void 0
    private markerLayer: L.LayerGroup | void = void 0

    private markerTmpl:string | void = void 0
    private popupTmpl:string | void = void 0

    constructor(private debug: boolean = false) {
        this.loadTemplates()
    }
    
    private async loadTemplates() {
        this.markerTmpl = await getMarkerTmpl()
        this.popupTmpl = await getPopupTmpl()
    }

    get isInit() {
        return !!this.map
    }

    init(target: HTMLElement) {
        this.map = L.map(target, {
            ...ZOOM_LIMIT,
            crs: L.CRS.Simple,
            zoom: 10, //初始缩放等级
            zoomControl: true,
            attributionControl: false,
            center: L.latLng(-0.5, 0.5),//地图中心点
            maxBounds: L.latLngBounds(L.latLng(0, 0), L.latLng(-1, 1))//地图边界
        })
        this.debug && this.map.on('click',(e) => console.warn('click cordinate', e.latlng))
    }

    renderTile(id:string=DEFAULT_MAP_ID) {
        //渲染地图瓦片
        if(!this.map) return //边界情况处理

        if(this.tileLayer) {

            this.markerLayer?.clearLayers()// 标记清楚
            this.tileLayer.remove() //移除旧的瓦片图层
            this.tileLayer = void 0
        }

        this.tileLayer = L.tileLayer(TileUrlTempMap.get(id)?? TILE_UTL_TEMP_01, {...ZOOM_LIMIT, id})
        this.tileLayer.addTo(this.map)
        // 初始化中心点和缩放等级
        this.map.setView(L.latLng(-0.5, 0.5), 10)

    }
    renderZoomControl() {
        if(!this.map) return //边界情况处理
        this.zoomcontrol = L.control.zoom({position: 'bottomright', zoomInTitle: '', zoomOutTitle: ''})
        this.zoomcontrol.addTo(this.map)
    }

    renderMarkers(marks: MarkerItem[]) {
        if(!this.map) return //边界情况处理

        this.markerLayer?.clearLayers()

        const markPoints = marks.map((mark) => {
            const {x, y , name, description, iconUrl} = mark
            const contentHtml = ejs.render(this.markerTmpl??'', {
                name,
                iconUrl
            })

            const marker = L.marker(L.latLng(x, y), {
                icon: L.divIcon({
                    className: 'marker-icon',
                    html: contentHtml
                })
            })
            // 绑定弹出
            marker.bindPopup(
                L.popup({
                    content: ejs.render(this.popupTmpl??'', {
                        name,
                        iconUrl,
                        description
                    })
                })
            )
            return marker
        })
        this.markerLayer = L.layerGroup(markPoints).addTo(this.map)
    }
}

export default MapInstance