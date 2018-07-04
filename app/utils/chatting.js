import axios from '~/plugins/axios'

export const createChatRoom = (sender_id, recipient_id, msg) => {
  if (!sender_id || !recipient_id || !msg) return 'Not enough datas.'

  const getConversationId = () => {
    let id
    if (sender_id > recipient_id) id = `${recipient_id}_${sender_id}`
    else id = `${sender_id}_${recipient_id}`

    return id
  }

  const API = `/api/data/inbox`
  const body = { sender_id, recipient_id, conversation_id: getConversationId(), body: msg }
  const chatRoomURL = `/dashboard/inbox/${getConversationId()}`

  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(API, { body })
      resolve(chatRoomURL)
    } catch (err) {
      console.log('on chat error', err)
      reject(err)
    }
  })
}
