/* ria/kach
 *
 * /static/modules/components/cats-list.js - Vue component about cats
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 16/12/2016
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
