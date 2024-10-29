import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var blogPosts = []; // In-memory array to store blog posts

app.get("/", (req, res) => {
    res.render("home.ejs", {blogPosts});
});

// Route to create a new blog post
app.get("/new-post", (req,res) =>{
    res.render("new-post.ejs");
});

app.post('/new-post', (req, res) => {
    const { title, content } = req.body;
    blogPosts.push({ title, content });
    res.redirect('/');
});

// Route to view a single blog post
app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogPosts[postId];
    if (post) {
      res.render('post.ejs', { post, id: postId });
    } else {
      res.status(404).send('Post not found');
    }
});


// Route to edit a blog post
app.get('/edit-post/:id', (req, res) => {
  const postId = req.params.id;
  const post = blogPosts[postId];
  if (post) {
    res.render('edit-post.ejs', { post, id: postId });
  } else {
    res.status(404).send('Post not found');
  }
});

app.post('/edit-post/:id', (req, res) => {
  const postId = req.params.id;
  blogPosts[postId] = {
    title: req.body.title,
    content: req.body.content
  };
  res.redirect(`/post/${postId}`);
});

// Route to delete a blog post
app.post('/delete-post/:id', (req, res) => {
  const postId = req.params.id;
  blogPosts.splice(postId, 1); // Remove post by index
  res.redirect('/');
});

// Start the server  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});