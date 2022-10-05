const middleware = {
	title: 'SM',
	url: 'http://localhost:5000',

	buildUrl() {
		return this.url
	},

	async fetchTide() {
		let data = ''

		data = await fetch(
			this.buildUrl(),
			{
				method: 'GET',
			})
			.then(response => {
					//console.log(response);
					// Ne pas oublier le return!
					return response.json();
			})
			.then(data => {
				//console.log(data);

				// Save local
				this.saveInLocal( data );

				return data;
			})
			.catch(error => {
				console.log("Erreur de récupération API " + error);
			}
		);

		return data
	},

	saveInLocal( tideDatas ) {

		window.localStorage.setItem( 'tideData', JSON.stringify(tideDatas) );
		window.localStorage.setItem( 'tideData_createdAt', new Date().toISOString() );

	}
}

export default middleware