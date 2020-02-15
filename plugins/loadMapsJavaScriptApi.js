import { Loader } from 'google-maps'

export default async (_context, inject) => {
  const loader = new Loader(process.env.API_KEY)
  const google = await loader.load()

  inject('google', google)
}
