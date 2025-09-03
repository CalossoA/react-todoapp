-- Script per sistemare l'utente admin
UPDATE users SET password='$2b$10$If8rpGkVUNEirUn8Na2N7OlpLL2UJzLrmQy4KGpz9JTjIBdbJUSy2' WHERE email='admin';
