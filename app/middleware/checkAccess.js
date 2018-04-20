import axios from '~/plugins/axios'

export default async ({req, store, query, redirect}) => {
  const user_id = store.getters['auth/GET_ACCOUNT'].account_id
  const product_id = query.id
  const { data } = await axios.get(`/api/data/product/product_id/${product_id}`)
  const isAccepted = user_id === data.account_id

  // when product does not exist
  if (!data) redirect('/dashboard/product')

  // when this product is not this user's product
  if (!isAccepted) redirect('/dashboard/product')
}
