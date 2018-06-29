# SENOVEA React - Redux SPA

### SENOVEA wordpress backend instructions:
	
	1. installer wordpress ( latest )
	2. installer wordpress plugins & configurer 

		*. Activate 
			*. JWT Authentification for WP-API

			*. Configuration : 
				*. https://fr.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
				*. Tester les routes pour générer des tokens.

		*. Activate 
			*. WooCommerce
			*. Senovea WooCommerce Proxy
			*. Senovea Functions
			*. ACF
			*. ACF Pro
			*. ACF to REST API

			*. Configuration :
				*. Enable Legacy API ( setting woocommerce )
				*. Créer une API KEY Read/Write ( setting woocommerce )
				*. Copier/coller les clés dans le plugin WooCommerce Proxy
				*. Disable tout les mails automatiques de WooCommerce ( setting woocommerce )
				*. Importer les settings ACF

### SENOVEA React - Redux SPA frontend instructions:

    senovea-prod.surge.sh

    1. clone 
    2. npm install
    3. edit config/config-api.js

    * npm run webpack_start_dev    => start local dev server
    * npm run webpack_start_prod   => start local prod server
    * npm run webpack_build_dev    => build project in /build ( mode:development )
    * npm run webpack_build_prod   => build project in /build ( mode:production )
