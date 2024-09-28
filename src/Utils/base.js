import React, {Component} from 'react'
// import '../App.css'
import axios from 'axios'
import moment from 'moment'
import Jquery from 'jquery'

import 'popper.js'
import 'bootstrap'

export default class Base extends Component{    
    axios = axios
    moment = moment
    $ = Jquery

    img_no_image = require('../assets/no_image_available.jpeg')

    async update_array(arr, set_state, data = {}, index = 0) {
		var temp = [...arr]
		temp[index] = data
		set_state(temp)
	}

	add_array(arr, set_state, data = {}) {
		var temp = [...arr]
		temp.push(data)
		set_state(temp)
	}

	update_object(data, set_state, variable = null, key = '') {
		var temp = JSON.parse(JSON.stringify(data))
		temp[key] = variable
		set_state(temp)
	}

	remove_array(arr, set_state, index = 0) {
		var temp = [...arr]
		temp.splice(index, 1)
		set_state(temp)
	}
}