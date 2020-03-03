'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    //_id
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {          //Tênis nike = tenis-nike
        type: String,
        required: true,
        trim: true,
        index:true,
        unique:true
    },
    description: {
        type: String,
        required: true

    },
    price:{
        type: Number,
        required: true
    },
    active:{
        type: Boolean,
        required: true
    },
    tags:[{
        type: String,
        required: true

    }]

})