import request from "@/utils/request"

export function getChatHistory(query?: Object) { // 获取对话历史
    return request({
        url: '/bridge/history/page',
        method: 'get',
        params: query
    })
}

export function openMasterChat(query?: Object) { // 打开主聊天eventsource连接
    return request({
        url: '/ai/master/open',
        method: 'get',
        params: query
    })
}

export function openServantChat(query?: Object) { // 打开纠错聊天eventsource连接
    return request({
        url: '/ai/servant/open',
        method: 'get',
        params: query
    })
}

export function sendChatMsg(query?: Object,pathId) { // 流式对话接口
    return request({
        url: `/bridge/gpt/sendOnStream/${pathId}`,
        method: 'get',
        params: query
    })
}
