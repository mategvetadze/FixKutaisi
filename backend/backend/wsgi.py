import os
import sys
from django.core.wsgi import get_wsgi_application

# Add the root directory to Python path so it can find FixKutaisi app
current_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.join(current_dir, '..', '..')
sys.path.insert(0, root_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.backend.settings')

application = get_wsgi_application()