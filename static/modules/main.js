/* ria/kach
 *
 * /static/modules/main.js - Main script
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 09/12/2016
*/

import Vue from "vue";
import "./components/cats-list";
import "./components/secret";

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
        "secret": "Pauline est pas vraiment mon amie...",
        "cats": [
            { "name": "Skitty", "age": "6" },
            { "name": "Pixel", "age": "4" },
        ],
    },

} );

oApp.$mount( "#app" );
