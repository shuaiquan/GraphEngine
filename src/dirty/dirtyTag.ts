let dirtyTag = true;

/**
 * 标记当前的 dirtyTag
 * @param tag dirtyTag 值
 */
export function markDirty(tag: boolean) {
    dirtyTag = tag;
}

/**
 * 获取当前的 dirtyTag 值
 */
export function getDirtyTag() {
    return dirtyTag;
}
