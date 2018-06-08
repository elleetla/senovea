# SENOVEA React - Redux SPA

### SENOVEA wordpress backend instructions:
	
	1. installer wordpress 
	2. installer wordpress plugins
		*. ACF 
		*. ACF Pro
		*. ACF to REST API
		*. WooCommerce (+ Storefront)
		*. JWT Authentification for WP-API
		*. Senovea WooCommerce Proxy
		*. Senovea Functions 
    3. configurer plugins
	    *. config pour JWT Authentification for WP-API (bellow)
		*. https://fr.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
	    *. config Senovea WooCommerce Proxy ( ck & cs )
	    *. config ACF ( importer les ACFs user ) 

### SENOVEA React - Redux SPA frontend instructions:

    1. clone 
    2. npm install
    3. edit config/config-api.js

    * npm run webpack_start_dev    => start local dev server
    * npm run webpack_start_prod   => start local prod server
    * npm run webpack_build_dev    => build project in /build ( mode:development )
    * npm run webpack_build_prod   => build project in /build ( mode:production )
