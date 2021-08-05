import { useState, useEffect } from 'react'
import { FilterSegment, Section, FilterDate } from '../molecules'
import { useRouter } from 'next/router'

const CategoryPaths = [
	{
		text: 'Promocja',
		path: 'promo'
	},
	{
		text: 'Limitowane',
		path: 'limited',
	},
	{
		text: 'Prezent',
		path: 'gift'
	},
]

const FormatPaths = [
	{
		text: 'Winyl',
		path: 'vinyl'
	},
	{
		text: 'CD',
		path: 'CD'
	},
]

export const GenrePaths = [
	{
		text: "Wszystkie gatunki",
		path: ""
	},
	{
		text: 'Rock',
		path: 'rock'
	},
	{
		text: 'Metal',
		path: 'metal'
	},
	{
		text: 'Pop',
		path: 'pop'
	},
]

const CountryPaths = [
	{
		text: 'Polska',
		path: 'Poland',
	},
	{
		text: 'Norwegia',
		path: 'Norway',
	},
	{
		text: 'USA',
		path: 'USA',
	},
]
export const StylePaths = [
	{
		text: "Wszystkie Style",
		path: ""
	},
	{
		text: 'Hard Rock',
		path: 'hard rock'
	},
	{
		text: 'Heavy Metal',
		path: 'heavy metal'
	},
	{
		text: 'American Pop',
		path: 'american pop'
	},
	{
		text: 'New Wave',
		path: 'new wave'
	},
	{
		text: 'Black Metal',
		path: 'black metal'
	},
	{
		text: 'Progresive Rock',
		path: 'progresive rock'
	},
]

const FilterMenu = () => {

	const [Category, setCategory] = useState([])
	const [Genre, setGenre] = useState([])
	const [Country, setCountry] = useState([])
	const [Style, setStyle] = useState([])
	const [FromDate, setFromDate] = useState('')
	const [ToDate, setToDate] = useState('')
	const router = useRouter()
	useValuesFromURL(setCategory, setGenre, setCountry, setStyle, setFromDate, setToDate)

	const FilterProducts = () => {
		let FDateQuery = "", TDateQuery = ""
		let category = setQuery("category", Category)
		let genre = setQuery("&genre", Genre)
		let country = setQuery("&country", Country)
		let style = setQuery("&style", Style)

		if (FromDate) {
			let fdate = new Date(FromDate)
			FDateQuery = setQuery("&fdate", [fdate.getTime()])
		}
		if (ToDate) {
			let tdate = new Date(ToDate)
			TDateQuery = setQuery("&tdate", [tdate.getTime()])
		}



		let url = category + genre + country + FDateQuery + TDateQuery + style
		router.push("products?" + url)
	}


	return (
		<Section title="Filtry" className="filters">
			<FilterSegment paths={CategoryPaths} Parameters={Category} setParameters={setCategory} />
			<FilterSegment paths={FormatPaths} Parameters={Category} setParameters={setCategory} />
			<FilterSegment paths={GenrePaths} Parameters={Genre} setParameters={setGenre} one />
			<FilterSegment paths={CountryPaths} Parameters={Country} setParameters={setCountry} one />
			<FilterSegment paths={StylePaths} Parameters={Style} setParameters={setStyle} one />
			<FilterDate value={FromDate} setValue={setFromDate} />
			<FilterDate value={ToDate} setValue={setToDate} />
			<button onClick={FilterProducts} >Dupa, filtruj się </button>
		</Section>
	)
}

const setQuery = (name, parameters) => {
	if (parameters.length === 1) {
		return name + "=" + parameters[0]
	}
	else if (parameters.length) {
		return name + "=" + parameters.join(',')
	}
	else return ''
}


const useValuesFromURL = (setCategory, setGenre, setCountry, setStyle, setFromDate, setToDate) => {
	const router = useRouter()
	const [Changed, setChanged] = useState("")
	const { category, genre, country, style, fdate, tdate } = useSplitUrl()
	useEffect(() => {
		if (router.isReady) {
			setFromDate(parseDate(fdate))
			setToDate(parseDate(tdate, true))
			searchAndSet(CategoryPaths, category)
			searchAndSet(FormatPaths, category)
			searchAndSet(GenrePaths, genre)
			searchAndSet(CountryPaths, country)
			searchAndSet(StylePaths, style)
			setCategory(category)
			setGenre(genre)
			setCountry(country)
			setChanged(!Changed)

		}
	}, [])
	useEffect(() => {

		if (router.isReady) {
			setFromDate(parseDate(fdate))
			setToDate(parseDate(tdate, true))
			searchAndSet(CategoryPaths, category)
			searchAndSet(FormatPaths, category)
			searchAndSet(GenrePaths, genre)
			searchAndSet(CountryPaths, country)
			searchAndSet(StylePaths, style)
			setCategory(category)
			setGenre(genre)
			setCountry(country)
			setChanged(!Changed)

		}
	}, [router.query])
}


const parseDate = (date, to) => {

	if (!date) {
		return null
	}
	else {
		let newDate = new Date(parseInt(date))
		return newDate.toISOString().substring(0, 10)
	}
}

/**
 * @param {Object[]} array
 */

const searchAndSet = (array, params) => {
	array.forEach(value => {
		value.checked = false
	})

	if (!params[0]) {
	}
	else if (typeof params === 'string') {
		array.forEach(value => {
			if (value.path === params) {
				value.checked = true
			}
		})
	}
	else {
		array.forEach(value => {
			params.forEach(param => {
				if (value.path === param) {
					value.checked = true
				}
			})
		})
	}
}

const useSplitUrl = () => {
	let router = useRouter()
	let category = [], genre = [], country = [], style = [], fdate = '', tdate = ''
	if (router.isReady) {
		if (router.query.category) category = router.query.category.split(',')
		if (router.query.genre) genre = router.query.genre.split(",")
		if (router.query.country) country = router.query.country.split(",")
		if (router.query.style) style = router.query.style.split(",")
		if (router.query.fdate) fdate = router.query.fdate
		if (router.query.tdate) tdate = router.query.tdate

	}
	return { category, genre, country, style, fdate, tdate }
}

export default FilterMenu