export interface MarkerItem {
    x: number,
    y: number,
    id: number,
    name: string,
    description: string,
    iconUrl: string
}

export interface MapListItem {
    id: number,
    name: string,
    regionName: string
}

export interface CatalogItem {
    id: number,
    name: string,
    iconUrl: string,
    landmarksCount: number,
}