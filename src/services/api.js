const api = {
	title: 'SHOM DATA',
	url: 'https://services.data.shom.fr/b2q8lrcdl4s04cbabsj4nhcb/hdm/spm/hlt?',

	// Params
	harborName: 'LA_ROCHELLE-PALLICE',
	duration: '1',
	// Date au format YYYY-MM-DD
	date: new Date().toISOString().slice(0,10),
	utc: 'standard',
	correlation: '1',

	headers: new Headers({
		'Content-Type': 'application/json',
		'Referer': 'https://maree.shom.fr/',
		'Cache-Control' : 'no-cache',
	}),

	buildUrl() {
		return this.url +
			'harborName=' + this.harborName +
			'&duration=' + this.duration +
			'&date=' + this.date +
			'&utc=' + this.utc +
			'&correlation=' + this.correlation
	},

	fetchTide() {
		fetch(
			this.buildUrl(),
			{
				method: 'GET',
				headers: this.headers,
				//referer: "https://maree.shom.fr/",
				//mode: 'no-cors',
			})
			.then(response => {
					//console.log(response);
					// Ne pas oublier le return!
					return response.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log("Erreur de récupération API " + error);
			}
		);
	}
}

export default api