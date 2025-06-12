const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('.'));

let comments = [];

if (fs.existsSync('comments.json')) {
  comments = JSON.parse(fs.readFileSync('comments.json'));
}

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body.text;
  if (comment && comment.trim() !== '') {
    const newComment = { text: comment.trim() };
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
  }
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
