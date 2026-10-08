# Personal Reading List

A responsive Personal Reading List web application built with React, JavaScript, and CSS.

Users can add articles and useful resources with a title and URL, view their saved items, and remove them when they are finished.

The reading list uses browser `localStorage` for persistent storage, so saved articles remain available after refreshing the page.

## Features

- Add articles with a title and URL
- View saved reading-list items
- Remove articles from the list
- Persistent data using browser localStorage
- Loading state
- Error state
- Empty state
- Responsive design for mobile and desktop
- Keyboard-friendly form controls and buttons
- No code changes are required to test the different states

## Tech Stack

- React
- JavaScript
- CSS
- Vite
- Browser localStorage

## Getting Started

### 1. Install dependencies

npm install


### 2. Start the development server

npm run dev


The application will be available at:

http://localhost:5173/


## Application States

The application has three required states: Loading, Error, and Empty.

All three states can be tested without changing the source code.

### Loading State

Open:

http://localhost:5173/?state=loading


The loading screen explains that the reading list is being loaded and displays a loading indicator.

### Error State

Open:

http://localhost:5173/?state=error


The error screen explains that the reading list could not be loaded and tells the user what to do next.

A **Try Again** button is provided.

### Empty State

Open:

http://localhost:5173/?state=empty


The empty state explains what the reading list is for and provides an **Add your first article** action.

### Normal State

Open:

http://localhost:5173/


Users can add an article using the form.

After adding an article:

- The article appears in the reading list.
- The title is displayed.
- The URL is displayed.
- The URL can be opened in a new tab.
- The article can be removed.

## Data Persistence

The application uses browser `localStorage` to persist the reading list.

When an article is added, it is stored under:

personal-reading-list


Refreshing the page does not remove saved articles.

The data remains available in the same browser unless the browser's site data or localStorage is cleared.

## Responsive Design

The application is designed to work on:

- Desktop
- Tablet
- Mobile

The layout adapts to smaller screen sizes without horizontal scrolling.

## Accessibility

The application supports keyboard navigation.

Interactive elements have visible focus states, and buttons and form controls can be operated using the keyboard.

## Acceptance Criteria

### Loading

- Loading state is visually distinct.
- Loading state is textually distinct.
- Loading state is accessible using `?state=loading`.

### Error

- Error state is visually distinct.
- Error state explains what failed.
- Error state tells the user what to do.
- Error state is accessible using `?state=error`.

### Empty

- Empty state is visually distinct.
- Empty state explains the purpose of the reading list.
- Empty state provides the first action.
- Empty state is accessible using `?state=empty`.

### Data

- Users can add articles.
- Users can remove articles.
- Saved articles persist after refreshing the page.

## Build

To create a production build:

npm run build


To preview the production build:

npm run preview


## Project Structure

personal-reading-list/ │ ├── src/ │ ├── App.jsx │ ├── App.css │ └── main.jsx │ ├── public/ │ ├── index.html ├── package.json ├── package-lock.json ├── vite.config.js └── README.md


## Summary

This project demonstrates a responsive React reading-list application with persistent browser storage and clearly separated loading, error, empty, and normal data states.