import { Loader } from 'google-maps'

// .env に Maps JavaScript API が有効になった API KEY を定義すること
const API_KEY = process.env.API_KEY

export default async (_context, inject) => {
  const options = {
    libraries: ['geometry', 'places', 'visualization']
  }
  const loader = new Loader(API_KEY, options)
  const google = await loader.load()

  inject('google', google)
}
