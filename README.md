# FixKutaisi 🏙️

A civic platform where citizens of Kutaisi, Georgia can report and map local urban issues. Built with Django for the backend and interactive web technologies for the frontend.

## 🌟 Features

### 🗺️ Interactive Map
- **Location-based reporting**: Click anywhere on the map to report issues
- **Geocoding support**: Search for specific locations within Kutaisi
- **Visual problem markers**: Color-coded markers for different issue categories
- **Detailed popups**: View problem details, images, and reporter information

### 📝 Problem Reporting
- **Multiple categories**: Road, Water, Lighting, Waste, and Other issues
- **Anonymous reporting**: Option to report problems anonymously
- **Image upload**: Attach photos to problem reports
- **Real-time updates**: Problems appear on the map immediately after submission

### 🔐 User Authentication
- **User registration and login**: Secure account creation and authentication
- **Session management**: Remember me functionality and secure sessions
- **Password recovery**: Forgot password functionality with secure reset
- **Contact system**: Direct messaging to administrators

### 🎨 Modern UI/UX
- **Responsive design**: Works seamlessly on desktop, tablet, and mobile devices
- **Georgian language support**: Full Georgian (ქართული) language interface
- **Smooth animations**: Enhanced user experience with CSS transitions
- **Clean aesthetics**: Modern design with intuitive navigation

## 🛠️ Technology Stack

### Backend
- **Django 4.x**: Python web framework
- **PostgreSQL**: Database management
- **Django Authentication**: Built-in user management
- **Django REST Framework**: API endpoints for frontend interaction

### Frontend
- **Leaflet.js**: Interactive maps with OpenStreetMap
- **HTML5/CSS3**: Modern web standards
- **JavaScript ES6+**: Dynamic frontend functionality
- **FontAwesome**: Icon library
- **Responsive CSS**: Mobile-first design approach

### 🌍 Maps & Geocoding
- **OpenStreetMap**: Base map tiles via CartoDB
- **Leaflet Control Geocoder**: Location search functionality
- **Custom markers**: Color-coded problem indicators

## 📋 Installation

### Prerequisites
- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FixKutaisi.git
   cd FixKutaisi
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   cd backend
   pip install django
   pip install psycopg2-binary  # for PostgreSQL support
   ```

4. **Database setup**
   ```bash
   # Create PostgreSQL database
   createdb fixkutaisi_db
   
   # Run migrations
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the application**
   - Main site: `http://localhost:8000`
   - Admin panel: `http://localhost:8000/admin`

## 📁 Project Structure

```
FixKutaisi/
├── backend/
│   ├── FixKutaisi/
│   │   ├── models.py          # Database models (User, Problem, Message)
│   │   ├── views.py           # View functions and API endpoints
│   │   ├── urls.py            # URL routing
│   │   ├── admin.py           # Django admin configuration
│   │   ├── static/            # Static files (CSS, JS, images)
│   │   │   ├── css/
│   │   │   │   └── style.css  # Main stylesheet
│   │   │   └── js/
│   │   │       ├── home.js    # Map functionality
│   │   │       ├── login.js   # Login page scripts
│   │   │       └── signup.js  # Registration scripts
│   │   └── templates/         # HTML templates
│   │       ├── base.html      # Base template
│   │       ├── home.html      # Main map page
│   │       ├── login.html     # Login page
│   │       ├── signup.html    # Registration page
│   │       └── contact.html   # Contact page
│   ├── backend/
│   │   ├── settings.py        # Django settings
│   │   ├── urls.py           # Main URL configuration
│   │   └── wsgi.py           # WSGI configuration
│   └── manage.py             # Django management script
└── README.md
```

## 🔗 API Endpoints

### Problems API
- **GET** `/api/problems` - Retrieve all problems
- **POST** `/api/problems` - Create new problem report

### Authentication
- **POST** `/login` - User login
- **POST** `/register` - User registration
- **GET** `/logout` - User logout
- **POST** `/forgot_password` - Password recovery
- **POST** `/contact` - Send message to administrators

## 💾 Database Models

### User Model
```python
class User(AbstractUser):
    id = AutoField(primary_key=True)
    username = CharField(max_length=30, unique=True)
    email = EmailField(unique=True)
    password = CharField(max_length=30)
```

### Problem Model
```python
class Problem(models.Model):
    CATEGORY_CHOICES = [
        ('road', 'Road'),
        ('water', 'Water'),
        ('lighting', 'Lighting'),
        ('waste', 'Waste'),
        ('other', 'Other'),
    ]
    
    title = CharField(max_length=200)
    description = TextField()
    category = CharField(max_length=20, choices=CATEGORY_CHOICES)
    reporter = CharField(max_length=100)
    is_anonymous = BooleanField(default=False)
    latitude = FloatField()
    longitude = FloatField()
    date_created = DateTimeField(default=timezone.now)
    image = TextField(blank=True, null=True)
```

### Message Model
```python
class Message(models.Model):
    sender = ForeignKey(User, on_delete=CASCADE)
    content = TextField()
```

## 🎯 Key Features Explained

### Interactive Problem Reporting
1. **Map Click**: Users click anywhere on the Kutaisi map
2. **Form Display**: A problem reporting form appears
3. **Category Selection**: Choose from predefined problem categories
4. **Anonymous Option**: Users can report anonymously or with their name
5. **Image Upload**: Optional photo attachment
6. **Real-time Display**: Problems appear immediately on the map

### Authentication System
- Secure user registration and login
- Session management with "Remember Me" functionality
- Password recovery with email-based reset
- Admin contact system for user support

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Desktop-friendly**: Full functionality on larger screens
- **Touch-friendly**: Large buttons and easy navigation
- **Fast loading**: Optimized assets and efficient code

## 🌍 Localization

The application is fully localized in Georgian (ქართული):
- All user interface text in Georgian
- Georgian address support in geocoding
- Date formatting according to Georgian standards
- Cultural considerations in design and workflow

## 🚀 Deployment

### Production Considerations
- Use environment variables for sensitive settings
- Configure PostgreSQL with proper security settings
- Set up static file serving (WhiteNoise or CDN)
- Configure email backend for password recovery
- Set up proper logging and monitoring

### Environment Variables
Create a `.env` file with:
```
SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=postgresql://user:password@localhost:5432/fixkutaisi_db
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

**Note:** This project uses free, open-source mapping services and doesn't require any API keys.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Django best practices
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Maintain code quality and consistency

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenStreetMap** for providing map data
- **CartoDB** for map tile services
- **Leaflet.js** community for the excellent mapping library
- **Django** community for the robust web framework
- **FontAwesome** for the icon library
- Citizens of Kutaisi for inspiring this civic engagement platform

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Use the contact form within the application
4. Email: [mategvetadze@gmail.com]

## 🔮 Future Enhancements

- **Enhanced analytics**: Problem statistics and trends dashboard
- **Status tracking**: Allow administrators to update problem status
- **Advanced filtering**: Filter problems by category, date, and location
- **Email notifications**: Notify users of problem status updates
- **Multi-language support**: Additional language options beyond Georgian
- **Problem categories expansion**: More specific problem categorization
- **User dashboard**: Personal problem reporting history
- **Export functionality**: Download problem reports as CSV/PDF
- **Image gallery**: Better image viewing and management
- **Community voting**: Allow citizens to upvote important issues

---

**Made with ❤️ for the citizens of Kutaisi, Georgia**
