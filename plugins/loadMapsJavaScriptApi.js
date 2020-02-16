import { Loader } from 'google-maps'

export default async (_context, inject) => {
  const options = {
    libraries: ['geometry', 'places', 'visualization']
  }
  const loader = new Loader(process.env.API_KEY, options)
  const google = await loader.load()

  inject('google', google)
}
