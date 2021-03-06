"use strict";

const Validator = require("../index");
const v = new Validator({
	messages: {
		stringMin: "A(z) '{name}' mező túl rövid. Minimum: {0}, Jelenleg: {1}"
	}
});

const schema = {
	id: { type: "number", min: 1, max: 100 },
	name: { type: "string", optional: false, min: 3, max: 128 },
	settings: { type: "object", props: {
		notify: [
			{ type: "boolean" },
			{ type: "object" }
		]
	}},
	sex: { type: "string", enum: ["male", "female"] },
	roles: { type: "array", items: { type: "string" }, enum: ["admin", "user"] },
	friends: { type: "array", items: { type: "number", positive: true }},
	comments: { type: "array", items: { type: "object", props: {
		user: { type: "number", positive: true, integer: true },
		content: { type: "string" },
		voters: { type: "array", optional: true, items: { type: "number", optional: true }}
	} } },
	multiarray: { type: "array", empty: false, items: {
		type: "array", empty: true, items: {
			type: "number"
		}
	}},
	email: { type: "email", optional: true },
	homepage: { type: "url", optional: true },
	status: "boolean",
	age: { type: "number", min: 18, max: 100, convert: true },
	apikey: "forbidden",
	action: "function",
	created: "date"
};

const obj = {
	id: 5,
	name: "John",
	sex: "male",
	settings: {
		//notify: true,
		notify: {
			corner: "top"
		}
	},
	roles: [
		"user"
	],

	friends: [
		5,
		10,
		2
	],

	comments: [
		{ user: 1, content: "Cool!" },
		{ user: 2, content: "Very fast!" },
		{ user: 1, content: "", voters: [1] }
	],

	multiarray: [
		[
		],
		[
			5,
			10,
			//"a"
		]
	],

	email: "john.doe@clipboard.space",
	homepage: "http://google.com",
	status: true,
	age: "28",
	apikey: null,
	action: () => {},
	created: new Date()
};

const res = v.validate(obj, schema);

console.log(res);