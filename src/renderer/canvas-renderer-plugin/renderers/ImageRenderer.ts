import { Image as ImageEntity } from "../../../entity-2d";
import { BaseRenderer } from "../BaseRenderer";

/**
 * 缓存获取过的图像数据
 */
const imageCache: Map<string, HTMLImageElement> = new Map();

class ImageRenderer extends BaseRenderer<ImageEntity> {
    render(entity: ImageEntity, context: CanvasRenderingContext2D): void {
        const image = this.getImageContent(entity);

        if (!image) {
            return;
        }

        const option = entity.style;

        const width = option.width || image.width;
        const height = option.height || image.height;

        context.drawImage(image, option.x, option.y, width, height);
    }

    /**
     * 从 ImageEntity 实体中获取图像数据
     */
    private getImageContent(entity: ImageEntity) {
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
                this.markDirty();
            }

            image.src = imageSrc;
        } else if (imageSrc instanceof HTMLImageElement) {
            // HTMLImageElement 直接返回即可
            return imageSrc;
        }
    }
}

export {
    ImageRenderer
}