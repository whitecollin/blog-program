# Blog Application

This is a blog application built with React, Redux, TypeScript, and Tailwind CSS.
The application allows users to create, update, and view blog posts. It also
includes features such as login, sorting and filtering of blog posts, and tracking
of watches and likes.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository: git clone https://github.com/collinwhite/blog-app.git
2. Install dependencies: npm install
3. Start the development server: npm start
   ```
   The application should now be running on http://localhost:3000.
   ```

## Features

```
Login
The login page allows users to enter their email address, full name, and password
to access the application.

Dashboard
Once logged in, users can view a dashboard which displays all blog posts as a list.
 This list can be sorted by date, number of likes, or number of watches using the
 provided dropdown menu. Users can also filter the list by typing in a search term
  in the input field.

Create Blog
Users can create a new blog post by clicking on the "Create Blog" button on the
dashboard page. They will be taken to a form where they can enter a title, content,
 and upload an optional image file. Once submitted, the new blog post will appear
  at the top of the dashboard list.

Update Blog
Users can edit the title, content, or image of a previously created blog post by
clicking on the "Edit" button next to the post on the dashboard page. They will be
taken to a form pre-filled with the current post's data, which they can modify and save.

Blog Detail
Clicking on a blog post from the dashboard will take the user to a detail page
 which displays all of its contents. If the user did not create the post, the number
  of watches will increase by one.

Likes
Users can click on the heart icon on a blog post to "like" it. This will increase
 the number of likes for that post by one.

User Page
Clicking on a user's name on a blog post will take the user to a page which displays
 all of the posts created by that user.
```

## Technologies Used

```
This application was built using:

React
Redux
TypeScript
Tailwind CSS
localStorage
Future Improvements
Some potential improvements for the application could include:

Implementing server-side data storage and retrieval using a backend technology such
 as Node.js or Firebase.
Adding a comment feature to blog posts.
Allowing users to delete their own blog posts.
Implementing pagination to load a limited number of posts at a time on the dashboard page.
```
