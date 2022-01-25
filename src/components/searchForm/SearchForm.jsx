import { useState } from 'react'
import { useForm, useEffect } from 'react-hook-form'
import useMarvelService from '../../services/MarvelService'

import './searchForm.scss'
import '../../style/button.scss'

const SearchForm = () => {
	const [char, setChar] = useState(null)
	// prettier-ignore
	const { register, handleSubmit, watch, formState: { errors } } = useForm()

	const { getCharacterName } = useMarvelService()

	const onSubmit = (data) => {
		getCharacterName(data.search).then(([res]) => setChar(res))
	}

	return (
		<div className='search'>
			<span className='search__title'>Or find a character by name:</span>
			<form className='search__form' onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('search', {
						required: { value: true, message: 'This field is required' },
					})}
					type='search'
					className='search__input'
					placeholder='Enter name'
				/>
				<button type='submit' className='button button__main'>
					<div className='inner'>FIND</div>
				</button>
				<div className='search__message'>
					{errors.search && <div>{errors.search.message}</div>}
					{char && <div>There is! Visit {char.name} page?</div>}
					{char === undefined && 'The character was not found. Check the name and try again'}
				</div>
				{char && (
					<a class='button button__secondary'>
						<div class='inner'>TO PAGE</div>
					</a>
				)}
			</form>
		</div>
	)
}

export default SearchForm
