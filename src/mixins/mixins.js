import moment from 'moment'

const date = {
    today() {
        return moment().format('YYYY-MM-DD');
    },

    getDateFromStringToString( dateInString ) {
        return moment(dateInString).format('YYYY-MM-DD HH:MM');
    },

	dateDiff(date1, date2) {
        // var diff = {}                           // Initialisation du retour
        // var tmp = date2 - date1;
        //
        // tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
        // diff.sec = tmp % 60;                    // Extraction du nombre de secondes
        //
        // tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
        // diff.min = tmp % 60;                    // Extraction du nombre de minutes
        //
        // tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
        // diff.hour = tmp % 24;                   // Extraction du nombre d'heures
        //
        // tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
        // diff.day = tmp;

        console.log ("Différence entre:");
        console.log( this.format_date(date1) );
        console.log(" et ");
        console.log( this.format_date(date2) );
        console.log("Différence: " + moment(date1).diff(date2, 'minutes'));

        return moment(date1).diff(date2, 'minutes');
	},

    dateDiffInPercent(date1, date2) {
        console.log ("Différence entre:");
        console.log( this.format_date(date1) );
        console.log(" et ");
        console.log( this.format_date(date2) );

        // let difference = date2.getTime() - date1.getTime()
        // let minutesDifference = Math.floor(difference/1000/60);
        //
        // // 360 = 6 heures
        // diff = Math.round( ((360 - minutesDifference) / 360 ) * 100 );
        //
        // console.log (" = " + minutesDifference + " soit " + diff + "%")

        // Utilisation de moment.js https://momentjs.com/docs/#/query/
        if ( moment(date1).isBefore(date2) ){
            console.log("Différence: " + moment(date1).diff(date2, 'minutes'));
        }

        return moment(date1).diff(date2, 'minutes');
    },

    format_date(value) {
        if (value) {
            return moment(String(value)).format('DD/MM/YYYY HH:MM:SS');
        }
    },
}

export default date;