/* ria/kach
 *
 * /static/modules/main.js - Main script
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 09/12/2016
*/

import Vue from "vue";

Vue.component( "cats-list", {
    "props": [ "elements" ],
    "template": `
        <ul>
            <li v-for="elt in elements">
                <strong>{{ elt.name }}</strong>
                <span>({{ elt.age }})</span>
            </li>
        </ul>
    `,
} );

Vue.component( "secret", {
    "props": [ "content" ],
    "data": function() {
        return {
            "reveal": {
                "show": "Reveal my secrets!",
                "hide": "Hide my secret!",
                "value": "Reveal my secrets!",
            },
            "state": false,
        };
    },
    "template": `
        <div>
            <p v-if="state">{{ content }}</p>
            <button v-on:click="revealSecret">{{ reveal.value }}</button>
        </div>
    `,
    "methods": {
        "revealSecret": function() {
            this.state = !this.state;
            this.reveal.value = this.state ? this.reveal.hide : this.reveal.show;
        },
    },
} );

let oApp = new Vue( {
    "template": `
        <div class="box">
            <p>{{ message }}</p>
            <cats-list v-bind:elements="cats"></cats-list>
            <secret v-bind:content="secret"></secret>
        </div>

    `,
    "data": {
        "message": "Look at my cats ! My cats are amazing !!!",
        "secret": "Cats are completly stupid !!!",
        "cats": [
            { "name": "Skitty", "age": "6" },
            { "name": "Pixel", "age": "4" },
        ],
    },

} );

oApp.$mount( "#app" );
