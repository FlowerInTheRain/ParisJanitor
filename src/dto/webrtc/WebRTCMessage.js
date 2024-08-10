export default class WebRTCMessage {
    constructor(type, content, adventureId, userId) {
        this.type = type
        this.content = content
        this.adventureId = adventureId
        this.userId = userId
    }
}