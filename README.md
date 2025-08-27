# FixKutaisi

FixKutaisi is a Django-based web application designed to help citizens report municipal issues in Kutaisi, Georgia. The platform allows users to submit reports about various city problems like road issues, water problems, lighting, waste management, and more through an interactive map interface.

## Features

### 🗺️ Interactive Map
- Leaflet.js-powered interactive map of Kutaisi
- Click-to-report problems at specific locations
- Geocoding support for address search
- Responsive map interface

### 📝 Problem Reporting
- Multiple problem categories:
  - Road problems (გზის პრობლემები)
  - Water issues (წყლის პრობლემები)
  - Lighting (განათება)
  - Waste management (ნაგავი)
  - Other (სხვა)
- Anonymous reporting option
- Image upload support
- Location-based reporting

### 👤 User Management
- User registration and authentication
- Secure login with password visibility toggle
- Password recovery functionality
- Session management with "Remember me" option

### 💬 Communication
- Contact form for user feedback
- Message system for user inquiries

### 🎨 Modern UI/UX
- Responsive design for all devices
- Georgian language interface
- Smooth animations and transitions
- Mobile-friendly navigation
- Beautiful background elements with city-themed emojis

## Tech Stack

- **Backend**: Django 5.2.4
- **Database**: SQLite (development)
- **Frontend**: HTML5, CSS3, JavaScript
- **Maps**: Leaflet.js with OpenStreetMap
- **Icons**: Font Awesome 6.4.0
- **Responsive Design**: CSS Flexbox/Grid

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FixKutaisi
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install django
   ```

4. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the application**
   - Open your browser and go to `http://127.0.0.1:8000/`

## Project Structure

```
FixKutaisi/
├── FixKutaisi/                 # Main Django app
│   ├── migrations/             # Database migrations
│   ├── static/                 # Static files (CSS, JS, images)
│   │   └── js/                 # JavaScript files
│   ├── templates/              # HTML templates
│   ├── admin.py                # Django admin configuration
│   ├── apps.py                 # App configuration
│   ├── models.py               # Database models
│   ├── urls.py                 # URL routing
│   └── views.py                # View functions
├── backend/                    # Django project settings
│   ├── settings.py             # Project settings
│   ├── urls.py                 # Main URL configuration
│   └── wsgi.py                 # WSGI configuration
└── manage.py                   # Django management script
```

## Models

### User
- Custom user model extending Django's AbstractUser
- Fields: username, email, password
- Handles authentication and user management

### Problem
- Stores reported city problems
- Fields: title, description, category, location (lat/lng), reporter, anonymous flag, image, date
- Categories: road, water, lighting, waste, other

### Message
- Stores contact form messages
- Fields: sender (ForeignKey to User), content

## API Endpoints

### `/api/problems`
- **GET**: Retrieve all reported problems as JSON
- **POST**: Create a new problem report (requires authentication)

## Usage

1. **View Problems**: Visit the homepage to see all reported problems on the interactive map
2. **Report Problem**: 
   - Click on the map where the problem is located
   - Fill out the problem details form
   - Optionally upload an image
   - Submit the report
3. **User Account**: Register or login to report problems
4. **Contact**: Use the contact form to send messages to administrators

## Features in Detail

### Authentication System
- Secure user registration and login
- Password recovery with email verification simulation
- Session management with customizable expiry
- Anonymous reporting option for sensitive issues

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Touch-friendly interface
- Optimized for various screen sizes

### Localization
- Georgian language interface
- Culturally appropriate design elements
- Local context for Kutaisi city

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Security Notes

- CSRF protection enabled
- User authentication required for problem reporting
- SQL injection protection through Django ORM
- XSS protection through template escaping

## Future Enhancements

- Email notifications for administrators
- Problem status tracking (open/in-progress/resolved)
- User dashboard for tracking submitted problems
- Admin panel for managing reports
- Integration with city services
- Real-time updates using WebSockets
- Mobile application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please use the contact form within the application or reach out to the development team.

---

*FixKutaisi - Making Kutaisi better, one report at a time.* 🏙️
