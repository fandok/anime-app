# Amartha Anime App

# Dashboard Page

I developed the dashboard page consists of the title, sign in button, search bar, and list of anime with load more button on the button. With the design, I can make it as a responsive page. When you click the anime poster, it will direct you to the detail page.

# Detail Page

The detail page consists of several informations regarding the anime. If you haven't log in you will be shown the forbidden page, and if you type from the url directly you will also be shown the forbidden page. There are breadcrumbs that will lead you back to Home page when you click Home.

# Sign in / Sign Out Page

When sign in, you can choose the login with Google, I use the package Next Auth for the authentication

# Forbidden page

A forbidden page consists of the message that this is a forbidden page, and you will see the button that direct you to Home page.

# Additional Features

- Authentication System
  I created the auth system using Next Auth, you can not see the detail page if you haven't log in.
- Unit Test
  I created the unit test with jest and @testing-library, and then I used msw to mock my fetch.
- Responsive
  If you check the website on phone, you can see that it is a responsive web page.
- SSR
  On detail page, I implement the Server Side Rendering, so it will not fetch on client when it is available.
