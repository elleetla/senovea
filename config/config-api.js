export const WORDPRESS_API_BASE_URL = 
    process.env.NODE_ENV !== 'production' ? 
        'http://localhost/senovea/wp-json' : 
        'http://senovea.juliengrelet.com/wp-json'