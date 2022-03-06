import { markDirty } from "../../dirty";
import { Image as ImageEntity } from "../../image";

const imageCache: Map<string, HTMLImageElement> = new Map()

export function getImageContent(entity: ImageEntity) {
    const { imageSrc } = entity;

    if (typeof imageSrc === 'string') {
        // step 1. 判断缓存中是否存在目标数据
        if (imageCache.has(imageSrc)) {
            return imageCache.get(imageSrc)!;
        }

        // step 2. 利用 Image 对象加载图像链接
        const image = new Image();
        image.onload = () => {
            // 加入缓存
            imageCache.set(imageSrc, image);
            // 图像数据加载完成，标记为脏数据，需要重新渲染
            markDirty(true);
        }

        image.src = imageSrc;
    } else if (imageSrc instanceof HTMLImageElement) {
        // HTMLImageElement 直接返回即可
        return imageSrc;
    }
}
