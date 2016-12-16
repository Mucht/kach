/* ria/kach
 *
 * /static/modules/components/secret.js - Vue component about secret
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 16/12/2016
*/

import Vue from "vue";

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
