<template>
  <div class="hello">

    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" style="display: none;">
      <symbol id="wave">
        <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
        <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
        <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
        <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
      </symbol>
    </svg>

    <div class="box">
      <div class="percent">
        <div class="percentNum" id="count">{{ timeToNextHighTideDisplay }}</div>
      </div>
      <div id="water" class="water" :style="{ 'transform': 'translate(0,' + (100 - percent) + '%)' }">
        <svg viewBox="0 0 560 20" class="water_wave water_wave_back">
          <use xlink:href="#wave"></use>
        </svg>
        <svg viewBox="0 0 560 20" class="water_wave water_wave_front">
          <use xlink:href="#wave"></use>
        </svg>
      </div>
    </div>

  </div>
</template>

<script>
import middleware from '../services/middleware_call'
import date from '../mixins/mixins';

export default {
  name: 'TideDisplay',

  data() {
    return {
      count: Number,
      dateNow: Date,
      dateNextHighTide: Date,
      timeToNextHighTide: '',
      tideDatas : '',
      percent: 0
    }
  },

  mixins: [date],

  mounted() {

    this.dateNow = new Date();
    this.getTideData();

    setInterval(

      function(){

        this.dateNow = new Date();
        this.getTideData();

      }.bind(this),
      60000
    )

  },

  computed: {

    timeToNextHighTideDisplay() {
      return this.timeToNextHighTide.hour + ":" + this.timeToNextHighTide.min + ":" + this.timeToNextHighTide.sec
    },

  },

  methods: {

		getTideData() {

      // Requete auporès du middleware
      middleware.fetchTide()
      .then(
        value => {
          this.tideDatas = value

          console.log("💧💧 Tides data:");
          console.table(value);
          console.log("----------------");

          // Analyse de ce qui a été reçu
          this.parseTideData();
        }
      )
      .catch(
        error => console.error("Erreur " + error )
      )

    },

    // Pour analyser les données reçues
    parseTideData() {
      // Tableau qui ne contiendra que les prochaines marées hautes
      let highTideTime = [];

      // Recherche de la prochaine Pleine Mer et ajout dans le tableau highTideTime
      for (const key in this.tideDatas) {
        // Filter to get only high tides
        highTideTime.push( this.tideDatas[key].filter(
          entry => entry[0] == 'tide.high'
        ));
      }

      //console.log("💧💧 Next high tides:");
      //console.table(highTideTime);
      //console.log("----------------");

      //
      highTideTime.forEach(element => {
        element.forEach( subElement => {
          console.log (subElement);

          let time = subElement[1].split(':');

          let hour = time[0];
          let minute = time[1];

          // Get Next High Tide
          // *******************
          this.dateNextHighTide = new Date();
          this.dateNextHighTide.setHours( hour );
          this.dateNextHighTide.setMinutes( minute );

          console.log("💧💧 Next high tide:");
          console.log( this.dateNextHighTide );

          // Update SVG
          let diffInPercent = date.dateDiffInPercent( this.dateNow, this.dateNextHighTide );
          if ( diffInPercent > 0 ){

            this.percent = diffInPercent;

            // Time to Next HighTide
            this.timeToNextHighTide = date.dateDiff( this.dateNow, this.dateNextHighTide );

            return;
          }
        });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  outline: none;
}

body {
  background: #020438;
  font: 14px/1 "Open Sans", helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.box {
  height: 280px;
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #020438;
  border-radius: 100%;
  overflow: hidden;
}
.box .percent {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 64px;
}
.box .water {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  transform: translate(0, 100%);
  background: #4d6de3;
  transition: all 0.3s;
}
.box .water_wave {
  width: 200%;
  position: absolute;
  bottom: 100%;
}
.box .water_wave_back {
  right: 0;
  fill: #c7eeff;
  -webkit-animation: wave-back 1.4s infinite linear;
          animation: wave-back 1.4s infinite linear;
}
.box .water_wave_front {
  left: 0;
  fill: #4d6de3;
  margin-bottom: -1px;
  -webkit-animation: wave-front 0.7s infinite linear;
          animation: wave-front 0.7s infinite linear;
}

@-webkit-keyframes wave-front {
  100% {
    transform: translate(-50%, 0);
  }
}

@keyframes wave-front {
  100% {
    transform: translate(-50%, 0);
  }
}
@-webkit-keyframes wave-back {
  100% {
    transform: translate(50%, 0);
  }
}
@keyframes wave-back {
  100% {
    transform: translate(50%, 0);
  }
}
</style>
