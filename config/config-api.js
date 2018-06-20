export const WORDPRESS_API_BASE_URL = process.env.NODE_ENV !== 'production' ?
        'http://senoveawp.local/wp-json' :
        'https://senovea.juliengrelet.com/wp-json'