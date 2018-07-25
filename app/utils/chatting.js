import axios from '~/plugins/axios'

export const createChatRoom = (sender_id, recipient_id, msg, is_lead) => {
  if (!sender_id || !recipient_id || !msg) return 'Not enough datas.'

  const api = `/api/data/inbox`

  if (is_lead) recipient_id = recipient_id + 'L'

  const getConversationId = () => {
    if (is_lead) return `${sender_id}_${recipient_id}`
    else
      return sender_id > recipient_id
        ? `${recipient_id}_${sender_id}`
        : `${sender_id}_${recipient_id}`
  }

  const body = {
    sender_id,
    recipient_id,
    conversation_id: getConversationId(),
    body: msg
  }

  let chatRoomURL = `/dashboard/inbox/${getConversationId()}`

  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(api, { body })
      resolve(chatRoomURL)
    } catch (err) {
      console.log('on chat error', err)
      reject(err)
    }
  })
}
