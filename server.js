const express = require('express')
const fileUpload = require('express-fileupload')

const app = express()

app.use(
	fileUpload({
		createParentPath: true,
	})
)

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/index.html')
// })

app.post('/upload', function (req, res) {
	let sampleFile
	let uploadPath

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.')
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	sampleFile = req.files.file
	uploadPath = __dirname + '/uploads/' + sampleFile.name

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv(uploadPath, function (err) {
		if (err) return res.status(500).send(err)

		res.send('File uploaded!')
	})
})

app.post('/upload', (req, res) => {
	if (!req.files) {
		return res.status(400).json({ msg: 'No file uploaded' })
	}

	res.json({
		fileName: '11',
		filePath: `/uploads/`,
	})

	const file = req.files.file

	if (!file) return res.json({ error: 'Incorrect input name' })

	const newFileName = encodeURI(Date.now() + '-' + file.name)

	file.mv(`${__dirname}/public/uploads/${newFileName}`, err => {
		if (err) {
			console.log(err)
			return res.status(500).send(err)
		}
		console.log('file was uploaded')

		res.json({
			fileName: file.name,
			filePath: `/uploads/${newFileName}`,
		})
	})
})

app.listen(5000, () => console.log('Server started'))
