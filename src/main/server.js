const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000; // Replace with your desired port

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the movie details page
app.get('/movie/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'movieDetail.html'));
});

// Fallback to index.html for other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
