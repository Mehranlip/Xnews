# XNews
<img src="https://github.com/user-attachments/assets/6da7a546-29a1-4b76-8d46-4889954b22b6" />
Welcome to XNews, a modern news application that displays the latest news articles in an aesthetically pleasing format. This project is built using React and Bootstrap for styling, offering a responsive design that works seamlessly across devices.

## Features

- **Dynamic News Feed**: Fetches the latest news articles from various sources.
- **Responsive Layout**: Automatically adjusts to different screen sizes, ensuring a user-friendly experience on both desktop and mobile.
- **Image Backgrounds**: Each news item features an image background. If an article lacks an image, a random gradient will be applied as a background, enhancing the visual appeal.
- **Gradient Overlay**: A gradient overlay ensures text readability over background images, providing a polished look.
- **Interactive Elements**: Articles have hover effects to enhance user engagement.

  <img src="https://github.com/user-attachments/assets/b1d065b7-1463-483d-80c8-27f8858cf547" />
## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or Yarn


 
### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/xnews.git
2. Navigate to the project directory:
   ```bash
   cd xnews
3. Install the dependencies:
   ```bash
   npm install
   
### API Key

To fetch news articles, you will need an API key. Here’s how to get one:
1. Sign up for a free API key from <a href="https://newsapi.org/">NewsAPI<a/>.
2. After registration, you will receive an API key that allows you to access the news data.
3. Create a **.env** file in the root of your project directory and add your API key like this:
   ```bash
   VITE_NEWS_API_KEY=your_api_key_here
   
4. Running the Application:
   ```bash
   npm run dev
Your application will be available at http://localhost:5173.

### Usage
Once the application is running, you can view the latest news articles displayed in a grid format. The layout adjusts based on screen size, with responsive breakpoints set for optimal viewing.

Customizing the Gradient Background
In the NewsList component, if an article does not have an image, a random gradient background will be generated. This ensures that all articles are visually appealing, regardless of whether they include an image.

### License
This project is licensed under the MIT License

Acknowledgments
Developed by Mehran <br/>
Inspired by modern news applications and design principles.
