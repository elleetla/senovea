export const WORDPRESS_API_BASE_URL = 
    process.env.NODE_ENV !== 'production' ? 
        'https://senovea.juliengrelet.com/wp-json' :
        'https://senovea.juliengrelet.com/wp-json'