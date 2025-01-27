# Members-Only Application

## Overview

The **Members-Only Application** is a simple, secure web application built with Node.js, Express.js, Passport.js, and EJS templates. It allows users to sign up, log in, post messages, and join an exclusive members-only club. Members have the ability to post messages that are visible only to other members, providing a secure and private community experience.

---

## Features

- **User Authentication**: Users can sign up, log in, and log out securely using Passport.js and session-based authentication.
- **Flash Messages**: Users receive feedback (success or error messages) after completing certain actions (e.g., signing up, logging in, or posting messages).
- **Access Control**: Only authenticated users can create messages, and only members can view the authors/dates of those messages.
- **Post Messages**: Users can create messages with a title and content, visible only to other members.
- **Join Club**: Users can enter a secret passcode to join the members-only club.

---

## Technologies Used

- **Node.js**: Backend server and application logic.
- **Express.js**: Web framework for routing and middleware.
- **Passport.js**: User authentication with local strategy.
- **EJS**: Templating engine for dynamic content rendering.
- **connect-flash**: For displaying flash messages.
- **PostgreSQL**: Local database used for storing user data and messages.

---

## Local Database Setup

This project uses a local PostgreSQL database to store data. Therefore a live demo is not provided. 

## How It Works

1. **Signup**: New users register by providing their first name, last name, username, and password.
2. **Login**: Users log in using their username and password.
3. **Post Messages**: Once logged in, users can create messages that are visible to other members.
4. **Join the Club**: Users can enter the secret passcode to join the members-only club. After joining, they can see the authors and dates of messages.
5. **Admin Access**: Admins can delete user messages.

---

## Screenshots of the Demo

- **Sign-Up Page**  
  ![](https://github.com/ZackCornfield/members-only/blob/main/public/screenshot_2.png)

- **Login Page**  
  ![](https://github.com/ZackCornfield/members-only/blob/main/public/screenshot_3.png)

- **Messages for Members**  
  ![](https://github.com/ZackCornfield/members-only/blob/main/public/screenshot_1.png)

- **Admin**  
  ![](https://github.com/ZackCornfield/members-only/blob/main/public/screenshot_4.png)

- **Post a Message**  
  ![](https://github.com/ZackCornfield/members-only/blob/main/public/screenshot_5.png)
