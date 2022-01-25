import { Helmet } from 'react-helmet'
import ComicsList from '../comicsList/ComicsList'

import AppBanner from '../appBanner/AppBanner'

const ComicsPage = () => {
	return (
		<>
			<Helmet>
				<meta name='description' content='All comics list page' />
				<title> Comics | Marvel information portal</title>
			</Helmet>
			<AppBanner />
			<ComicsList />
		</>
	)
}

export default ComicsPage
