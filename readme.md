#SENOVEA React - Redux SPA

###SENOVEA wordpress backend instructions:
	
	1. installer wordpress 
	1. installer wordpress plugins
		1. ACF 
		1. ACF Pro
		1. ACF to REST API
		1. WooCommerce (+ Storefront)
		1. JWT Authentification for WP-API
		1. Senovea WooCommerce Proxy
		1. Senovea Functions 
    1. configurer plugins
	    1. config pour JWT Authentification for WP-API https://fr.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
	    1. config Senovea WooCommerce Proxy ( ck & cs )
	    1. config ACF ( importer les ACFs user ) 

###SENOVEA React - Redux SPA frontend instructions:

    1. clone 
    1. npm install
    1. edit config/config-api.js

    * npm run webpack_start_dev    => start local dev server
    * npm run webpack_start_prod   => start local prod server
    * npm run webpack_build_dev    => build project in /build ( mode:development )
    * npm run webpack_build_prod   => build project in /build ( mode:production )
