import { useHttp } from '../hooks/http.hook'
const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp()

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/',
		_apiKey = 'apikey=ea5007991d26f11e6d528f7ae688a9f1',
		_baseOffset = '210'

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		)
		return res.data.results.map(__transformCharacter)
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
		return __transformCharacter(res.data.results[0])
	}
	const getCharacterName = async (nameChar) => {
		const res = await request(
			`${_apiBase}characters?name=${nameChar}&${_apiKey}`
		)
		return res.data.results.map(__transformCharacter)
	}

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
		return __transformComics(res.data.results[0])
	}

	const getAllComics = async () => {
		const res = await request(`${_apiBase}comics?limit=8&${_apiKey}`)
		return res.data.results.map(__transformComics)
	}

	const __transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || 'There is no description',
			prices: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: 'not available',
			thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
			language: comics.textObjects.language || 'en-us',
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: 'No information about the number of pages',
		}
	}

	const __transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		}
	}

	return {
		loading,
		error,
		getAllCharacters,
		getCharacter,
		clearError,
		getAllComics,
		getComic,
		getCharacterName,
	}
}

export default useMarvelService
