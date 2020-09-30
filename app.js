const express = require("express");
const path = require("path");
const { v4 } = require("uuid");
const app = express();


let CONTACTS = [
	{ id: v4(), name: "User", value: "+38 050 110 50 52", marked: false }
];

app.use(express.json());

app.get("/api/contacts", (req, res) => {
	setTimeout(()=>{
		res.status(200).json(CONTACTS);
	}, 1000);
});

app.post("/api/contacts", (req, res) => {
	const contact = {...req.body, id: v4(), marked: false};
	CONTACTS.push(contact);
	res.status(201).json(contact);
});

app.delete("/api/contacts/:id", (req, res) => {
	console.log(req.params.id);
	CONTACTS = CONTACTS.filter(c => c.id === req.params.id);
	res.status(200).json({"message": "Contact was deleted"});
});

app.use(express.static(path.resolve(__dirname, "client")));

app.get("*", (req, res)=>{
	res.sendFile(path.resolve(__dirname, "client", "index.html"))
});

app.listen(3000, () => {
    console.log("Server started on port 3000 ...");
});