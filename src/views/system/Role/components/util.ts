// 判断下层数据是否被选择
export const getChecked = (_record: any) => {
    const _children = _record?.children || []
    const _buttons = _record?.buttons || []
    if (!_children?.length) {
        if (!_buttons?.length) {
            return _record?.granted
        } else {
            return _buttons.every((i) => i.granted)
        }
    } else {
        return _children.every(item => getChecked(item))
    }
}

// 半选判断
export const getIndeterminate = (_record: any) => {
    const _children = _record?.children || []
    const _buttons = _record?.buttons || []
    if (!_children?.length) {
        if (!_buttons?.length) {
            return false
        } else {
            return _buttons.some((i) => i.granted)
        }
    } else {
        return _children.some(item => getIndeterminate(item))
    }
}

// 处理值
export const handleValue = (obj: any, flag: boolean) => {
    const _obj = {
        ...obj,
        granted: flag,
    }
    const buttons = (obj?.buttons || []).map((it: any) => {
        return {
            ...it,
            granted: flag,
        }
    })
    const children = (obj?.children || []).map((it: any) => {
        return handleValue(it, flag)
    })
    if (buttons?.length) {
        _obj.buttons = buttons
    }
    if (children?.length) {
        _obj.children = children
    }

    return _obj
}

// 查找数据并修改
export function findDataById(data: any[], obj: any) {
    return data.map((item) => {
        if (obj.id === item.id) {
            return obj
        } else {
            if (Array.isArray(item.children) && item.children.length > 0) {
                return {
                    ...item,
                    children: findDataById(item.children, obj)
                }
            } else {
                return item
            }
        }
    });
}

// 修改数据权限
export function updateData(data: any[], support: string) {
    return data.map((item) => {
        if (item.assetAccesses?.length && item.granted) {
            item.assetAccesses = item.assetAccesses.map(i => {
                return {
                    ...i,
                    enabled: i?.supportId === support,
                    granted: i?.supportId === support
                }
            })
        }
        if (Array.isArray(item.children) && item.children.length > 0) {
            return {
                ...item,
                children: updateData(item.children, support)
            }
        } else {
            return item
        }
    });
}