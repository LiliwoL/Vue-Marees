const date = {
	dateDiff(date1, date2) {
        var diff = {}                           // Initialisation du retour
        var tmp = date2 - date1;

        tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
        diff.sec = tmp % 60;                    // Extraction du nombre de secondes

        tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
        diff.min = tmp % 60;                    // Extraction du nombre de minutes

        tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
        diff.hour = tmp % 24;                   // Extraction du nombre d'heures

        tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
        diff.day = tmp;

        return diff;
	},

    dateDiffInPercent(date1, date2) {
        let diff = 0;

        console.log ("Différence entre:")
        console.log( date1)
        console.log(" et ")
        console.log( date2 )

        let difference = date2.getTime() - date1.getTime()
        let minutesDifference = Math.floor(difference/1000/60);

        // 360 = 6 heures
        diff = Math.round( ((360 - minutesDifference) / 360 ) * 100 );

        console.log (" = " + minutesDifference + " soit " + diff + "%")

        return diff;
    }
}

export default date;